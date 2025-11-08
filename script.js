// === BANKFLOW CHATBOT - FULLY WORKING (Tested Nov 2025) ===

const clientConfig = {
    website: 'https://bankflow.net',
    company: 'Bankflow',
    demo: 'https://bankflow.net/demo',
    cta: 'https://bankflow.net/signup'
};

const responses = {
    greeting: `Hey! I'm the **Bankflow AI Assistant**.  
I help tradespeople **book more jobs** by automating calls 24/7.  

Try asking:  
• "How it works"  
• "Pricing"  
• "Demo"  
• "Emergency calls"  

What do you want to know?`,

    "how it works": `Bankflow answers your phone with AI:  
• Filters emergencies (only rings you if urgent)  
• Books leads while you sleep  
• Saves 2+ hours/day on callbacks  

<a href='${clientConfig.demo}' target='_blank'>See it in action (5-min demo)</a>`,

    "pricing": `**Plans:**  
• Free Trial: Basic answering  
• Pro: $29/mo — Full AI + calendar sync  
• Enterprise: $99/mo — Custom voice & CRM  

<a href='${clientConfig.cta}' target='_blank'>Start Free Trial</a>`,

    "demo": `Great!  
<a href='${clientConfig.demo}' target='_blank'>Book a 5-Min Demo Now</a>  
Or reply with your email — I’ll send a link.`,

    "emergency": `Yes — **only real emergencies ring you**.  
Non-urgent calls → AI handles and texts you a summary.`,

    default: `Not sure? Try:  
• <a href='#' onclick='triggerResponse(\"how it works\")'>How it works</a>  
• <a href='#' onclick='triggerResponse(\"pricing\")'>Pricing</a>  
• <a href='${clientConfig.demo}' target='_blank'>Demo</a>`
};

// === DOM ELEMENTS ===
let chatContainer, chatTrigger, closeChat, chatMessages, chatInput, sendBtn;

function init() {
    chatContainer = document.getElementById('chat-container');
    chatTrigger = document.getElementById('chat-trigger');
    closeChat = document.getElementById('close-chat');
    chatMessages = document.getElementById('chat-messages');
    chatInput = document.getElementById('chat-input');
    sendBtn = document.getElementById('send-btn');

    if (!chatContainer || !chatTrigger) {
        console.error("Chatbot HTML elements missing!");
        return;
    }

    // Open chat
    chatTrigger.addEventListener('click', () => {
        chatContainer.style.display = 'flex';
        if (chatMessages.children.length === 0) {
            addMessage('bot', responses.greeting);
        }
    });

    // Close chat
    closeChat.addEventListener('click', () => {
        chatContainer.style.display = 'none';
    });

    // Send message
    function send() {
        const text = chatInput.value.trim();
        if (!text) return;
        addMessage('user', text);
        chatInput.value = '';

        const lower = text.toLowerCase();
        let reply = responses.default;

        if (lower.includes('price') || lower.includes('cost') || lower.includes('$')) reply = responses.pricing;
        else if (lower.includes('demo') || lower.includes('see') || lower.includes('try')) reply = responses.demo;
        else if (lower.includes('work') || lower.includes('how')) reply = responses["how it works"];
        else if (lower.includes('emergency') || lower.includes('urgent')) reply = responses.emergency;

        setTimeout(() => addMessage('bot', reply), 500);
    }

    sendBtn.addEventListener('click', send);
    chatInput.addEventListener('keypress', e => e.key === 'Enter' && send());

    // Clickable links in default
    window.triggerResponse = function(key) {
        addMessage('bot', responses[key]);
    };
}

function addMessage(sender, text) {
    const div = document.createElement('div');
    div.className = `message ${sender}-message`;
    div.innerHTML = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// === START WHEN PAGE LOADS ===
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
