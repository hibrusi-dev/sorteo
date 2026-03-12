/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = new Collection({
        "name": "participantes_anteriores",
        "type": "base",
        "listRule":   null,
        "viewRule":   null,
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "fields": [
            { "name": "email",         "type": "email", "required": true  },
            { "name": "instagram",     "type": "text",  "required": false },
            { "name": "sorteo_titulo", "type": "text",  "required": false },
            { "name": "ganador",       "type": "bool",  "required": false },
            { "name": "premio",        "type": "text",  "required": false }
        ]
    });
    app.save(collection);
}, (app) => {
    app.delete(app.findCollectionByNameOrId("participantes_anteriores"));
});
