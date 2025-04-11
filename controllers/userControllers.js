const { User, Role, Customer } = require("../models/associations");
const { hashPassword, comparePassword } = require("../config/passwordUtils");
const { generateToken } = require('../middlewares/authMiddlewares');

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

        let customer = await Customer.findOne({ where: { userId: user.id } });
        if (!customer) {
            customer = await Customer.create({ userId: user.id, name: user.name });
        }

        // Prepare JWT payload
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            roleName: user.role ? user.role.name : 'Unknown',
            customerId: customer.id
        };

        // Generate token using the custom generateToken function
        const token = generateToken(payload);

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: payload
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.user.id; // Use req.user.id from JWT middleware instead of session
        const { name, email } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Only update fields that are provided
        const updates = {};
        if (name !== undefined) updates.name = name;
        if (email !== undefined) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser && existingUser.id !== userId) {
                return res.status(400).json({ success: false, message: "Email already in use" });
            }
            updates.email = email;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: "No fields provided to update" });
        }

        await user.update(updates);

        res.json({ success: true, message: "User details updated successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update user password
exports.updatePassword = async (req, res) => {
    try {
        const userId = req.user.id; // Use req.user.id from JWT middleware
        const { oldPassword, newPassword, repeatPassword } = req.body;

        if (!oldPassword || !newPassword || !repeatPassword) {
            return res.status(400).json({ success: false, message: "All password fields are required" });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Verify old password
        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Old password is incorrect" });
        }

        // Check if new password matches repeat password (already checked on frontend, but recheck for safety)
        if (newPassword !== repeatPassword) {
            return res.status(400).json({ success: false, message: "New password and repeat password do not match" });
        }

        // Hash and update new password
        const hashedPassword = await hashPassword(newPassword);
        await user.update({ password: hashedPassword });

        res.json({ success: true, message: "Password updated successfully" });
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
