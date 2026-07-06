const authRepository = require("../repository/auth_repository");
const bcrypt = require("bcrypt");
const RegisterRequestDto = require("../dtos/register_request_dto");

const registerController = async (req, res, next) => {
    try {
        const registerDto = RegisterRequestDto.fromRequest(req.body);
        const existingUser = await authRepository.findUserByEmail(registerDto.email);
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        await authRepository.createUser({
            name: registerDto.name,
            email: registerDto.email,
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