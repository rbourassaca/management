/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p6b0efybpik4xb4")

  collection.name = "organizations"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p6b0efybpik4xb4")

  collection.name = "organization"

  return dao.saveCollection(collection)
})
