/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const col = app.findCollectionByNameOrId("sorteo_config");
    col.fields.add(new Field({ "name": "imagen",    "type": "file",   "required": false, "maxSelect": 1, "maxSize": 5242880, "mimeTypes": ["image/jpeg","image/png","image/webp","image/gif"] }));
    col.fields.add(new Field({ "name": "fecha_fin", "type": "date",   "required": false }));
    app.save(col);
}, (app) => {
    const col = app.findCollectionByNameOrId("sorteo_config");
    col.fields.removeByName("imagen");
    col.fields.removeByName("fecha_fin");
    app.save(col);
});
