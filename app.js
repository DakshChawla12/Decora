require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const syncDatabase = require("./config/syncDatabase"); // Import sync function

const app = express();

//middleware
app.use(express.json());

// *** Importing all the routes *** //
const countryRoutes = require("./routes/countryRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const customerRoutes = require("./routes/customerRoutes");
const stateRoutes = require("./routes/stateRoutes");
const regionRoutes = require("./routes/regionRoutes");
const roleRoutes = require("./routes/roleRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const role_permissionsRoutes = require("./routes/role_permissionsRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const country_stateRoutes = require("./routes/country_stateRoutes");
const region_countryRoutes = require("./routes/region_countryRoutes");
const userRoutes = require("./routes/userRoutes");
const designation_routes = require("./routes/designationRoutes");
const department_designation_routes = require("./routes/department_designRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// *** Setting the routers *** //
app.use("/api/country", countryRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/region", regionRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/role-permissions", role_permissionsRoutes);
app.use("/api/permission", permissionRoutes);
app.use("/api/country-state", country_stateRoutes);
app.use("/api/region-country", region_countryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/designation", designation_routes);
app.use("/api/department-design", department_designation_routes);
app.use("/api/category", categoryRoutes);
app.use("/api/product",productRouter);
app.use("/api/review",reviewRoutes);



// *** Connect to database first and sync tables ***
connectDB()
    .then(() => syncDatabase()) // ✅ Correct way to call the function
    .then(() => {
        console.log("✅ Database synced");
        const PORT = process.env.PORT || 5001;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Error initializing app:", err);
    });
