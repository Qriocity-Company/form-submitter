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

const resend = new Resend('re_YdxGfkmh_MLyNKexkX47NgyRVdZhUVZCY');

app.post('/submit-form', async (req, res) => {
  try {
    const { email } = req.body;

    console.log(email)
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Hello World',
      html: '<strong>It works!</strong>',
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
