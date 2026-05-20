require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the React client 'dist' directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Email Transporter Setup
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Route for handling contact form submission
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide all required fields (name, email, message).' });
    }

    try {
        const mailOptions = {
            from: `"${name}" <${email}>`, 
            to: process.env.EMAIL_USER || 'your-email@gmail.com', 
            subject: `New Portfolio Contact from ${name}`, 
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, 
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

        // Auto-reply to the sender
        const firstName = name.split(' ')[0];
        const autoReplyOptions = {
            from: `"Tarang Prajapati" <${process.env.EMAIL_USER || 'your-email@gmail.com'}>`,
            to: email,
            subject: `Thank You for Connecting`,
            text: `Hi ${firstName},\n\nThank you for reaching out. I have received your inquiry successfully.\n\nI will review the details and get back to you within the next 24 hours with an update or further information.\n\nBest regards,\nTarang Prajapati`,
            html: `<div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                     <h2 style="color: #4cd7f6;">Thank You for Connecting</h2>
                     <p>Hi <strong>${firstName}</strong>,</p>
                     <p>Thank you for reaching out. I have received your inquiry successfully.</p>
                     <p>I will review the details and get back to you within the next 24 hours with an update or further information.</p>
                     <br/>
                     <p>Best regards,</p>
                     <p><strong>Tarang Prajapati</strong></p>
                   </div>`
        };

        await transporter.sendMail(autoReplyOptions);

        res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send the message. Please try again later or verify your email credentials.' });
    }
});

// Fallback for React Router (catch-all)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
