const NodeCache = require("node-cache");
const otpCache = new NodeCache({ stdTTL: 600 }); // OTP valid for 10 minutes

const generateOTP = () => Math.floor(100000 + Math.random() * 900000); // already returns an integer

const storeOTP = async (userId, otp) => {
    otpCache.set(userId, parseInt(otp, 10));
};

const verifyOTP = async (userId, otp) => {
    const storedOTP = otpCache.get(userId);
    const inputOTP = parseInt(otp, 10);

    if (storedOTP && storedOTP === inputOTP) {
        otpCache.del(userId); // Delete after successful match
        return true;
    }
    return false;
};

module.exports = { generateOTP, storeOTP, verifyOTP };
