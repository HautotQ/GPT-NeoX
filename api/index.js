import express from 'express';
import { Client } from '@gradio/client';
import cors from 'cors';

const app = express();
app.use(cors());

app.get("/chat", async (req, res) => {
  const message = req.query.q || "Bonjour !";

  const client = await Client.connect("TabarcraftOfficiel/GPT-NeoX");
  const result = await client.predict("/chat", {
    message: message,
    system_message: "Tu es un assistant utile.",
    max_tokens: 100,
    temperature: 0.7,
    top_p: 0.9,
  });

  res.send(result.data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en ligne sur le port ${PORT}`);
});
