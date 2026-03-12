/// <reference path="../pb_data/types.d.ts" />

/**
 * Rate limiting for participantes registrations.
 * Max 5 submissions per IP per hour.
 * Uses $app.store() for state persistence across hook invocations.
 */
onRecordCreateRequest((e) => {
    const WINDOW_MS = 60 * 60 * 1000; // 1 hora
    const MAX_REQS  = 5;

    const info = e.requestInfo();
    const raw  = (info.headers["x-forwarded-for"]
               || info.headers["x-real-ip"]
               || info.headers["X-Forwarded-For"]
               || info.headers["X-Real-Ip"]
               || "unknown");
    const ip   = raw.split(",")[0].trim() || "unknown";
    const now  = Date.now();
    const key  = "rl_" + ip;

    let timestamps = $app.store().get(key) || [];

    // Purge timestamps outside window
    timestamps = timestamps.filter(t => now - t < WINDOW_MS);

    if (timestamps.length >= MAX_REQS) {
        throw new ApiError(429, "Demasiados intentos. Espera un rato.");
    }

    timestamps.push(now);
    $app.store().set(key, timestamps);

    e.next();
}, "participantes");
