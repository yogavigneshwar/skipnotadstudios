/**
 * Skip Not Ad Studios - Vercel Serverless Function: /api/outbound
 * Specialized, niche-specific English cold pitches for Chennai local B2C brands.
 */

const LEADS = [
  // 1. AUTOMOTIVE CARE & DETAILING
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
    gapDetected: "Relies primarily on franchise branding. Lacks high-converting 4K cinematic video reels running on Meta CBO. Prime candidate for viral Instagram ad films.",
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
    gapDetected: "No standalone website or online appointment scheduling. Exceptional customer satisfaction with zero automated lead retargeting.",
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
    gapDetected: "High luxury clientele in central Chennai facing intense ad pressure from OMR studios. Needs 4K hyper-retention transformation reels.",
    opportunityScore: 88
  },

  // 2. LUXURY SALONS & AESTHETICS
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
    gapDetected: "Substantial footfall with wealthy patrons, but currently running static single-image ads with severe ad fatigue. Requires 4K transformation reels.",
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
    gapDetected: "Peak bridal season demand. Bookings handled manually over chaotic phone calls. Needs automated WhatsApp booking workflow & reminder bots.",
    opportunityScore: 98
  },

  // 3. FOOD, GOURMET & BAKERIES
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
    gapDetected: "Paying 25% to 30% gross margins in Swiggy/Zomato commissions. Needs Direct WhatsApp Ordering Bot & culinary cinematography.",
    opportunityScore: 97
  },

  // 4. FITNESS, CROSSFIT & SPORTS
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
    gapDetected: "Massive facility with manual paper register check-ins. Needs Member Check-in Portal & targeted local trial pass lead generation.",
    opportunityScore: 93
  }
];

// Niche-specific, customized English pitches
function generateNicheSpecificPitch(lead) {
  const isAuto = lead.niche.includes('Automotive');
  const isSalon = lead.niche.includes('Salon');
  const isFood = lead.niche.includes('Food');
  const isFit = lead.niche.includes('Fitness') || lead.niche.includes('Sports');

  if (isAuto) {
    return `Hello from Skip Not Ad Studios, Chennai.

We noticed your studio in ${lead.area} maintains an impressive ${lead.rating}★ rating (${lead.reviews}+ reviews) on Google! 🚗✨

While auditing automotive detailing studios in Chennai, we observed that discerning vehicle owners are won through 4K cinematic transformation reels and algorithmic Meta CBO ad funnels, rather than static posts. Our recent automotive campaign generated 30+ ceramic coating bookings within 3 weeks.

We do not sell generic packages. We have prepared a 2-minute Custom Strategic Growth Proposal specifically for ${lead.name}.

Would you be open to a brief 10-minute discovery call this week to review the concept?

Official Website: https://skipnotadstudios.com/
Direct Corporate Line: +91 6380404840`;
  }

  if (isSalon) {
    return `Hello from Skip Not Ad Studios, Chennai.

Congratulations on building an exceptional ${lead.rating}★ reputation across ${lead.reviews}+ customer reviews at ${lead.name} in ${lead.area}! 💇‍♀️✨

With bridal and luxury grooming demand at peak velocity, salons relying on static single-image ads face severe audience ad fatigue. By deploying cinema-grade 4K transformation reels and automated WhatsApp booking workflows, client footfall and high-ticket service bookings can be scaled significantly. We recently scaled weekend appointment volume by 40% for a premier regional salon.

We have mapped out a bespoke Creative Storyboard & Lead Funnel specifically for ${lead.name}.

Could we connect for a brief 10-minute discovery call this Thursday or Friday to review the pitch deck?

Official Website: https://skipnotadstudios.com/
Direct Corporate Line: +91 6380404840`;
  }

  if (isFood) {
    return `Hello from Skip Not Ad Studios, Chennai.

We came across ${lead.name} in ${lead.area} with an extraordinary ${lead.reviews}+ customer reviews on Google! 🥐🍕

Rather than relinquishing 25% to 30% gross margins in third-party aggregator commissions (Swiggy/Zomato), deploying high-aesthetic culinary reels paired with an Automated Direct WhatsApp Ordering Bot allows gourmet food brands to own their customer data and maximize repeat order profitability.

We have outlined a tailored direct-to-consumer growth strategy for ${lead.name}.

Would you be open to a quick 10-minute conversation this week to review the framework?

Official Website: https://skipnotadstudios.com/
Direct Corporate Line: +91 6380404840`;
  }

  if (isFit) {
    return `Hello from Skip Not Ad Studios, Chennai.

Kudos on maintaining an outstanding ${lead.rating}★ track record with ${lead.reviews}+ reviews at ${lead.name} in ${lead.area}! 🏋️‍♂️🏸

To eliminate peak-hour slot booking disputes and manual register check-ins, combining an Automated Online Slot Booking & Geofenced Member Attendance Portal with localized Meta Lead Generation ads delivers a seamless member acquisition and retention engine.

We have engineered a bespoke growth and operational blueprint for ${lead.name}.

Could we connect for a brief 10-minute discovery call to share our findings?

Official Website: https://skipnotadstudios.com/
Direct Corporate Line: +91 6380404840`;
  }

  // Fallback
  return `Hello from Skip Not Ad Studios, Chennai.

We noticed ${lead.name} in ${lead.area} maintains an impressive track record (${lead.rating}★ across ${lead.reviews}+ reviews)!

Our strategy team audited your digital presence and identified significant revenue opportunities through cinematic video retention campaigns paired with automated booking workflows.

We have prepared a 2-minute bespoke growth proposal outline for ${lead.name}.

Would you be open to a quick 10-minute discovery call to explore the concepts?

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

  const result = filtered.map(l => {
    const pitch = generateNicheSpecificPitch(l);
    const cleanPhone = (l.phone || '').replace(/[^0-9]/g, '');
    const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(pitch)}` : null;
    return { ...l, pitch, whatsappUrl: waUrl };
  });

  return res.status(200).json({ leads: result });
};
