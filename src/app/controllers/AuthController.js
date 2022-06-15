const AuthService = require('../services/AuthService');

class AuthController {
    async auth(req, res) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.auth(email, password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({
                error: error.message
            });
        }
    }
}

module.exports = new AuthController();
