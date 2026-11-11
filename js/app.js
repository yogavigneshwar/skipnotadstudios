/**
 * Skip Not Ad Studios - Corporate Interactivity & Client Need Analysis Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initServiceTabs();
  initNeedAnalysisCalculator();
  initContactForm();
  initPortalTriggers();
});

// Navigation & Mobile Menu
function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = 'var(--nav-height)';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#090b10';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid var(--border-medium)';
      }
    });
  }

  // Active anchor link highlighting
  const links = document.querySelectorAll('.nav-link[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navLinks) {
        navLinks.style.display = 'none';
      }
    });
  });
}

// Pillar Tab Switcher (Digital Marketing vs Software Engineering)
function initServiceTabs() {
  const tabs = document.querySelectorAll('.pillar-tab-btn');
  const marketingPillar = document.getElementById('pillar-marketing');
  const softwarePillar = document.getElementById('pillar-software');

  if (!tabs.length || !marketingPillar || !softwarePillar) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-pillar');
      if (target === 'marketing') {
        marketingPillar.style.display = 'grid';
        softwarePillar.style.display = 'none';
      } else {
        marketingPillar.style.display = 'none';
        softwarePillar.style.display = 'grid';
      }
    });
  });
}

// Interactive Client Need Analysis & Custom Pitch Proposal Generator
function initNeedAnalysisCalculator() {
  const nicheSelect = document.getElementById('calc-niche');
  const goalSelect = document.getElementById('calc-goal');
  const scaleSelect = document.getElementById('calc-scale');
  const notesInput = document.getElementById('calc-notes');

  const pitchTitle = document.getElementById('preview-pitch-title');
  const deliverablesContainer = document.getElementById('preview-deliverables');
  const executionPill = document.getElementById('preview-execution-pill');
  const whatsappPitchBtn = document.getElementById('btn-whatsapp-pitch');

  if (!nicheSelect || !goalSelect || !scaleSelect) return;

  const strategies = {
    'video-ads': {
      archetype: 'Cinema-Grade Ad Film & Hook Video Production',
      execution: '3 - 4 Weeks Production Sprint',
      deliverables: [
        'Creative scriptwriting & storyboard development',
        'In-house Sony FX cinema camera crew & lighting on-location',
        'High-retention 9:16 Instagram Reels & 16:9 Cinema Ad exports',
        'Sound design, color grading & performance hook testing'
      ]
    },
    'performance-growth': {
      archetype: 'Omnichannel Performance Marketing & Lead Escalation',
      execution: 'Continuous Sprint & ROAS Optimization',
      deliverables: [
        'Full meta pixel & Google conversion API tracking audit',
        'Custom high-converting landing page & speed optimization',
        'Audience segmentation & high-ROAS creative iteration',
        'Weekly executive performance reports & live ROAS dashboard'
      ]
    },
    'software-saas': {
      archetype: 'Enterprise SaaS & Cloud System Architecture',
      execution: '4 - 8 Weeks Agile Engineering',
      deliverables: [
        'Full-stack system architecture & interactive wireframes',
        'Custom backend API & enterprise database design',
        'Seamless payment gateway & CRM webhooks integration',
        'Cloud deployment, automated backups & 99.9% SLA maintenance'
      ]
    },
    'ai-automation': {
      archetype: 'Custom AI Chatbots & Operational Automation',
      execution: '2 - 3 Weeks Deployment',
      deliverables: [
        'Bespoke LLM knowledge-base training on company SOPs',
        'Automated 24/7 WhatsApp customer acquisition bot',
        'ERP/CRM bidirectional sync & lead qualification engine',
        'Human-in-the-loop fallback & compliance safeguards'
      ]
    },
    'local-branding': {
      archetype: 'Chennai Market Dominance & Organic Authority',
      execution: 'Multi-Quarter Strategic Retainer',
      deliverables: [
        'Aggressive Chennai Local SEO & Google Business ranking',
        'Strategic influencer collaborations & niche creator outreach',
        'Offline OOH hoarding / theater ad campaign alignment',
        'Brand identity guidelines & high-impact collateral design'
      ]
    }
  };

  function updatePitchPreview() {
    const nicheText = nicheSelect.options[nicheSelect.selectedIndex].text;
    const goalVal = goalSelect.value;
    const scaleText = scaleSelect.options[scaleSelect.selectedIndex].text;
    const notes = notesInput ? notesInput.value.trim() : '';

    const strategy = strategies[goalVal] || strategies['performance-growth'];

    if (pitchTitle) {
      pitchTitle.textContent = `${strategy.archetype} for ${nicheText}`;
    }
    if (executionPill) {
      executionPill.textContent = strategy.execution;
    }
    if (deliverablesContainer) {
      deliverablesContainer.innerHTML = strategy.deliverables
        .map(
          item => `
          <div class="spec-item">
            <span class="spec-label">✓</span>
            <span class="spec-val" style="text-align: left; margin-left: 0.5rem; flex: 1;">${item}</span>
          </div>
        `
        )
        .join('');
    }

    if (whatsappPitchBtn) {
      const message = `Hello Skip Not Ad Studios Team,\n\nI conducted a Need Analysis on your website for my business:\n- Industry/Niche: ${nicheText}\n- Primary Objective: ${strategy.archetype}\n- Current Scale: ${scaleText}\n- Specific Requirements: ${notes || 'Looking for a comprehensive strategic proposal'}\n\nPlease share a tailored pitch proposal and schedule a discovery session.`;
      whatsappPitchBtn.href = `https://wa.me/916380404840?text=${encodeURIComponent(message)}`;
    }
  }

  nicheSelect.addEventListener('change', updatePitchPreview);
  goalSelect.addEventListener('change', updatePitchPreview);
  scaleSelect.addEventListener('change', updatePitchPreview);
  if (notesInput) notesInput.addEventListener('input', updatePitchPreview);

  updatePitchPreview();
}

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('corporate-contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const service = document.getElementById('contact-service').value;
    const message = document.getElementById('contact-message').value.trim();

    const fullMessage = `Hello Skip Not Ad Studios,\n\nNew Inquiry from Website:\n- Name: ${name}\n- Phone: ${phone}\n- Interested In: ${service}\n- Project Brief: ${message}\n\nPlease get in touch with me.`;

    // Open WhatsApp directly
    window.open(`https://wa.me/916380404840?text=${encodeURIComponent(fullMessage)}`, '_blank');

    // UI Feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '✓ Inquiry Sent via WhatsApp';
    submitBtn.style.background = '#059669';

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      form.reset();
    }, 4000);
  });
}

// Portal Switcher / Modal triggers
function initPortalTriggers() {
  const openButtons = document.querySelectorAll('[data-open-portal]');
  const portalSection = document.getElementById('staff-portal-view');
  const mainSite = document.getElementById('main-site-content');

  function openPortal() {
    if (portalSection && mainSite) {
      mainSite.style.display = 'none';
      portalSection.style.display = 'block';
      window.scrollTo(0, 0);
      window.location.hash = 'staff';
      // Initialize portal logic
      if (window.SNAS_PORTAL) {
        window.SNAS_PORTAL.init();
      }
    }
  }

  function closePortal() {
    if (portalSection && mainSite) {
      portalSection.style.display = 'none';
      mainSite.style.display = 'block';
      window.location.hash = '';
      window.scrollTo(0, 0);
    }
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openPortal();
    });
  });

  const exitPortalBtn = document.getElementById('btn-exit-portal');
  if (exitPortalBtn) {
    exitPortalBtn.addEventListener('click', e => {
      e.preventDefault();
      closePortal();
    });
  }

  // Check URL hash on page load
  if (window.location.hash === '#staff' || window.location.hash === '#admin') {
    openPortal();
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#staff' || window.location.hash === '#admin') {
      openPortal();
    } else if (window.location.hash === '' || window.location.hash === '#home') {
      closePortal();
    }
  });
}
