require("dotenv").config(); // Load environment variables
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected...");
    } catch (err) {
        console.error("❌ Database connection failed:", err);
        process.exit(1);
    }
}

module.exports = { sequelize, connectDB };

