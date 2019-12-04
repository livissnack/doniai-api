"use strict";

class UserController {
  async login({ auth, request }) {
    const { email, password } = request.all();
    try {
      const loginStatus = await auth.attempt(email, password);
      return loginStatus;
    } catch (error) {
      return error.toString();
    }
  }

  async logout({ auth }) {
    try {
      const logoutStatus = await auth.logout();
      return logoutStatus;
    } catch (error) {
      return error.toString();
    }
  }
}

module.exports = UserController;
