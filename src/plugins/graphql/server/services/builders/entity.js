'use strict';

const { objectType } = require('nexus');
// const { prop, identity, isEmpty } = require('lodash/fp');
const { isArray, isString, isUndefined, constant, prop, identity } = require('lodash/fp');

// fd changes: add next line
const { contentTypes } = require('@strapi/utils');

// fd changes modify next lines
// module.exports = ({ strapi }) => {
//   const { naming } = strapi.plugin('graphql').service('utils');

  module.exports = (context) => {
    const {strapi} = context
    const { naming } = strapi.plugin('graphql').service('utils');

  // fd changes start: add next line
  const getGraphQLService = strapi.plugin('graphql').service;

  const extension = getGraphQLService('extension');

  const isNotPrivate = (contentType) => (attributeName) => {
    return !contentTypes.isPrivateAttribute(contentType, attributeName);
  };

  const isNotDisabled = (contentType) => (attributeName) => {
    return extension.shadowCRUD(contentType.uid).field(attributeName).hasOutputEnabled();
  };

  const addEnumAttribute = ({ builder, attributeName, contentType }) => {
    const { naming } = getGraphQLService('utils');

    const type = naming.getEnumName(contentType, attributeName);

    builder.field(attributeName, { type });
  };

  const addScalarAttribute = ({ builder, attributeName, attribute }) => {
    const { mappers } = getGraphQLService('utils');

    const gqlType = mappers.strapiScalarToGraphQLScalar(attribute.type);

    builder.field(attributeName, { type: gqlType});
  };

  const addPolymorphicRelationalAttribute = (options) => {
    const { GENERIC_MORPH_TYPENAME } = getGraphQLService('constants');
    const { naming } = getGraphQLService('utils');
    const { buildAssociationResolver } = getGraphQLService('builders').get('content-api');

    let { builder } = options;
    const { attributeName, attribute, contentType } = options;

    const { target } = attribute;
    const isToManyRelation = attribute.relation.endsWith('Many');

    if (isToManyRelation) {
      builder = builder.list;
    }
    // todo[v4]: How to handle polymorphic relation w/ entity response collection types?
    //  -> Currently return raw polymorphic entities

    const resolve = buildAssociationResolver({
      contentTypeUID: contentType.uid,
      attributeName,
      strapi,
    });

    // If there is no specific target specified, then use the GenericMorph type
    if (isUndefined(target)) {
      builder.field(attributeName, {
        type: GENERIC_MORPH_TYPENAME,
        resolve,
      });
    }

    // If the target is an array of string, resolve the associated morph type and use it
    else if (isArray(target) && target.every(isString)) {
      const type = naming.getMorphRelationTypeName(contentType, attributeName);

      builder.field(attributeName, { type, resolve });
    }
  };

  const addRegularRelationalAttribute = (options) => {
    const { naming } = getGraphQLService('utils');
    const { getContentTypeArgs } = getGraphQLService('builders').utils;
    const { buildAssociationResolver } = getGraphQLService('builders').get('content-api');
    const extension = getGraphQLService('extension');

    const { builder } = options;
    const { attributeName, attribute, contentType } = options;

    if (extension.shadowCRUD(attribute.target).isDisabled()) {
      return;
    }

    const isToManyRelation = attribute.relation.endsWith('Many');

    const resolve = buildAssociationResolver({
      contentTypeUID: contentType.uid,
      attributeName,
      strapi,
    });

    const targetContentType = strapi.getModel(attribute.target);

    // fd changes: change next type to relation to no single response
    // const type = isToManyRelation
    //   ? naming.getRelationResponseCollectionName(targetContentType)
    //   : naming.getEntityResponseName(targetContentType);
    const type = isToManyRelation
      ? naming.getRelationResponseCollectionName(targetContentType)
      : naming.getEntityName(targetContentType);

    const args = isToManyRelation ? getContentTypeArgs(targetContentType) : undefined;

    const resolverPath = `${naming.getTypeName(contentType)}.${attributeName}`;
    const resolverScope = `${targetContentType.uid}.find`;

    extension.use({ resolversConfig: { [resolverPath]: { auth: { scope: [resolverScope] } } } });

    builder.field(attributeName, { type, resolve, args });
  };

  const addComponentAttribute = ({ builder, attributeName, contentType, attribute }) => {
    let localBuilder = builder;

    const { naming } = getGraphQLService('utils');
    const { getContentTypeArgs } = getGraphQLService('builders').utils;
    const { buildComponentResolver } = getGraphQLService('builders').get('content-api');

    const type = naming.getComponentNameFromAttribute(attribute);

    if (attribute.repeatable) {
      localBuilder = localBuilder.list;
    }

    const targetComponent = strapi.getModel(attribute.component);

    const resolve = buildComponentResolver({
      contentTypeUID: contentType.uid,
      attributeName,
      strapi,
    });

    const args = getContentTypeArgs(targetComponent, { multiple: !!attribute.repeatable });

    localBuilder.field(attributeName, { type, resolve, args });
  };

  /**
   * Add a dynamic zone attribute to the type definition
   *
   * The attribute is added by fetching the dynamic zone's
   * type name and using it as the attribute's type
   *
   * @param {TypeBuildersOptions} options
   */
   const addDynamicZoneAttribute = ({ builder, attributeName, contentType }) => {
    const { naming } = getGraphQLService('utils');
    const { ERROR_CODES } = getGraphQLService('constants');
    const { buildDynamicZoneResolver } = getGraphQLService('builders').get('content-api');

    const { components } = contentType.attributes[attributeName];

    const isEmpty = components.length === 0;
    const type = naming.getDynamicZoneName(contentType, attributeName);

    const resolve = isEmpty
      ? // If the dynamic zone don't have any component, then return an error payload
        constant({
          code: ERROR_CODES.emptyDynamicZone,
          message: `This dynamic zone don't have any component attached to it`,
        })
      : //  Else, return a classic dynamic-zone resolver
        buildDynamicZoneResolver({
          contentTypeUID: contentType.uid,
          attributeName,
        });

    builder.list.field(attributeName, { type, resolve });
  };

  /**
   * Add a media attribute to the type definition
   * @param {TypeBuildersOptions} options
   */
   const addMediaAttribute = (options) => {
    const { naming } = getGraphQLService('utils');
    const { getContentTypeArgs } = getGraphQLService('builders').utils;
    const { buildAssociationResolver } = getGraphQLService('builders').get('content-api');
    const extension = getGraphQLService('extension');

    const { builder } = options;
    const { attributeName, attribute, contentType } = options;
    const fileUID = 'plugin::upload.file';

    if (extension.shadowCRUD(fileUID).isDisabled()) {
      return;
    }

    const fileContentType = strapi.contentTypes[fileUID];

    const resolve = buildAssociationResolver({
      contentTypeUID: contentType.uid,
      attributeName,
      strapi,
    });

    const args = attribute.multiple ? getContentTypeArgs(fileContentType) : undefined;
    const type = attribute.multiple
      ? naming.getRelationResponseCollectionName(fileContentType)
      : naming.getEntityResponseName(fileContentType);

    builder.field(attributeName, { type, resolve, args });
  };
  // fd changes end

  return {
    /**
     * Build a higher level type for a content type which contains the attributes, the ID and the metadata
     * @param {object} contentType The content type which will be used to build its entity type
     * @return {NexusObjectTypeDef}
     */
    buildEntityDefinition(contentType) {
      // fd changes: comment next line out
      // const { attributes } = contentType;

      const name = naming.getEntityName(contentType);
      const typeName = naming.getTypeName(contentType);

      // fd changes start: import type.js buildTypeDefinition function to faltten attribute
      const utils = getGraphQLService('utils');

      const { getComponentName, getTypeName } = utils.naming;
      const {
        isStrapiScalar,
        isComponent,
        isDynamicZone,
        isEnumeration,
        isMedia,
        isMorphRelation,
        isRelation,
      } = utils.attributes;

      const { attributes, modelType } = contentType;

      const attributesKey = Object.keys(attributes);

      return objectType({
        name,

        definition(t) {
          if (modelType === 'component' && isNotDisabled(contentType)('id')) {
            t.nonNull.id('id');
          }

          t.id('id',  { resolve: prop('id') })

          /** Attributes
           *
           * Attributes can be of 7 different kind:
           * - Scalar
           * - Component
           * - Dynamic Zone
           * - Enum
           * - Media
           * - Polymorphic Relations
           * - Regular Relations
           *
           * Here, we iterate over each non-private attribute
           * and add it to the type definition based on its type
           */
          attributesKey
            // Ignore private attributes
            .filter(isNotPrivate(contentType))
            // Ignore disabled fields (from extension service)
            .filter(isNotDisabled(contentType))
            // Add each attribute to the type definition
            .forEach((attributeName) => {
              const attribute = attributes[attributeName];

              // We create a copy of the builder (t) to apply custom
              // rules only on the current attribute (eg: nonNull, list, ...)
              let builder = t;

              if (attribute.required) {
                builder = builder.nonNull;
              }

              /**
               * @type {TypeBuildersOptions}
               */
              const options = { builder, attributeName, attribute, contentType, context };

              // Enums
              if (isEnumeration(attribute)) {
                addEnumAttribute(options);
              }

              // Scalars
              else if (isStrapiScalar(attribute)) {
                addScalarAttribute(options);
              }

              // Components
              else if (isComponent(attribute)) {
                addComponentAttribute(options);
              }

              // Dynamic Zones
              else if (isDynamicZone(attribute)) {
                addDynamicZoneAttribute(options);
              }

              // Media
              else if (isMedia(attribute)) {
                addMediaAttribute(options);
              }

              // Polymorphic Relations
              else if (isMorphRelation(attribute)) {
                addPolymorphicRelationalAttribute(options);
              }

              // Regular Relations
              else if (isRelation(attribute)) {
                addRegularRelationalAttribute(options);
              }
            });
        },
      });

      // fd changes end
      
      // fd changes: comment next return function out
      // return objectType({
      //   name,

      //   definition(t) {
      //     // Keep the ID attribute at the top level
      //     t.id('id', { resolve: prop('id') });

      //     if (!isEmpty(attributes)) {
      //       // Keep the fetched object into a dedicated `attributes` field
      //       // TODO: [v4] precise why we keep the ID
      //       t.field('attributes', {
      //         type: typeName,
      //         resolve: identity,
      //       });
      //     }

      //     // todo[v4]: add the meta field to the entity when there will be data in it (can't add an empty type for now)
      //     // t.field('meta', { type: utils.getEntityMetaName(contentType) });
      //   },
      // });
    },
  };
};
