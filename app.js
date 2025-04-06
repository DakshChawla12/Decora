require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const syncDatabase = require("./config/syncDatabase");
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET, // use env variable in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if using HTTPS
}));

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
const userRoutes = require("./routes/userRoutes");
const designationRoutes = require("./routes/designationRoutes");
const productRoutes = require("./routes/productRoutes");
const brandRoutes = require("./routes/brandRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cartRoutes = require("./routes/cartRoutes");
const discountRoutes = require("./routes/discountRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const wishListRoutes = require("./routes/wishlistRoutes");

// *** Setting the routers *** //
app.use("/api/cart", cartRoutes);
app.use("/api/discount", discountRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/wishlist", wishListRoutes);
app.use("/api/country", countryRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/region", regionRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/role-permissions", role_permissionsRoutes);
app.use("/api/permission", permissionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/designation", designationRoutes);
app.use("/api/product", productRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/review", reviewRoutes);

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