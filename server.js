const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// === KONFIGURASI ===
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN; 
const CHAT_ID = process.env.CHAT_ID; 
const bot = new TelegramBot(TELEGRAM_TOKEN);

// === ROUTE FORM ===
app.post('/order-form', (req, res) => {
  const { nama, produk, jumlah, catatan } = req.body;
  const pesan = `
🛒 Order Baru Masuk
👤 Nama: ${nama}
📦 Produk: ${produk}
🔢 Jumlah: ${jumlah}
📝 Catatan: ${catatan || "-"}
`;

  bot.sendMessage(CHAT_ID, pesan);
  res.send("Order berhasil dikirim!");
});

// === TEST ROUTE ===
app.get('/', (req, res) => {
  res.send('Order Bot aktif 🚀');
});

// === START SERVER ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});
