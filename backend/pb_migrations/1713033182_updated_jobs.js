/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tfti189rvrq1tpo")

  collection.listRule = "@collection.organization.jobs.id ~ @collection.jobs.id"
  collection.viewRule = "@collection.organization.jobs.id ~ @collection.jobs.id"
  collection.createRule = ""
  collection.updateRule = "@collection.organization.jobs.id ~ @collection.jobs.id"
  collection.deleteRule = "@collection.organization.jobs.id ~ @collection.jobs.id && @collection.organization.admins.id ~ @collection.users.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tfti189rvrq1tpo")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
