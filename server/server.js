require('dotenv').config();
const express = require('express');
const twilio = require('twilio');

const app = express();
app.use(express.json());

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/notify', (req, res) => {
  const { message } = req.body;
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.RECIPIENT_PHONE_NUMBER
    })
    .then(() => res.status(200).send('SMS enviado'))
    .catch(err => res.status(500).send(err));
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
