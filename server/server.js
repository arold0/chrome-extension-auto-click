require('dotenv').config();
const express = require('express');
const twilio = require('twilio');

const app = express();
app.use(express.json());

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/notify', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // Número del sandbox de WhatsApp
      to: `whatsapp:${process.env.RECIPIENT_PHONE_NUMBER}` // Número destino registrado
    });
    console.log('Mensaje de WhatsApp enviado:', response.sid);
    res.status(200).send('Mensaje de WhatsApp enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el mensaje de WhatsApp:', error);
    res.status(500).send('Error al enviar el mensaje de WhatsApp');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
