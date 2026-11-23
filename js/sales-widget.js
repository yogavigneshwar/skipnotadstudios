/**
 * Skip Not Ad Studios - Official Live Sales Widget
 * Built for Vercel deployment on skipnotadstudios.com
 */

(function () {
  if (document.getElementById('snas-sales-widget')) return;

  const API_ENDPOINT = '/api/chat';
  const SESSION_KEY = 'snas_sales_session_id';

  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = 'web_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  // Inject CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/css/sales-widget.css';
  document.head.appendChild(link);

  // Inject HTML Structure
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'snas-sales-widget';
  widgetContainer.innerHTML = `
    <!-- Floating Launcher -->
    <div id="snas-launcher" class="snas-launcher" title="Chat with Skip Not Ad Studios AI">
      <span class="snas-badge"></span>
      <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    </div>

    <!-- Chat Box Window -->
    <div id="snas-chat-box" class="snas-chat-box snas-hidden">
      <div class="snas-header">
        <div class="snas-header-title">
          <div class="snas-avatar">SN</div>
          <div class="snas-header-text">
            <h4>Skip Not Ad Studios</h4>
            <p><span class="snas-status-dot"></span> Senior AI Growth Partner</p>
          </div>
        </div>
        <button id="snas-close-btn" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:16px;">✕</button>
      </div>

      <div id="snas-messages" class="snas-messages">
        <div class="snas-msg snas-msg-agent">
          Vanakkam! Welcome to <strong>Skip Not Ad Studios</strong>. 🚀<br><br>
          We engineer high-ROAS <strong>Performance Marketing</strong> (Meta/Google Ads, Cinema Reels) and bespoke <strong>Software &amp; ERP Solutions</strong>.<br><br>
          Unga business-ku marketing growth thevapadudha, or software solution-a?
        </div>
      </div>

      <div class="snas-quick-chips">
        <button class="snas-chip" data-prompt="I need Meta & Google Ads for my brand">📢 Meta Ads</button>
        <button class="snas-chip" data-prompt="How much for custom software / ERP?">💻 Custom Software</button>
        <button class="snas-chip" data-prompt="Why custom quote? Can you explain?">💰 Pricing Info</button>
        <button class="snas-chip" data-prompt="Let's book a 15-min discovery call">📅 Book Call</button>
      </div>

      <form id="snas-form" class="snas-input-bar">
        <input id="snas-input" type="text" placeholder="Type here in English or Tanglish..." autocomplete="off" />
        <button type="submit" class="snas-send-btn">
          <svg style="width:15px; height:15px; fill:none; stroke:currentColor; stroke-width:2;" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(widgetContainer);

  const launcher = document.getElementById('snas-launcher');
  const chatBox = document.getElementById('snas-chat-box');
  const closeBtn = document.getElementById('snas-close-btn');
  const form = document.getElementById('snas-form');
  const input = document.getElementById('snas-input');
  const messagesBox = document.getElementById('snas-messages');

  function toggleChat() {
    chatBox.classList.toggle('snas-hidden');
    if (!chatBox.classList.contains('snas-hidden')) {
      input.focus();
    }
  }

  launcher.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  function scrollToBottom() {
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function formatAgentReply(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  function appendMessage(role, text) {
    const msg = document.createElement('div');
    msg.className = `snas-msg snas-msg-${role}`;
    if (role === 'user') {
      msg.textContent = text;
    } else {
      msg.innerHTML = formatAgentReply(text);
    }
    messagesBox.appendChild(msg);
    scrollToBottom();
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.id = 'snas-typing';
    typing.className = 'snas-msg snas-msg-agent';
    typing.style.color = '#94a3b8';
    typing.innerHTML = 'Skip Not AI is thinking...';
    messagesBox.appendChild(typing);
    scrollToBottom();
  }

  function hideTyping() {
    const el = document.getElementById('snas-typing');
    if (el) el.remove();
  }

  async function sendMessage(text) {
    if (!text.trim()) return;
    appendMessage('user', text);
    showTyping();

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text })
      });
      const data = await res.json();
      hideTyping();
      if (data.reply) {
        appendMessage('agent', data.reply);
      } else {
        appendMessage('agent', 'Connecting directly with our partners... You can also WhatsApp us at +91 6380404840');
      }
    } catch (err) {
      hideTyping();
      appendMessage('agent', 'You can connect directly with our founders on WhatsApp: <a href="https://wa.me/916380404840" target="_blank">+91 6380404840</a>');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    input.value = '';
    sendMessage(val);
  });

  document.querySelectorAll('.snas-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      sendMessage(prompt);
    });
  });

  console.log('✓ Skip Not Ad Studios Live Sales AI Widget ready.');
})();
