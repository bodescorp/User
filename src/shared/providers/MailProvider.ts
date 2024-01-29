import * as sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface ISendEmailParams {
  to: string;
  subject: string;
  text: string;
}

export default async function sendEmail({
  to,
  subject,
  text,
}: ISendEmailParams) {
  const msg = {
    to, // Change to your recipient
    from: "glaymar2010@live.com", // Change to your verified sender
    subject,
    text,
    html: `<strong>${text}}</strong>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email, enviado com sucesso");
  } catch (error) {
    console.log(`Erro ao enviar o email:`, error);
  }
}
