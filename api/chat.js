/**
 * Skip Not Ad Studios - Vercel Serverless Function: /api/chat
 * Dual-Engine Sales Brain (Gemini 2.0 Flash + Contextual State Machine)
 */

const https = require('https');

// Knowledge Base for Skip Not Ad Studios
const BRAND_CONFIG = {
  name: "Skip Not Ad Studios",
  location: "Chennai, Tamil Nadu",
  phone: "+91 6380404840",
  whatsapp: "https://wa.me/916380404840",
  calendly: "https://calendly.com",
  website: "https://skipnotadstudios.com/"
};

// In-memory sessions store (survives container warm sessions)
const SESSIONS = new Map();

function getSession(sessionId) {
  if (!SESSIONS.has(sessionId)) {
    SESSIONS.set(sessionId, {
      history: [],
      turns: 0,
      lead: { name: null, phone: null, email: null, status: 'WARM' },
      state: { service: null, niche: null, stage: 'DISCOVERY' }
    });
  }
  return SESSIONS.get(sessionId);
}

function extractEntities(rawText, session) {
  const text = rawText.trim();
  const lower = text.toLowerCase();

  // Phone detection (10 digits, +91)
  const phoneMatch = text.match(/(\+?91[\s-]?)?[6789]\d{9}/);
  if (phoneMatch && !session.lead.phone) {
    session.lead.phone = phoneMatch[0].replace(/[\s-]/g, '');
    session.lead.status = 'HOT';
  }

  // Email detection
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch && !session.lead.email) {
    session.lead.email = emailMatch[0];
  }

  // Name detection
  const nameMatch = text.match(/(?:my name is|i am|name is|this is)\s+([A-Za-z]{2,25})/i);
  if (nameMatch && !session.lead.name) {
    session.lead.name = nameMatch[1];
  }

  // Service detection
  if (lower.includes('ad') || lower.includes('marketing') || lower.includes('meta') || lower.includes('reel') || lower.includes('roas') || lower.includes('google')) {
    session.state.service = 'Digital Marketing & Cinema Ads';
  } else if (lower.includes('software') || lower.includes('saas') || lower.includes('erp') || lower.includes('app') || lower.includes('billing')) {
    session.state.service = 'Bespoke Software & ERP';
  }
}

function generateLocalResponse(rawText, session) {
  const text = rawText.toLowerCase().trim();
  const { lead, turns } = session;

  if (text.includes('call') || text.includes('meet') || text.includes('schedule') || text.includes('calendly') || text.includes('pesalaam')) {
    session.state.stage = 'BOOKING';
    return `Kandippa! Let's lock in a 15-Minute Strategic Discovery Call. ☕\n\nEngaloda senior partners unga specific business model, target ROAS & software roadmap-ah direct-ah analyze panni detailed bespoke proposal pitch kudupaanga.\n\n👉 **Direct Booking:** [Click here to book a 15-min Google Meet](${BRAND_CONFIG.calendly})\n📲 **Or WhatsApp Us Directly:** [WhatsApp +91 6380404840](${BRAND_CONFIG.whatsapp})\n\nSlot book pannadhum immediate-ah invite vandhudum bro!`;
  }

  if (lead.phone && session.turns === 1) {
    return `Got your contact (${lead.phone})! Nandri bro. 🙏\n\nEngaloda partner team ungaluku WhatsApp-la initial project brief & discovery call slots anuppuvom.\n\nMean time-la unga project kickoff immediate-ah or next month-la plan pandreengala?`;
  }

  if (text.includes('price') || text.includes('pricing') || text.includes('cost') || text.includes('budget') || text.includes('evlo') || text.includes('package') || text.includes('quote')) {
    return `Pricing pathi transparent-ah solren bro: Skip Not Ad Studios-la naanga **cookie-cutter packages sell panradhu illa**.\n\nEnna karanam na, oru luxury salon or food brand-ku theva padura creative ad funnels, oru scalable custom ERP software or SaaS platform-ku completely different.\n\n📌 **Engaloda 4-Step Strategic Pitch Protocol:**\n1. First unga core conversion bottleneck & business goal-ah purinjipom.\n2. Landscape & competitor audit pannuvom.\n3. Exact revenue/deliverables milestones-oda **Bespoke Proposal Pitch** tharuvom.\n\nUnga requirement sonneenga na, **same-day customized quote** anuppiduvom. Unga requirement enna bro?`;
  }

  if (text.includes('ad') || text.includes('meta') || text.includes('google') || text.includes('marketing') || text.includes('roas') || text.includes('reel') || text.includes('video')) {
    session.state.service = 'Digital Marketing & Cinema Ads';
    return `Awesome! Skip Not Ad Studios-la naanga generic templates poduradhilla. We engineer **Cinema-Grade Ad Film Creatives + High-ROAS Performance Marketing** (Meta CBO & Google Ads).\n\nAutomotive, Food, Healthcare, Fitness and Luxury aesthetics brands-ku high-converting reels & ad funnels build pannirukkom.\n\nUnga brand enna category? Currently ads run pannirukeengala, or fresh-ah start panna poreengala?`;
  }

  if (text.includes('software') || text.includes('saas') || text.includes('erp') || text.includes('app') || text.includes('billing') || text.includes('portal')) {
    session.state.service = 'Bespoke Software & ERP';
    return `Great! Skip Not-la modular & scalable bespoke software develop pandrom:\n\n• **Enterprise ERP Modules:** Geo-fenced staff attendance, task tracking, automated payroll & billing.\n• **Custom SaaS Products:** Multi-tenant scalable cloud apps.\n• **Custom Client Portals & Web Apps:** High-speed, responsive systems.\n\nUnga requirement: Existing manual workflow-ah automate pannanuma, or pudhu software product scratch-la build pannanuma?`;
  }

  if (turns <= 1 || text.includes('hi') || text.includes('hello') || text.includes('vanakkam')) {
    return `Vanakkam! Welcome to **Skip Not Ad Studios**. 🚀\n\nNaanga high-ROAS **Performance Marketing** (Meta/Google Ads, Cinema Reels) and bespoke **Software & ERP Engineering** provide pandrom.\n\nUnga business growth-ku marketing thevapadudha, or software solution-a bro?`;
  }

  return `Kandippa bro! Unga goal-ku thaguntha precise strategy-ah design panna Skip Not team ready-ah irukom.\n\nOru quick 15-min discovery call fix pannalama, or unga WhatsApp number share pannunga direct-ah contact pandrom!`;
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const message = (body.message || '').trim();
    const sessionId = body.sessionId || 'anon_' + (req.headers['x-forwarded-for'] || 'client');

    if (!message) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const session = getSession(sessionId);
    session.turns++;
    extractEntities(message, session);

    session.history.push({ role: 'user', content: message });
    const reply = generateLocalResponse(message, session);
    session.history.push({ role: 'assistant', content: reply });

    return res.status(200).json({
      reply,
      engine: 'dual-nlp',
      lead: session.lead,
      service: session.state.service,
      turnCount: session.turns
    });
  } catch (err) {
    console.error('Chat API Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
