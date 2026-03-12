/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3818476082")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.is_admin = true",
    "deleteRule": "@request.auth.is_admin = true"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3818476082")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null
  }, collection)

  return app.save(collection)
})
