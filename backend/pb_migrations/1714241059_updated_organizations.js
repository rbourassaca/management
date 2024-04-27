/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p6b0efybpik4xb4")

  collection.listRule = "owners.id ?= @request.auth.id || administrators.id ?= @request.auth.id || members.id ?= @request.auth.id"
  collection.viewRule = "owners.id ?= @request.auth.id || administrators.id ?= @request.auth.id || members.id ?= @request.auth.id"
  collection.updateRule = "owners.id ?= @request.auth.id || administrators.id ?= @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p6b0efybpik4xb4")

  collection.listRule = "owners.id ?= @request.auth.id || members.id ?= @request.auth.id"
  collection.viewRule = "owners.id ?= @request.auth.id || members.id ?= @request.auth.id"
  collection.updateRule = "owners.id ?= @request.auth.id"

  return dao.saveCollection(collection)
})
