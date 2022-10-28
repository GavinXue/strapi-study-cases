module.exports = ({nexus}) => {
  const testSubscribe =  nexus.subscriptionType({
    definition(t) {
      t.boolean('truths', {
        subscribe() {
          return (async function*() {
            while (true) {
              await new Promise(res => setTimeout(res, 1000))
              yield Math.random() > 0.5
            }
          })()
        },
        resolve(eventData) {
          return eventData
        },
      })
    },
  })

  return [testSubscribe]
}
