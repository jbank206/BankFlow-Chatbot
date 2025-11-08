// Chatbot data: Customize these responses for Bankflow sales
const responses = {
    greeting: "Hi! I'm the Bankflow Assistant. I help tradespeople like you automate phone calls to win more jobs without interruptions. What can I help with today? (e.g., 'How it works', 'Pricing', 'Demo')",
    "how it works": "Bankflow handles your incoming calls automatically—filters emergencies, answers FAQs, and books leads. No more missed calls or phone tag! Focus on your work and start weeks with pre-qualified jobs. Learn more at bankflow.net.",
    "pricing": "Our plans start free for basics, with pro tiers at $29/month for full automation. Save 2+ hours daily on calls. Ready to try? Sign up here: <a href='https://bankflow.net/signup' target='_blank'>Get Started</a>",
    "demo": "Great! Schedule a quick demo to see how Bankflow turns missed calls into leads. <a href='https://bankflow.net/demo' target='_blank'>Book Now</a> – or reply with your email for a callback.",
    "leads": "Bankflow qualifies leads 24/7, so you get hot prospects ready to book. Trades like electricians and landscapers report 40% more work. Interested? Share your name and email!",
    default: "That's interesting! Tell me more, or ask about 'How it works', 'Pricing', or 'Demo'. P.S. Automate your calls with Bankflow.net today!",
    email: "Thanks! I'll send you Bankflow info right away. In the meantime, check out <a href='https://bankflow.net' target='_blank'>our site</a>."
};

// Elements
const chatContainer = document.getElementById('chat-container');
const chatTrigger = document.getElementById('chat-trigger');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Toggle chat
chatTrigger.addEventListener('click', () => {
    chatContainer.style.display = 'flex';
    addMessage('bot', responses.greeting);
});

closeChat.addEventListener('click', () => {
    chatContainer.style.display = 'none';
});

// Send message
function sendMessage() {
    const userText = chatInput.value.trim().toLowerCase();
    if (!userText) return;

    addMessage('user', userText);
    chatInput.value = '';

    // Find response
    let botResponse = responses.default;
    for (let key in responses) {
        if (userText.includes(key)) {
            botResponse = responses[key];
            break;
        }
    }

    // If asking for email, collect it (simple check)
    if (userText.includes('email') || userText.includes('@')) {
        // Here, you could integrate EmailJS for free lead capture: https://www.emailjs.com/
        // For now, just respond
        botResponse = responses.email;
    }

    setTimeout(() => addMessage('bot', botResponse), 500);
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Add message to chat
function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.innerHTML = text; // Supports HTML links
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
