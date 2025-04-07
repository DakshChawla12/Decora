const { User, Role, Customer } = require("../models/associations");
const { hashPassword, comparePassword } = require("../config/passwordUtils");

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, roleId = 3 } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser)
            return res.status(400).json({ success: false, message: "Email already in use" });

        const role = await Role.findByPk(roleId);
        if (!role)
            return res.status(404).json({ success: false, message: "Role not found" });

        const hashedPassword = await hashPassword(password);

        const user = await User.create({ name, email, password: hashedPassword, roleId });

        res.status(201).json({ success: true, message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: { model: Role, as: 'role' }
        });

        res.json({ success: true, message: "Users fetched successfully", users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        const user = await User.findByPk(req.params.id, {
            include: { model: Role, as: 'role' }
        });

        if (!user)
            return res.status(404).json({ success: false, message: 'User not found' });

        res.json({ success: true, message: "User fetched successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, password, roleId } = req.body;

        const user = await User.findByPk(req.session.userId);

        if (!user)
            return res.status(404).json({ success: false, message: 'User not found' });

        const hashedPassword = password ? await hashPassword(password) : user.password;

        await user.update({ name, email, password: hashedPassword, roleId });

        res.json({ success: true, message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.session.userId);

        if (!user)
            return res.status(404).json({ success: false, message: 'User not found' });

        await user.destroy();
        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            include: { model: Role, as: 'role' }
        });

        if (!user)
            return res.status(401).json({ success: false, message: 'Invalid email or password' });

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch)
            return res.status(401).json({ success: false, message: 'Invalid email or password' });

        // Check if the customer record exists
        let customer = await Customer.findOne({ where: { userId: user.id } });
        if (!customer) {
            // Create a customer record if not found
            customer = await Customer.create({ userId: user.id, name: user.name });
        }

        // Store user and customer info in session
        req.session.userId = user.id;
        req.session.email = user.email;
        req.session.name = user.name;
        req.session.roleId = user.roleId;
        req.session.customerId = customer.id; // Storing customer ID

        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.roleId,
                roleName: user.role ? user.role.name : 'Unknown',
                customerId: customer.id // Sending customer ID to frontend
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.logout = (req, res) => {
    try {
        if (!req.session || !req.session.userId) {
            return res.status(400).json({ success: false, message: 'No user is logged in' });
        }

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Failed to log out' });
            }
            res.json({ success: true, message: 'Logged out successfully' });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
