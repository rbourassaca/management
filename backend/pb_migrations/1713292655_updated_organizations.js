/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p6b0efybpik4xb4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gwsvitmh",
    "name": "members",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p6b0efybpik4xb4")

  // remove
  collection.schema.removeField("gwsvitmh")

  return dao.saveCollection(collection)
})
