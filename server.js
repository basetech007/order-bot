import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ganti ini dengan token bot telegram kamu
const TELEGRAM_BOT_TOKEN = "ISI_TOKEN_BOTMU";
const CHAT_ID = "ISI_CHAT_IDMU"; // id telegram admin yg nerima notif

app.post("/api/order", async (req, res) => {
  try {
    const { nama, produk, jumlah, catatan } = req.body;

    const message = `🛒 Order Baru Masuk
Nama: ${nama}
Produk: ${produk}
Jumlah: ${jumlah}
Catatan: ${catatan || "-"}`;

    // kirim ke telegram
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    res.json({ success: true, message: "Order berhasil dikirim ke Telegram" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Gagal kirim order" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
