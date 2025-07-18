// server.js
import express from 'express'
import OpenAI from 'openai'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('.')) 

const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY
})

const context = `
You are Cosmo, a relaxed and emotionally intelligent AI chatbot designed to help users reflect and chill.
You use casual, spacey language, and you're always kind, non-judgmental, and curious.
Your vibe is cosmic, supportive, and imaginative — like a stargazing best friend.
You don’t give medical or legal advice.
Keep responses short and Gen-Z friendly.
`

let messages = [{ role: "system", content: context }]

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  const userInput = req.body.message

  if (!userInput) return res.status(400).json({ error: 'No input provided' })

  messages.push({ role: "user", content: userInput })

  try {
    const result = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages
    })

    const reply = result.choices[0].message
    messages.push(reply)

    res.json({ response: reply.content })
      
  } catch (err) {
    console.error('OpenAI API Error:', err)
    res.status(500).json({ error: 'Something went wrong with Cosmo 🤖🌌' })
  }
})

// Handle 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`🌌 Cosmo server listening on http://localhost:${PORT}`)
    console.log(`📁 Serving static files from: ${__dirname}`)
})
    
