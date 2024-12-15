import * as nodemailer from 'nodemailer'

export const sendEmail = async (email, subject, text) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    })

    await transporter.sendMail({
        from: '"ServicePanda" <nodejs@example.com>',
        to: email,
        subject: subject,
        text: text,
        html: `<b>${text}</b>`,
    })

}

