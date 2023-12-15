import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';


const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: "*",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const resend = new Resend('re_B7HdRo92_AJ5df3nkFV7XYXNoSs9Mxi9U');

app.post('/submit-form', async (req, res) => {
  try {
    const { formData } = req.body;
    const senderEmail = formData.senderEmail
    const message = formData.message
    const phno = formData.phoneNumber
    const name = formData.name

    console.log(senderEmail)

    const data = await resend.emails.send({
      from: "Qriocity.in <onboarding@resend.dev>",
      to: "responses.qriocity@gmail.com",
      subject: "New message from Invictus",
      html: `<h3> ${name} sended a message on Qriocity.in :</h3>
       <p>The Sender Mobile no is :${phno}</p> <br/> 
       <p>The message is: ${message}</p>
            `,
    });
    console.log(data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`form backend listening on port ${port}`);
});
