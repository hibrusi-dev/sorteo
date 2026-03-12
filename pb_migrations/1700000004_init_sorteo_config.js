/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = new Collection({
        "name": "sorteo_config",
        "type": "base",
        "listRule": "",     // public read — frontend shows the sorteo title
        "viewRule": "",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "fields": [
            { "name": "titulo",  "type": "text", "required": true },
            { "name": "premios", "type": "text", "required": false }, // JSON: [{nombre,cantidad}]
            { "name": "activo",  "type": "bool", "required": false }
        ]
    });
    app.save(collection);
}, (app) => {
    app.delete(app.findCollectionByNameOrId("sorteo_config"));
});
