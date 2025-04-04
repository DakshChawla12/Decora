const { sequelize } = require("./database");

async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true }); // Updates tables without deleting data
        console.log("✅ Tables synchronized successfully!");
    } catch (error) {
        console.error("❌ Error syncing database:", error);
    }
}

module.exports = syncDatabase;
