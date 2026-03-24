/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_432047489")

  // remove field
  collection.fields.removeById("text1251589529")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number1251589529",
    "max": null,
    "min": null,
    "name": "importance",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_432047489")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1251589529",
    "max": 0,
    "min": 0,
    "name": "importance",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number1251589529")

  return app.save(collection)
})
