// === BANKFLOW CHATBOT - FULLY TRAINED ON bankflow.net ===
// Deployed at: https://yourusername.github.io/bankflow-chatbot/

const clientConfig = {
    website: 'https://bankflow.net',
    company: 'Bankflow',
    tagline: 'AI Phone Automation for Trades – Never Miss a Lead Again',
    howItWorks: `Bankflow answers your business calls 24/7 using AI. It:
• Filters emergencies (only rings you when urgent)
• Books solid leads while you sleep
• Handles FAQs, quotes, and scheduling
• Saves 2+ hours daily on phone tag
You start Monday with 3+ pre-qualified jobs ready to go.`,
    benefits: [
        '40% more booked jobs',
        'No more missed calls',
        'Focus on work, not phone',
        'Works for electricians, plumbers, HVAC, landscapers'
    ],
    pricing: {
        free: 'Free Trial: Basic call answering + lead capture',
        pro: '$29/month: Full AI workflows, emergency filtering, calendar sync',
        enterprise: '$99/month: Custom voice, CRM integration, team routing'
    },
    cta: 'Start Free Trial → https://bankflow.net/signup',
    demo: 'Book a 5-Min Demo → https://bankflow.net/demo'
};

// Smart Responses – Trained on your site
const responses = {
    greeting: `Hey! I'm the **Bankflow AI Assistant**.  
I help tradespeople like you **automate phone calls** and **book more jobs without lifting a finger**.  

Ask me anything:  
• "How it works"  
• "Pricing"  
• "Demo"  
• "Who uses it?"  
• "Save my number"  

What’s on your mind?`,

    "how it works": `${clientConfig.howItWorks}  
Ready to see it live? <a href='${clientConfig.demo}' target='_blank'>👉 Book a 5-min demo</a>`,

    "pricing": `**Bankflow Pricing:**  
• **Free Trial**: ${clientConfig.pricing.free}  
• **Pro Plan**: ${clientConfig.pricing.pro}  
• **Enterprise**: ${clientConfig.pricing.enterprise}  

<a href='${clientConfig.cta}' target='_blank'>Start Free Trial (No CC needed)</a>`,

    "demo": `Perfect! See how Bankflow books jobs while you sleep.  
<a href='${clientConfig.demo}' target='_blank'>Click to Book Demo</a>  
Or reply with your email — I’ll send you a calendar link.`,

    "who uses": `Trades love Bankflow:  
• Electricians (emergency filtering)  
• Plumbers (after-hours booking)  
• HVAC techs (quote automation)  
• Landscapers (seasonal lead surge)  

Result: **40% more jobs**, zero phone stress.  
<a href='${clientConfig.website}' target='_blank'>See case studies</a>`,

    "emergency": `Yes! Bankflow **only rings you for real emergencies**.  
Non-urgent calls → AI handles, books, or texts you a summary.  
You stay in the field. No distractions.`,

    "missed calls": `Never again.  
Bankflow answers **every call**, even at 2 AM.  
Missed call = missed money. We turn it into a booked job.`,

    "save": `Got it! I’ll remember you.  
Reply with:  
• Your name  
• Best email  
• Trade (e.g., electrician)  

I’ll send you a **free lead automation checklist** + trial access.`,

    "default": `Cool question! Here’s what most trades want to know:  
• <a href='#' onclick='triggerResponse(\"how it works\")'>How it works</a>  
• <a href='#' onclick='triggerResponse(\"pricing\")'>Pricing</a>  
• <a href='${clientConfig.demo}' target='_blank'>Book Demo</a>  
• <a href='${clientConfig.website}' target='_blank'>Visit bankflow.net</a>`
};

// === CHAT LOGIC ===
const chatContainer = document.getElementById('chat-container');
const chatTrigger = document.getElementById('chat-trigger');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Open chat
chatTrigger.addEventListener('click', () => {
    chatContainer.style.display = 'flex';
    if (chatMessages.children.length === 0) {
        addMessage('bot', responses.greeting);
    }
});

closeChat.addEventListener('click', () => {
    chatContainer.style.display = 'none';
});

// Send message
function sendMessage() {
    const userText = chatInput.value.trim();
    if (!userText) return;

    addMessage('user', userText);
    chatInput.value = '';

    const userLower = userText.toLowerCase();
    let botResponse = responses.default;

    // Keyword matching
    for (let key in responses) {
        if (key !== 'greeting' && key !== 'default' && 
            (userLower.includes(key) || responses[key].toLowerCase().includes(userLower))) {
            botResponse = responses[key];
            break;
        }
    }

    // Special triggers
    if (userLower.includes('price') || userLower.includes('cost') || userLower.includes('$')) botResponse = responses.pricing;
    if (userLower.includes('demo') || userLower.includes('see') || userLower.includes('try')) botResponse = responses.demo;
    if (userLower.includes('work') || userLower.includes('how')) botResponse = responses["how it works"];
    if (userLower.includes('emergency') || userLower.includes('urgent')) botResponse = responses.emergency;
    if (userLower.includes('miss') botResponse = responses["missed calls"];
    if (userLower.includes('save') || userLower.includes('remember') || userLower.includes('email')) botResponse = responses.save;

    setTimeout(() => addMessage('bot', botResponse), 600);
}

// Allow clickable links in default
window.triggerResponse = function(key) {
    addMessage('bot', responses[key]);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});

function addMessage(sender, text) {
    const div = document.createElement('div');
    div.className = `message ${sender}-message`;
    div.innerHTML = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
