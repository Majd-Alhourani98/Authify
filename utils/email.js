const transporter = require('../config/transporter');

const sendEmail = async options => {
  const mailOptions = {
    from: `${process.env.MAIL_FROM_NAME || 'Support'} <${process.env.MAIL_FROM_ADDRESS}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('📧 Email sending failed:', error.message);
  }
};

module.exports = sendEmail;
