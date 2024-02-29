const nodemailer = require('nodemailer');

// Load email credentials from environment variables
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmailNotification = (book) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: 'New Book Added',
        text: `A new book has been added:\n\nName: ${book.name}\nAuthor: ${book.author}\nPublish Year: ${book.publish_year}\nPages Count: ${book.pages_count}\nPrice: ${book.price}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = { sendEmailNotification };
