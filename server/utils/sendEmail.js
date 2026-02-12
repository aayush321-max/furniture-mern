const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async ({ to, subject, html }) => {
  const client = SibApiV3Sdk.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  const sender = {
    email: process.env.ADMIN_EMAIL,
    name: "FurniLux",
  };

  const receivers = [{ email: to }];

  try {
    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject,
      htmlContent: html,
    });

    console.log("Email sent successfully to", to);
  } catch (error) {
    console.error("Brevo API Error:", error);
  }
};

module.exports = sendEmail;