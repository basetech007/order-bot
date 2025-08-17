export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 🔑 Ganti dengan token bot dan chat ID milikmu
  const TELEGRAM_BOT_TOKEN = "ISI_TOKEN_BOTMU";
  const CHAT_ID = "ISI_CHAT_IDMU";

  const { nama, produk, jumlah, catatan } = req.body;

  const message = `🛒 Order Baru Masuk
Nama: ${nama}
Produk: ${produk}
Jumlah: ${jumlah}
Catatan: ${catatan || "-"}`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      }),
    });

    return res.status(200).json({ success: true, message: "Order berhasil dikirim ke Telegram" });
  } catch (err) {
    console.error("Telegram Error:", err);
    return res.status(500).json({ success: false, error: "Gagal kirim order" });
  }
}
