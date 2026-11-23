/**
 * Skip Not Ad Studios - Vercel Serverless Function: /api/outbound
 * Serves Chennai B2C lead mining & personalized WhatsApp/Call pitches.
 */

const LEADS = [
  {
    id: "auto-chn-01",
    name: "The Detailing Mafia - Anna Nagar",
    phone: "+918939289723",
    niche: "Automotive Care & Ceramic Coating",
    area: "Anna Nagar, Chennai",
    rating: 4.8,
    reviews: 240,
    website: "https://thedetailingmafia.com",
    hasWebsite: true,
    gapDetected: "No local Chennai cinematic video reels running on Meta CBO. Prime candidate for viral Instagram ad films.",
    opportunityScore: 92
  },
  {
    id: "auto-chn-02",
    name: "V Details Car Spa & Protection",
    phone: "+919840123890",
    niche: "Automotive Care & Ceramic Coating",
    area: "Anna Nagar West, Chennai",
    rating: 4.6,
    reviews: 135,
    website: "",
    hasWebsite: false,
    gapDetected: "No official standalone website or online booking calendar. High customer satisfaction but zero automated lead retargeting.",
    opportunityScore: 96
  },
  {
    id: "auto-chn-03",
    name: "Ceramic Pro Chennai - Alwarpet",
    phone: "+919940088221",
    niche: "Automotive Care & Ceramic Coating",
    area: "Alwarpet, Chennai",
    rating: 4.9,
    reviews: 310,
    website: "https://ceramicprochennai.in",
    hasWebsite: true,
    gapDetected: "High luxury clientele in central Chennai. Competitor ad pressure is rising. Needs 4K hyper-retention reels.",
    opportunityScore: 88
  },
  {
    id: "salon-chn-01",
    name: "Glam Aesthetics & Luxury Hair Studio",
    phone: "+919841056782",
    niche: "Luxury Salons & Aesthetics",
    area: "Alwarpet, Chennai",
    rating: 4.8,
    reviews: 420,
    website: "https://glamaesthetics.in",
    hasWebsite: true,
    gapDetected: "Running static single-image ads with poor ROAS. Desperately needs 4K transformation reels to stop ad fatigue.",
    opportunityScore: 94
  },
  {
    id: "salon-chn-02",
    name: "Bliss Bridal Spa & Makeover Lounge",
    phone: "+919789012355",
    niche: "Luxury Salons & Aesthetics",
    area: "Anna Nagar East, Chennai",
    rating: 4.7,
    reviews: 215,
    website: "",
    hasWebsite: false,
    gapDetected: "Wedding peak demand. Bookings handled manually over phone. Needs automated WhatsApp booking workflow.",
    opportunityScore: 98
  },
  {
    id: "food-chn-01",
    name: "Crust & Crumb Artisanal Bakery",
    phone: "+919840287114",
    niche: "Food, Gourmet & Bakery",
    area: "Anna Nagar, Chennai",
    rating: 4.7,
    reviews: 580,
    website: "",
    hasWebsite: false,
    gapDetected: "Paying 25-30% commissions to Swiggy/Zomato on direct cake orders. Needs direct WhatsApp Ordering Bot.",
    opportunityScore: 97
  },
  {
    id: "fit-chn-01",
    name: "Titan Strength & Conditioning Arena",
    phone: "+919840019283",
    niche: "Sports, Fitness & Academies",
    area: "Velachery, Chennai",
    rating: 4.9,
    reviews: 340,
    website: "https://titanstrength.in",
    hasWebsite: true,
    gapDetected: "Attendance tracked manually on paper register. Needs Staff Geofenced Attendance & Member Check-in Portal.",
    opportunityScore: 93
  }
];

function generateWhatsAppPitch(lead) {
  return `Vanakkam from Skip Not Ad Studios! 👋

Noticed ${lead.name} in ${lead.area} has a stellar ${lead.rating}★ rating (${lead.reviews}+ reviews) on Google! ✨

Unga digital presence audit pannom — there is massive untapped revenue in combining 4K Cinematic Hook Reels with automated direct WhatsApp booking funnels.

We do not sell cookie-cutter packages. Naanga unga business-kaga oru 2-minute **Custom Strategic Growth Pitch Deck** prepare pannirukom.

Free-ah irundha 10-minute quick discovery call-la share pannava bro?

Official Website: https://skipnotadstudios.com/
Direct Corporate Line: +91 6380404840`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const body = req.body || {};
  const niche = (body.niche || 'ALL').toLowerCase();
  const area = (body.area || 'ALL').toLowerCase();

  let filtered = [...LEADS];
  if (niche !== 'all') {
    filtered = filtered.filter(l => l.niche.toLowerCase().includes(niche));
  }
  if (area !== 'all') {
    filtered = filtered.filter(l => l.area.toLowerCase().includes(area));
  }

  // Attach pitch & 1-click whatsapp URL to each lead
  const result = filtered.map(l => {
    const pitch = generateWhatsAppPitch(l);
    const cleanPhone = (l.phone || '').replace(/[^0-9]/g, '');
    const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(pitch)}` : null;
    return { ...l, pitch, whatsappUrl: waUrl };
  });

  return res.status(200).json({ leads: result });
};
