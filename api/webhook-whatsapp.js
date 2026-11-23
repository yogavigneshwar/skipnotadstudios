/**
 * Skip Not Ad Studios - Vercel Serverless Function: /api/webhook-whatsapp
 * Meta WhatsApp Cloud API Webhook Handler
 */

module.exports = async (req, res) => {
  // Verification (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'skipnot_ai_sales_2026';

    if (mode === 'subscribe' && token === verifyToken) {
      console.log('✓ WhatsApp Webhook verified on Vercel');
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Verification token mismatch');
  }

  // Inbound Messages (POST)
  if (req.method === 'POST') {
    const payload = req.body || {};
    const message = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (message && message.type === 'text') {
      const from = message.from;
      const text = message.text.body;
      console.log(`[WhatsApp Inbound from ${from}]: ${text}`);
      // In production, process with Sales Brain and post back to Meta Graph API
    }

    return res.status(200).json({ status: 'EVENT_RECEIVED' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
