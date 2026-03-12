/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = new Collection({
        "name": "config",
        "type": "base",
        "listRule": "",                              // public read (frontend needs it without auth)
        "viewRule": "",
        "createRule": null,
        "updateRule": "@request.auth.is_admin = true",
        "deleteRule": null,
        "fields": [
            {
                "name": "access_password",
                "type": "text",
                "required": true
            }
        ]
    });
    app.save(collection);

    // Seed default access password
    const col    = app.findCollectionByNameOrId("config");
    const record = new Record(col, { "access_password": "CHANGEME" });
    app.save(record);

}, (app) => {
    const collection = app.findCollectionByNameOrId("config");
    app.delete(collection);
});
