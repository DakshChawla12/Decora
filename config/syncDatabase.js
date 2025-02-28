const { sequelize } = require("./database");

// Import all models
require("../models/country");
require("../models/country_state");
require("../models/customer");
require("../models/department_design");
require("../models/department");
require("../models/designation");
require("../models/employee");
require("../models/permissions");
require("../models/region_country");
require("../models/region");
require("../models/role_permissions");
require("../models/roles");
require("../models/state");
require("../models/user");

async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true }); // Updates tables without deleting data
        console.log("✅ Tables synchronized successfully!");
    } catch (error) {
        console.error("❌ Error syncing database:", error);
    }
}

module.exports = syncDatabase;
