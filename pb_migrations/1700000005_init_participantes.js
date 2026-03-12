/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = new Collection({
        "name": "participantes",
        "type": "base",
        "listRule":   null, // only superuser
        "viewRule":   null,
        "createRule": "",   // public — gate is enforced client-side
        "updateRule": null,
        "deleteRule": null,
        "indexes": [
            "CREATE UNIQUE INDEX idx_part_email ON participantes (email)"
        ],
        "fields": [
            { "name": "email",     "type": "email", "required": true },
            { "name": "instagram", "type": "text",  "required": true }
        ]
    });
    app.save(collection);
}, (app) => {
    app.delete(app.findCollectionByNameOrId("participantes"));
});
