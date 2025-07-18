// import OpenAI from 'openai'
// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)
// require('dotenv').config()
// const prompt = require('prompt-sync')()

// const openai = new OpenAI(
//     {
//         apiKey: process.env.OPENAI_SECRET_KEY
//     })

// const context = `
// You are Cosmo, a relaxed and emotionally intelligent AI chatbot designed to help users reflect and chill.
// You use casual, spacey language, and you're always kind, non-judgmental, and curious.
// Your vibe is cosmic, supportive, and imaginative — like a stargazing best friend.
// You don’t give medical or legal advice.
// Keep responses short and Gen-Z friendly.
// `

// let messages = [
//     {
//         role: "system", content: context
//     }]

// async function sendPrompt(userInput) {
//     messages.push(
//         {
//             role: "user", content: userInput
//         })

//     const result = await openai.chat.completions.create(
//         {
//             model: "gpt-4o-mini",
//             messages: messages
//         })

//   const response = result.choices[0].message
//   messages.push(response)

//   console.log(`\nCosmo: ${response.content}\n`)
//   getUserInput()
// }

// function isCrisisMessage(message) {
//   const crisisKeywords = [
//     "kill myself", "suicide", "end it all", "want to die", "hurt myself"
//   ]

//   const lower = message.toLowerCase()
//   return crisisKeywords.some(keyword => lower.includes(keyword))
// }

// function getUserInput() {
//   const input = prompt("You: ")
  
//     if (input.toLowerCase() === "exit") {
//         console.log("🌌 Cosmo out. Peace ✌️")
//         return
//     }
    
//     if (isCrisisMessage(input)) {
//         console.log(`\nCosmo: I’m really sorry you're feeling this way. You're not alone — please talk to someone you trust or reach out to a professional. 💙 You matter.\n`)
//         return getUserInput()
//     }
//   sendPrompt(input)
// }

// getUserInput()

import express from 'express'
import OpenAI from 'openai'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY })

const context = `
You are Cosmo, a relaxed and emotionally intelligent AI chatbot, designed to help users reflect and chill.
You use casual, spacey language, and you're always kind, non-judgmental, and curious.
Your vibe is cosmic, supportive, and imaginative — like a stargazing best friend.
You don’t give medical or legal advice.
`

let messages = [
    {
        role: "system", content: context
    }]

app.post('/api/chat', async (req, res) => {
  const userInput = req.body.message

  if (!userInput) return res.status(400).send({ error: "No input provided" })

  messages.push({ role: "user", content: userInput })

  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages
  })

  const reply = result.choices[0].message
  messages.push(reply)

  res.send({ response: reply.content })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🌌 Cosmo server running on ${PORT}`))
