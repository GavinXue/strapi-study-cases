module.exports = {
  afterUpdate(event) {
    const { data, where, select, populate } = event.params
    console.log(event.model.attributes.createdAt)
    console.log(event)
    console.log(data, where, select, populate)
    console.log(event.em)
  }
}
