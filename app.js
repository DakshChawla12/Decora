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

// *** Setting the routers *** //
app.use("/api/country", countryRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/region", regionRoutes);
app.use("/api/role", roleRoutes);


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
