import db from "#db/client";

// Got this from the Market solution
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");
