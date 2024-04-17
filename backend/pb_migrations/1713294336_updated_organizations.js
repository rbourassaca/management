/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p6b0efybpik4xb4")

  collection.viewRule = "owners.id ?= @request.auth.id"
  collection.createRule = "@request.auth.verified = true"
  collection.updateRule = "owners.id ?= @request.auth.id"
  collection.deleteRule = "owners.id ?= @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p6b0efybpik4xb4")

  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
