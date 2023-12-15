import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: "*",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.post('/submit-form', async (req, res) => {
  try {
    const { formData } = req.body;
    const senderEmail = formData.senderEmail
    const message = formData.message
    const phno = formData.phoneNumber
    const name = formData.name

    console.log(senderEmail)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'responses.qriocity@gmail.com',
            pass: process.env.pass 
        }
    });
    const mailOptions = {
        from: 'responses.qriocity@gmail.com', // Replace with your Gmail address
        to: 'responses.qriocity@gmail.com', // Replace with your actual email address
        subject: 'New Form Submission',
        text: `Name: ${name}\nNumber: ${phno}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(error);
        }
        console.log('Email sent: ' + info.response);
    });

    res.send('Form submitted successfully!');


  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`form backend listening on port ${port}`);
});
