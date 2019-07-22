"use strict";
const Mail = use("Mail");

class EmailController {
  async send({ request, response }) {
    try {
      const formMail = request.input("form", "livissnack@doniai.com");
      const toMail = request.input("to", "guanxin@tinytiger.cn");
      const data = await Mail.send("emails.welcome", {}, message => {
        message.from(formMail);
        message.to(toMail);
      });
      return response.json({
        status: "success",
        msg: "邮件发送成功",
        data: data
      });
    } catch (error) {
      return response.json({
        status: "failure",
        msg: "邮件发送失败",
        data: error.toString()
      });
    }
  }
}

module.exports = EmailController;
