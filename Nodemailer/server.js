import "dotenv/config"
import express from "express"
import cors from "cors"
import nodemailer from "nodemailer"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

function buildEnquiryHtml(data) {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company / Organization", data.company || "—"],
    ["Interested In", data.division || "—"],
    ["Message", data.message],
  ]
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 14px;font-weight:600;color:#0B2D5C;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eef1f5">${label}</td><td style="padding:10px 14px;color:#334155;vertical-align:top;border-bottom:1px solid #eef1f5">${value}</td></tr>`
    )
    .join("")

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e9f0;border-radius:12px;overflow:hidden">
      <div style="background:#0B2D5C;padding:20px 24px">
        <div style="color:#F4B400;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Hitech Group</div>
        <div style="color:#ffffff;font-size:20px;font-weight:700;margin-top:4px">New Contact Form Enquiry</div>
      </div>
      <div style="padding:24px">
        <p style="color:#334155;font-size:14px;margin:0 0 16px">A new enquiry has been submitted through the website contact form.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${rows}
        </table>
        <p style="color:#94A3B8;font-size:12px;margin:20px 0 0">This email was generated automatically from the Hitech Group website.</p>
      </div>
    </div>
  `
}

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, company, division, message } = req.body || {}

  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, phone and message are required.",
    })
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return res.status(500).json({
      success: false,
      error: "Email service is not configured. Please check the server .env file.",
    })
  }

  const recipient = process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER
  const data = { name, email, phone, company, division, message }

  try {
    await transporter.sendMail({
      from: `"Hitech Group Website" <${process.env.GMAIL_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `New Enquiry from ${name} — ${division || "General Enquiry"}`,
      text: [
        "New Contact Form Enquiry",
        "----------------------------",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Company: ${data.company || "—"}`,
        `Interested In: ${data.division || "—"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
      html: buildEnquiryHtml(data),
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error("Failed to send enquiry email:", err)
    return res.status(500).json({
      success: false,
      error: "Failed to send your message. Please try again later.",
    })
  }
})

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" })
})

app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`)
})
