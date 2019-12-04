"use strict";

const Mail = use("Mail");
const User = use("App/Models/User");
const RandomAvatar = use("random-avatar");
const RandomName = use("username-generator");

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

  async register({ request }) {
    const { email, password } = request.all();
    try {
      const userData = {
        username: RandomName.generateUsername(),
        nikeName: RandomName.generateUsername("-"),
        email: email,
        password: password,
        avatar: RandomAvatar()
      };
      const user = await User.create(userData);
      const emailSendStatus = await Mail.send(
        "emails.welcome",
        user.toJSON(),
        message => {
          message
            .to(user.email)
            .from("team@yardstick.io", "Doniai")
            .subject("Welcome to doniai");
        }
      );
      return {
        data: user,
        emailSendStatus: emailSendStatus
      };
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
