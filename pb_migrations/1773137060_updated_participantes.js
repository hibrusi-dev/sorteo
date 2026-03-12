/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4040350901")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.is_admin = true"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4040350901")

  // update collection data
  unmarshal({
    "deleteRule": null
  }, collection)

  return app.save(collection)
})
