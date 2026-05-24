const { createUser, findUserByEmail } = require("../repository/auth_repository");
const bcrypt = require("bcrypt");

const registerController = async (req, res, next) => {
    try {
        const existingUser = await findUserByEmail(req.body.email);
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await createUser({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        next(error);
    }
}

module.exports = registerController;