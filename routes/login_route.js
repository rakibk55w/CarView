const loginRouter = express.Router();

loginRouter.post("/login", loginValidator, loginController);

module.exports = loginRouter;