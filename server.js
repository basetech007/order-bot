import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ganti ini dengan TOKEN BOT Telegram mu
const TELEGRAM_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID"; // id grup / user telegram

app.post("/order", async (req, res) => {
  const { nama, produk, jumlah, catatan } = req.body;

  const text = `🛒 Order Baru Masuk
👤 Nama: ${nama}
📦 Produk: ${produk}
🔢 Jumlah: ${jumlah}
📝 Catatan: ${catatan}`;

  // kirim ke telegram
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text }),
  });

  res.json({ status: "ok", message: "Order diterima" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
