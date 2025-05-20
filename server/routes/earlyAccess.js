const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
require('dotenv').config()

router.post('/', async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Referouts Early Access" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: '📥 New Early Access Signup',
      text: `New signup email: ${email}`,
    })

    res.status(200).json({ message: '✅ You’ve been added to the list!' })
  } catch (err) {
    console.error('❌ Email error:', err)
    res.status(500).json({ message: '❌ Failed to send email' })
  }
})

module.exports = router