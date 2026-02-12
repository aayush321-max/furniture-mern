const SibApiV3Sdk = require("sib-api-v3-sdk");
const fs = require("fs");

const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  const client = SibApiV3Sdk.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  const sender = {
    email: process.env.ADMIN_EMAIL,
    name: "FurniLux",
  };

  const receivers = [{ email: to }];

  // 🔥 Convert attachments to Brevo format
  const formattedAttachments = attachments.map((file) => ({
    name: file.filename,
    content: fs.readFileSync(file.path).toString("base64"),
  }));

  try {
    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject,
      htmlContent: html,
      attachment: formattedAttachments,
    });

    console.log("Email sent successfully to", to);
  } catch (error) {
    console.error("Brevo API Error:", error.response?.body || error);
  }
};

module.exports = sendEmail;