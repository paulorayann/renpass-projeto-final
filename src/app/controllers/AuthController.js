const AuthService = require('../services/AuthService');

class AuthController {
  async auth(req, res) {
    try {
      const { email, password } = req.body;
      const { token } = req.headers;
      const result = await AuthService.auth(email, password, token);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.errorStatus || 401).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
