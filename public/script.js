//Starfield background
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const STAR_COUNT = 100;
let result = "";
for (let i = 0; i < STAR_COUNT; i++) {
    result += `${randomNumber(-50, 50)}vw ${randomNumber(-50, 50)}vh ${randomNumber(0, 3)}px ${randomNumber(0, 3)}px #fff,`;
}
const finalBoxShadow = result.slice(0, -1); 

const starfield = document.createElement("div");
starfield.classList.add("main");
starfield.style.boxShadow = finalBoxShadow;
document.body.appendChild(starfield);

//Chatbot functionality
const form = document.getElementById("chat-form")
const input = document.getElementById("user-input")
const messagesDiv = document.getElementById("chat-messages")

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const userMessage = input.value.trim()
  if (!userMessage) return

  appendMessage("user", userMessage)
    input.value = ""
    
    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        })
        
        if (!res.ok) {
            const errorText = await res.text()
            throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`)
        }

        const data = await res.json()
        

        appendMessage("bot", data.response || "Hmm... no response.")
    } catch (err) {
        console.error("Fetch error:", err)
        appendMessage("bot", "⚠️ Something went wrong. Try again later." + err)
    }
})

function appendMessage(sender, text) {
  const msgDiv = document.createElement("div")
  msgDiv.className = `message ${sender}-message`
  msgDiv.textContent = text
  messagesDiv.appendChild(msgDiv)
  messagesDiv.scrollTop = messagesDiv.scrollHeight
}

