/**
 * Skip Not Ad Studios - Vercel Serverless Function: /api/chat
 * Executive Dual-Engine Sales Brain (100% Professional Consultative English)
 */

const BRAND_CONFIG = {
  name: "Skip Not Ad Studios",
  location: "Chennai, Tamil Nadu",
  phone: "+91 6380404840",
  whatsapp: "https://wa.me/916380404840",
  calendly: "https://calendly.com",
  website: "https://skipnotadstudios.com/"
};

// In-memory sessions store (persists across warm serverless container executions)
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

function generateExecutiveResponse(rawText, session) {
  const text = rawText.toLowerCase().trim();
  const { lead, turns } = session;

  // Direct Discovery Call / Calendar Request
  if (text.includes('call') || text.includes('meet') || text.includes('schedule') || text.includes('calendly') || text.includes('appointment')) {
    session.state.stage = 'BOOKING';
    return `Certainly! Let's schedule a 15-minute Strategic Discovery Call. ☕\n\nOur senior partners will analyze your exact business model, target acquisition economics, and technical roadmap to present a bespoke proposal pitch.\n\n👉 **Direct Calendar Booking:** [Schedule a 15-Min Google Meet](${BRAND_CONFIG.calendly})\n📲 **Or Reach Us on WhatsApp:** [WhatsApp +91 6380404840](${BRAND_CONFIG.whatsapp})\n\nOnce scheduled, calendar confirmation and meeting credentials will be sent instantly.`;
  }

  // Contact Number Acknowledgment
  if (lead.phone && session.turns === 1) {
    return `Thank you for sharing your contact number (${lead.phone}). Our senior leadership team has logged your inquiry and will reach out via WhatsApp with our initial proposal outline and discovery call slots.\n\nIn the meantime, what is your anticipated project kickoff timeline (immediate or next month)?`;
  }

  // Pricing / Why No Cookie-Cutter Packages?
  if (text.includes('price') || text.includes('pricing') || text.includes('cost') || text.includes('budget') || text.includes('rate') || text.includes('quote') || text.includes('package')) {
    return `Regarding our pricing model: Skip Not Ad Studios maintains a strict policy against cookie-cutter packages.\n\nNo two businesses have identical customer acquisition economics, gross margins, or operational bottlenecks. Rigid package pricing is built for lazy agencies; bespoke growth architecture is built for market leaders.\n\n📌 **Our 4-Step Strategic Pitch Protocol:**\n1. **Business Need Discovery:** Pinpointing your exact unit economics and conversion hurdles.\n2. **Landscape Audit:** Analyzing Chennai & national competitors, audience fatigue, and ad saturation.\n3. **Bespoke Proposal Pitch:** Presenting tailored creative storyboards, technical architecture, and revenue milestones.\n4. **Execution & Scaling:** Rapid cinema production or software deployment with milestone governance.\n\nShare your core project requirements with us, and we will deliver a transparent, same-day customized quote. What specific milestones are you targeting?`;
  }

  // Digital Marketing & Cinema Ads Inquiry
  if (text.includes('ad') || text.includes('meta') || text.includes('google') || text.includes('marketing') || text.includes('roas') || text.includes('reel') || text.includes('video') || text.includes('film')) {
    session.state.service = 'Digital Marketing & Cinema Ads';
    return `Excellent. At Skip Not Ad Studios, we do not produce generic social media templates. We combine **Cinema-Grade 4K Ad Commercials** with **Algorithmic High-ROAS Performance Marketing** (Meta CBO & Google Ads).\n\nWe partner with premier brands across automotive care, luxury aesthetics, gourmet food, and fitness to deliver high-converting creative reels and multi-stage ad funnels.\n\nWhich industry does your brand operate in, and are you currently running paid campaigns?`;
  }

  // Software & ERP Inquiry
  if (text.includes('software') || text.includes('saas') || text.includes('erp') || text.includes('app') || text.includes('billing') || text.includes('portal') || text.includes('tech')) {
    session.state.service = 'Bespoke Software & ERP';
    return `Great! Skip Not Ad Studios engineers cloud-native, modular software solutions:\n\n• **Enterprise ERP Modules:** Geofenced staff attendance, task delegation, automated payroll & billing.\n• **Custom SaaS Products:** Scalable multi-tenant cloud applications.\n• **Client Portals & Booking Engines:** High-performance, secure digital platforms.\n\nIs your objective to automate an existing operational workflow, or build a bespoke software platform from scratch?`;
  }

  // General Greetings
  if (turns <= 1 || text.includes('hi') || text.includes('hello') || text.includes('hey')) {
    return `Welcome to **Skip Not Ad Studios**. 🚀\n\nWe engineer high-ROAS **Performance Marketing** (Meta & Google Ads, Cinema Commercials) and bespoke **Software & ERP Engineering**.\n\nAre you looking to scale your business through high-impact marketing, or engineer a custom software solution?`;
  }

  return `Understood. Our strategy team is fully equipped to evaluate your requirements and engineer a targeted roadmap.\n\nWould you like to schedule a brief 15-minute discovery call, or share your contact number so a senior partner can connect with you directly?`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
    const reply = generateExecutiveResponse(message, session);
    session.history.push({ role: 'assistant', content: reply });

    return res.status(200).json({
      reply,
      engine: 'executive-nlp',
      lead: session.lead,
      service: session.state.service,
      turnCount: session.turns
    });
  } catch (err) {
    console.error('Chat API Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
