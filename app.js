const sequelize = require('./config/database')
const Country = require('./models/country');
const Country_State = require('./models/country_state');
const customer = require('./models/customer');
const department_design = require('./models/department_design');
const department = require('./models/department');
const designation = require('./models/designation');
const employee = require('./models/employee');
const permissions = require('./models/permissions');
const region_country = require('./models/region_country');
const region = require('./models/region');
const role_permissions = require('./models/role_permissions');
const roles = require('./models/roles');
const state = require('./models/state');
const user = require('./models/state');
async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("✅ All tables synchronized!");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
}

syncDatabase();