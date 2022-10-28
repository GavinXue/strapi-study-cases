module.exports = ({strapi, nexus}) => {
  const UsersPermissionsMeExtend = nexus.extendType({
    type: 'UsersPermissionsMe',
    definition(t) {
      t.field('avatar', {
        type: 'UploadFileEntity',
        resolve: async (parent, args, ctx) => {
          const res = strapi.entityService.findOne('plugin::users-permissions.user', parent.id, {
            populate: 'avatar'
          }).then(res => res.avatar)

          return res
        }
      })
    }
  })
  return [UsersPermissionsMeExtend]
}
