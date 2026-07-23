/**
 * Jammu & Kashmir Interactive Corridor, Heritage, Flashcards & Comparison Engine
 *  1. Real-Time NH-44 Highway Traffic & Corridor Monitor
 *  2. GI Saffron & Pashmina Authenticator Tool
 *  3. Civil Services Quick Practice Quiz Engine
 *  4. Interactive Heritage & Pilgrimage Circuit Planner
 *  5. Kashmiri & Dogri Cultural & Culinary Audio Glossary
 *  6. Civil Services High-Yield Flashcard Vault
 *  7. 20-District Side-by-Side Comparison Matrix
 *  8. Copper Samovar Kahwa Brewing Masterclass
 */
(function() {
  
  // 1. NH-44 Highway Corridor Real-Time Status Data
  const NH44_SECTORS = [
    { name: "Jammu to Udhampur", distance: "65 km", status: "clear", note: "Smooth 4-lane expressway; normal traffic flow.", icon: "🟢" },
    { name: "Udhampur to Chenani-Nashri Tunnel", distance: "30 km", status: "clear", note: "9.2 km Shyama Prasad Mukherjee Tunnel open; 24x7 ventilation.", icon: "🟢" },
    { name: "Nashri to Ramban (Samroli - Peera)", distance: "28 km", status: "advisory", note: "Single-lane bottleneck near Samroli; drive with caution.", icon: "🟡" },
    { name: "Ramban to Banihal (Panthyal & Mehar)", distance: "36 km", status: "alert", note: "CRITICAL: Intermittent shooting stones at Mehar/Panthyal; NHAI clearance teams stationed.", icon: "🚨" },
    { name: "Navyug Tunnel (Banihal to Qazigund)", distance: "16 km", status: "clear", note: "8.5 km twin-tube Navyug tunnel operational; bypasses steep snow pass.", icon: "🟢" },
    { name: "Qazigund to Srinagar", distance: "68 km", status: "clear", note: "4-lane plain valley corridor; smooth traffic through Anantnag and Pulwama.", icon: "🟢" }
  ];

  // 2. GI Certification Database
  const GI_DATABASE = {
    "SAF-PMP-8841": { item: "Pampore Saffron (Lacha Grade-1)", producer: "Pampore Saffron Growers Cooperative", origin: "Lethpora, Pulwama", crocin_potency: "242 (Grade A+ Premium)", harvest_date: "Autumn 2025/2026", verified: true },
    "SAF-PMP-8842": { item: "Kashmir Mongra Saffron", producer: "Dustiyari Saffron Organic Collective", origin: "Pampore Town", crocin_potency: "255 (Highest Export Grade)", harvest_date: "Autumn 2025", verified: true },
    "PAS-KNI-1092": { item: "Kani Pashmina Shawl", producer: "Kanihama Artisan Guild", origin: "Kanihama, Budgam", micron: "13.2 µm (100% Pure Capra Hircus Cashmere)", weaver: "Master Craftsman Ghulam Hassan", verified: true },
    "PAS-SZN-2041": { item: "Sozni Hand-Embroidered Pashmina", producer: "Old Srinagar Craft Society", origin: "Zadibal, Srinagar", micron: "14.0 µm", embroidery_hours: "480 Hours Hand Needlework", verified: true }
  };

  // 3. Quiz Questions Database
  const QUIZ_QUESTIONS = [
    {
      q: "Which ancient chronicle written by Kalhana in the 12th century provides the primary historical source for the early kings of Kashmir?",
      options: ["Nilamata Purana", "Rajatarangini", "Tarikh-i-Hassan", "Ain-i-Akbari"],
      answer: 1,
      explanation: "Kalhana's 'Rajatarangini' (River of Kings), composed in Sanskrit between 1148 and 1149 CE, is regarded as India's earliest formal historical chronicle."
    },
    {
      q: "The iconic Chenab Rail Bridge—the world's highest arch railway bridge—is constructed under which major infrastructure project?",
      options: ["Zojila Corridor Project", "Udhampur-Srinagar-Baramulla Rail Link (USBRL)", "Akhnoor-Poonch Highway", "Karakoram Expressway"],
      answer: 1,
      explanation: "The 359-meter high Chenab Arch Bridge is a key engineering feat under the 272-km USBRL national rail project connecting the Kashmir valley with the rest of India."
    },
    {
      q: "What is the ancient Sanskrit Rigvedic name for the Jhelum River?",
      options: ["Asikni", "Vitasta", "Parushni", "Shatadru"],
      answer: 1,
      explanation: "The Jhelum River is called 'Vitasta' in the Rigveda and Kashmiri 'Vyeth', signifying wide-spread waters originating from Verinag spring."
    },
    {
      q: "Under the J&K Reorganisation Act 2019, the Union Territory of Jammu & Kashmir was established under which constitutional framework model?",
      options: ["UT without Legislature (Article 239)", "UT with Legislative Assembly (Article 239A model)", "Special Autonomous Zone", "Federal Territory"],
      answer: 1,
      explanation: "J&K UT was created with a Legislative Assembly under Article 239A (similar to Puducherry), while Ladakh was formed as a UT without a legislature."
    }
  ];

  // 4. Heritage & Travel Circuits
  const TRAVEL_CIRCUITS = {
    "alpine": {
      title: "🏔️ Alpine & Valley Basins Circuit",
      route: "Srinagar ➔ Gulmarg ➔ Sonamarg ➔ Pahalgam ➔ Gurez Valley",
      duration: "6 - 8 Days",
      best_season: "May to October (Summer/Autumn) & Dec to Feb (Skiing)",
      highlights: "Gondola cable car at Gulmarg, Thajiwas glacier Sonamarg, Betaab Valley Pahalgam, Razdan Pass Gurez.",
      craft_food: "Traditional Kashmiri Kehwa tea, Saffron Firni, Hand-carved Walnut Woodware."
    },
    "pilgrimage": {
      title: "🛕 Spiritual & Sacred Shrines Circuit",
      route: "Mata Vaishno Devi (Reasi) ➔ Amarnath Cave (Anantnag) ➔ Hazratbal (Srinagar) ➔ Shahdara Sharief (Rajouri) ➔ Bawe Wali Mata (Jammu)",
      duration: "7 - 10 Days",
      best_season: "Year-Round for Vaishno Devi & Jammu; July-August for Shri Amarnath Yatra",
      highlights: "Trikuta mountain Yatra track, Holy Cave Ice Lingam, Jhelum riverfront Sufi shrines.",
      craft_food: "Prashad, Organic Walnuts, Kishtwar Saffron, Dogri Ambal & Rajma Chawal."
    },
    "artisan": {
      title: "🧶 Artisan & Heritage Craft Guild Circuit",
      route: "Pampore Saffron Fields ➔ Kanihama Kani Loom Village ➔ Maharaj Gunj Old Srinagar ➔ Basohli Fort (Kathua) ➔ Mubarak Mandi (Jammu)",
      duration: "4 - 5 Days",
      best_season: "September to November (Saffron Flowering Season) & March to May",
      highlights: "Live Kani shawl weaving, Sozni needlework workshops, Basohli miniature painting studios.",
      craft_food: "GI Certified Pampore Saffron, Authentic Pashmina, Wazwan Feast."
    },
    "rivers": {
      title: "🌊 Great Himalayan Rivers & Lakes Circuit",
      route: "Jhelum Vitasta (Verinag to Srinagar) ➔ Chenab Arch Bridge (Reasi) ➔ Tawi Surya Putri (Jammu) ➔ Wular & Nigeen Lakes",
      duration: "5 - 6 Days",
      best_season: "April to June & September to November",
      highlights: "Shikara rides on Dal & Nigeen lakes, Chenab rail bridge viewpoint, Verinag octagonal spring pool.",
      craft_food: "Fresh Lake Lotus Stem (Nadru Yakhni), Trout Fish Fry, Kashmiri Naan (Girda)."
    }
  };

  // 5. Culinary & Cultural Glossary
  const CULINARY_GLOSSARY = [
    { term: "Rogan Josh", cat: "Wazwan Culinary", desc: "Classic Kashmiri lamb curry slow-cooked with Kashmiri red chillies (Mawal flower dye), aromatic spices, and yogurt." },
    { term: "Yakhni", cat: "Wazwan Culinary", desc: "Delicate yogurt-based mutton gravy infused with dried mint leaves, fennel seeds (Saunf), and cardamom." },
    { term: "Gushtaba", cat: "Wazwan Culinary", desc: "The final savory dish of a traditional Wazwan feast: velvety minced lamb meatballs pounded by hand and simmered in curd gravy." },
    { term: "Pampore Saffron", cat: "Agriculture GI", desc: "High-grade Saffron cultivated on the karewa soils of Pampore, Pulwama, renowned for its intense crocin aroma and rich crimson stigmas." },
    { term: "Kani Shawl", cat: "Craft Heritage", desc: "Woven in Kanihama village using small wooden spools (Tujis) guided by coded weave scripts known as Talim." },
    { term: "Khatamband", cat: "Vernacular Carpentry", desc: "Intricate ceiling woodwork constructed by interlocking small polygonal wooden pieces without using single nails." },
    { term: "Lal Vakh", cat: "Sufi Poetry", desc: "Mystic four-line poetic verses composed by 14th-century Kashmiri poetess Lalleshwari (Lal Ded), celebrating spiritual oneness." }
  ];

  // 6. Flashcard Study Vault Data
  const FLASHCARDS = [
    { topic: "Reorganisation Act 2019", front: "Constitutional Model of J&K UT", back: "Established under Article 239A model (with Legislative Assembly), effective 31 October 2019. Divided former state into UT of J&K and UT of Ladakh." },
    { topic: "Historiography", front: "Kalhana's Rajatarangini (1148-1149 CE)", back: "Sanskrit chronicle documenting Kashmir's dynastic eras: Karkotas (Lalitaditya Muktapida), Utpalas (Avantivarman), and Loharas. India's first formal historical text." },
    { topic: "International Water Treaty", front: "Indus Waters Treaty 1960", back: "Signed between India and Pakistan. Allocated Western Rivers (Indus, Jhelum, Chenab) to Pakistan with run-of-the-river hydro rights for India; Eastern Rivers (Ravi, Beas, Sutlej) to India." },
    { topic: "Vernacular Architecture", front: "Taq & Dhajji Diwari Systems", back: "Earthquake-resistant traditional timber-laced masonry. Taq uses heavy timber runners at window levels; Dhajji Diwari uses light timber frames braced with stone/brick infill." },
    { topic: "Geographical Indications", front: "J&K GI Tagged Products", back: "Pampore Saffron, Kani Shawl, Pashmina Wool, Sozni Craft, Basohli Miniature Painting, Basohli Pashmina, Kashmiri Willow Bat, Walnut Wood Carving." },
    { topic: "Hydroelectric Capacity", front: "Chenab River Basin Power Projects", back: "Includes Ratle (850MW), Kiru (624MW), Pakal Dul (1000MW), Kwar (540MW), Salal (690MW), and Baglihar (900MW), generating clean green energy." }
  ];

  // 7. 20 District Detailed Data for Side-by-Side Comparison
  const DISTRICT_COMPARE_DB = {
    "srinagar": { name: "Srinagar", div: "Kashmir", pop: "12.7 Lakh", area: "1,979 km²", crop: "Horticulture, Saffron, Crafts", river: "Jhelum (Vitasta), Dal Lake", rail_hw: "Srinagar Rly Station, NH-44" },
    "jammu": { name: "Jammu", div: "Jammu", pop: "15.3 Lakh", area: "2,342 km²", crop: "Basmati Rice, Wheat, Citrus", river: "Tawi (Surya Putri), Chenab", rail_hw: "Jammu Tawi Rly Station, NH-44" },
    "anantnag": { name: "Anantnag", div: "Kashmir", pop: "10.7 Lakh", area: "3,574 km²", crop: "Apples, Walnut, Saffron", river: "Jhelum, Brengi, Lidder", rail_hw: "Anantnag Rly Station, NH-44" },
    "baramulla": { name: "Baramulla", div: "Kashmir", pop: "10.1 Lakh", area: "4,190 km²", crop: "High-Density Apples, Paddy", river: "Jhelum, Wular Lake", rail_hw: "Baramulla Rly Station, NH-701" },
    "ramban": { name: "Ramban", div: "Jammu", pop: "2.8 Lakh", area: "1,329 km²", crop: "Maize, Organic Pulses, Honey", river: "Chenab River, Bichleri", rail_hw: "Banihal Rly Station, NH-44" },
    "kishtwar": { name: "Kishtwar", div: "Jammu", pop: "2.3 Lakh", area: "7,737 km²", crop: "Saffron, Sapphire Mining, Hydro", river: "Chenab, Marusudar", rail_hw: "NH-244 (Kishtwar Axis)" },
    "pulwama": { name: "Pulwama", div: "Kashmir", pop: "5.6 Lakh", area: "1,086 km²", crop: "Pampore Saffron, Dairy, Apple", river: "Jhelum, Rambiara", rail_hw: "Kakapora Rly Station, NH-44" },
    "reasi": { name: "Reasi", div: "Jammu", pop: "3.1 Lakh", area: "1,719 km²", crop: "Maize, Wheat, Pilgrimage Tourism", river: "Chenab, Anji Nallah", rail_hw: "Reasi Rly Station (Chenab Bridge)" }
  };

  // Render Flashcard Vault
  let flashcardIdx = 0;
  let isCardFlipped = false;

  window.renderFlashcardVault = function() {
    const container = document.getElementById('flashcardVaultContainer');
    if (!container) return;

    const card = FLASHCARDS[flashcardIdx];
    if (!card) return;

    container.innerHTML = `
      <div class="fc-wrapper">
        <div class="fc-card ${isCardFlipped ? 'flipped' : ''}" onclick="window.flipCurrentFlashcard()">
          <div class="fc-face fc-front">
            <span class="fc-topic-tag">📌 ${escapeHtml(card.topic)}</span>
            <h4>${escapeHtml(card.front)}</h4>
            <p class="fc-hint">💡 Tap to Flip Card & Reveal Study Notes &rarr;</p>
          </div>
          <div class="fc-face fc-back">
            <span class="fc-topic-tag">📜 High-Yield Notes</span>
            <p>${escapeHtml(card.back)}</p>
            <button class="btn-audio-pronounce" onclick="event.stopPropagation(); window.playPronunciation('${escapeHtml(card.front)}. ${escapeHtml(card.back)}')">🔊 Listen Notes</button>
          </div>
        </div>

        <div class="fc-controls">
          <button class="btn-fc-nav" onclick="window.prevFlashcard()">&larr; Previous</button>
          <span class="fc-counter">Card ${flashcardIdx + 1} of ${FLASHCARDS.length}</span>
          <button class="btn-fc-nav" onclick="window.nextFlashcard()">Next &rarr;</button>
        </div>
      </div>
    `;
  };

  window.flipCurrentFlashcard = function() {
    isCardFlipped = !isCardFlipped;
    window.renderFlashcardVault();
  };

  window.nextFlashcard = function() {
    isCardFlipped = false;
    flashcardIdx = (flashcardIdx + 1) % FLASHCARDS.length;
    window.renderFlashcardVault();
  };

  window.prevFlashcard = function() {
    isCardFlipped = false;
    flashcardIdx = (flashcardIdx - 1 + FLASHCARDS.length) % FLASHCARDS.length;
    window.renderFlashcardVault();
  };

  // Render District Compare Matrix
  window.executeDistrictComparison = function() {
    const selA = document.getElementById('compareDistA');
    const selB = document.getElementById('compareDistB');
    const out = document.getElementById('compareResultContainer');

    if (!selA || !selB || !out) return;

    const dA = DISTRICT_COMPARE_DB[selA.value];
    const dB = DISTRICT_COMPARE_DB[selB.value];

    if (!dA || !dB) return;

    out.innerHTML = `
      <div class="compare-table-box">
        <table class="compare-table">
          <thead>
            <tr>
              <th>Feature Parameter</th>
              <th>${escapeHtml(dA.name)} (${escapeHtml(dA.div)})</th>
              <th>${escapeHtml(dB.name)} (${escapeHtml(dB.div)})</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>Division</strong></td><td>${escapeHtml(dA.div)} Division</td><td>${escapeHtml(dB.div)} Division</td></tr>
            <tr><td><strong>Est. Population</strong></td><td>${escapeHtml(dA.pop)}</td><td>${escapeHtml(dB.pop)}</td></tr>
            <tr><td><strong>Geographic Area</strong></td><td>${escapeHtml(dA.area)}</td><td>${escapeHtml(dB.area)}</td></tr>
            <tr><td><strong>Primary Agricultural Crops</strong></td><td>${escapeHtml(dA.crop)}</td><td>${escapeHtml(dB.crop)}</td></tr>
            <tr><td><strong>River Basins / Water Bodies</strong></td><td>${escapeHtml(dA.river)}</td><td>${escapeHtml(dB.river)}</td></tr>
            <tr><td><strong>Highway &amp; Rail Connectivity</strong></td><td>${escapeHtml(dA.rail_hw)}</td><td>${escapeHtml(dB.rail_hw)}</td></tr>
          </tbody>
        </table>
      </div>
    `;
  };

  // Render NH-44 Tracker
  function renderNH44Tracker() {
    const el = document.getElementById('nh44CorridorWidget');
    if (!el) return;

    let html = `
      <div class="nh44-tracker-box">
        <div class="nh44-header">
          <div>
            <span class="nh44-tag">🛣️ NATIONAL HIGHWAY 44</span>
            <h4>Jammu - Srinagar NH-44 Live Corridor Status</h4>
            <p>270-km strategic lifeline corridor linking Jammu, Ramban, Banihal, and Srinagar.</p>
          </div>
          <div class="nh44-tcu-info">
            <div>📞 TCU Jammu: <strong>0191-2459048</strong></div>
            <div>📞 TCU Srinagar: <strong>0194-2450022</strong></div>
            <div>📞 TCU Ramban: <strong>9419993745</strong></div>
          </div>
        </div>
        <div class="nh44-sectors-grid">
    `;

    NH44_SECTORS.forEach(sec => {
      const badgeClass = sec.status === 'clear' ? 'sec-clear' : (sec.status === 'advisory' ? 'sec-advisory' : 'sec-alert');
      html += `
        <div class="nh44-sector-card ${badgeClass}">
          <div class="sec-top">
            <span class="sec-name">${sec.icon} ${escapeHtml(sec.name)}</span>
            <span class="sec-dist">${sec.distance}</span>
          </div>
          <p class="sec-note">${escapeHtml(sec.note)}</p>
        </div>
      `;
    });

    html += `</div></div>`;
    el.innerHTML = html;
  }

  // GI Authenticator Logic
  window.verifyGICode = function() {
    const input = document.getElementById('giCodeInput');
    const resultEl = document.getElementById('giResultBox');
    if (!input || !resultEl) return;

    const code = input.value.trim().toUpperCase();
    if (!code) {
      resultEl.innerHTML = '<p class="gi-error">⚠️ Please enter a GI Certificate serial code (e.g. SAF-PMP-8841 or PAS-KNI-1092).</p>';
      return;
    }

    const record = GI_DATABASE[code];
    if (record) {
      resultEl.innerHTML = `
        <div class="gi-success-card">
          <div class="gi-badge-verified">✅ VERIFIED GENUINE GEOGRAPHICAL INDICATION (GI)</div>
          <h3>${escapeHtml(record.item)}</h3>
          <table class="gi-details-table">
            <tr><td><strong>Producer Guild:</strong></td><td>${escapeHtml(record.producer)}</td></tr>
            <tr><td><strong>Origin Village:</strong></td><td>${escapeHtml(record.origin)}</td></tr>
            ${record.crocin_potency ? `<tr><td><strong>Crocin Chemical Potency:</strong></td><td>${escapeHtml(record.crocin_potency)}</td></tr>` : ''}
            ${record.micron ? `<tr><td><strong>Fiber Thickness:</strong></td><td>${escapeHtml(record.micron)}</td></tr>` : ''}
            ${record.weaver ? `<tr><td><strong>Master Artisan:</strong></td><td>${escapeHtml(record.weaver)}</td></tr>` : ''}
            ${record.embroidery_hours ? `<tr><td><strong>Hand Needlework:</strong></td><td>${escapeHtml(record.embroidery_hours)}</td></tr>` : ''}
          </table>
        </div>
      `;
    } else {
      resultEl.innerHTML = `
        <div class="gi-unknown-card">
          <h4>🔍 Code '${escapeHtml(code)}' Not Found in Sample Registry</h4>
          <p>Try testing sample GI codes: <code>SAF-PMP-8841</code>, <code>SAF-PMP-8842</code>, <code>PAS-KNI-1092</code>, or <code>PAS-SZN-2041</code>.</p>
        </div>
      `;
    }
  };

  // Circuit Planner Renderer
  window.selectTravelCircuit = function(circuitKey, btnEl) {
    const circuit = TRAVEL_CIRCUITS[circuitKey];
    const displayEl = document.getElementById('circuitDisplayBox');
    if (!circuit || !displayEl) return;

    document.querySelectorAll('.circuit-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    displayEl.innerHTML = `
      <div class="circuit-result-card">
        <h3>${escapeHtml(circuit.title)}</h3>
        <div class="circuit-detail-row"><strong>🚩 Recommended Route:</strong> ${escapeHtml(circuit.route)}</div>
        <div class="circuit-detail-row"><strong>⏱️ Ideal Duration:</strong> ${escapeHtml(circuit.duration)}</div>
        <div class="circuit-detail-row"><strong>🗓️ Best Travel Season:</strong> ${escapeHtml(circuit.best_season)}</div>
        <div class="circuit-detail-row"><strong>✨ Major Attractions:</strong> ${escapeHtml(circuit.highlights)}</div>
        <div class="circuit-detail-row"><strong>🍲 Local Speciality &amp; Craft:</strong> ${escapeHtml(circuit.craft_food)}</div>
      </div>
    `;
  };

  // Quiz Engine Logic
  let currentQIndex = 0;
  let userScore = 0;

  window.renderQuizWidget = function() {
    const container = document.getElementById('interactiveQuizContainer');
    if (!container) return;

    const q = QUIZ_QUESTIONS[currentQIndex];
    if (!q) return;

    let html = `
      <div class="quiz-engine-card">
        <div class="quiz-progress-head">
          <span>Question ${currentQIndex + 1} of ${QUIZ_QUESTIONS.length}</span>
          <span>Score: ${userScore} / ${QUIZ_QUESTIONS.length}</span>
        </div>
        <h4 class="quiz-question-text">${escapeHtml(q.q)}</h4>
        <div class="quiz-options-list">
    `;

    q.options.forEach((opt, idx) => {
      html += `
        <button class="quiz-opt-btn-new" onclick="window.submitQuizAnswer(${idx})">
          <span class="opt-letter">${String.fromCharCode(65 + idx)}.</span>
          <span>${escapeHtml(opt)}</span>
        </button>
      `;
    });

    html += `
        </div>
        <div id="quizFeedbackBox" class="quiz-feedback-box" style="display:none;"></div>
      </div>
    `;

    container.innerHTML = html;
  };

  window.submitQuizAnswer = function(selectedIdx) {
    const q = QUIZ_QUESTIONS[currentQIndex];
    const feedbackBox = document.getElementById('quizFeedbackBox');
    if (!q || !feedbackBox) return;

    const isCorrect = selectedIdx === q.answer;
    if (isCorrect) userScore++;

    const feedbackHtml = `
      <div class="${isCorrect ? 'fb-correct' : 'fb-incorrect'}">
        <strong>${isCorrect ? '✅ Correct Answer!' : '❌ Incorrect'}</strong>
        <p>${escapeHtml(q.explanation)}</p>
        <button class="btn-quiz-next" onclick="window.nextQuizQuestion()">
          ${currentQIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question &rarr;' : 'Finish Quiz & View Results'}
        </button>
      </div>
    `;

    feedbackBox.innerHTML = feedbackHtml;
    feedbackBox.style.display = 'block';
    document.querySelectorAll('.quiz-opt-btn-new').forEach(b => b.disabled = true);
  };

  window.nextQuizQuestion = function() {
    currentQIndex++;
    if (currentQIndex < QUIZ_QUESTIONS.length) {
      window.renderQuizWidget();
    } else {
      const container = document.getElementById('interactiveQuizContainer');
      if (container) {
        container.innerHTML = `
          <div class="quiz-final-card">
            <h3>🎉 Quiz Complete!</h3>
            <p style="font-size:1.2rem; font-weight:700; color:var(--navy);">Your Final Score: ${userScore} / ${QUIZ_QUESTIONS.length}</p>
            <p>${userScore === QUIZ_QUESTIONS.length ? 'Outstanding! You have mastered J&K history, geography, and governance fundamentals.' : 'Good effort! Review the study modules to reinforce key civil services concepts.'}</p>
            <button class="btn-news-reset" onclick="window.restartQuiz()">Restart Quiz</button>
          </div>
        `;
      }
    }
  };

  window.restartQuiz = function() {
    currentQIndex = 0;
    userScore = 0;
    window.renderQuizWidget();
  };

  // Render Culinary Glossary
  function renderCulinaryGlossary() {
    const container = document.getElementById('culinaryGlossaryContainer');
    if (!container) return;

    let html = '<div class="culinary-grid">';
    CULINARY_GLOSSARY.forEach(item => {
      html += `
        <div class="culinary-card">
          <div class="cul-top">
            <h4 class="cul-name">${escapeHtml(item.term)}</h4>
            <button class="btn-audio-pronounce" onclick="window.playPronunciation('${escapeHtml(item.term)}')">🔊 Listen</button>
          </div>
          <span class="cul-cat-pill">${escapeHtml(item.cat)}</span>
          <p class="cul-desc">${escapeHtml(item.desc)}</p>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  }

  // 9. Expanded Dual Kashmiri & Dogri Phrasebook Database
  const PHRASEBOOK_DATA = [
    { cat: "Greetings", eng: "Welcome & Respectful Greetings", kashmiri: "Aalaam Walaykum / Namaskar", dogri: "Aao Ji / Namaste Ji", audio_k: "Aalaam Walaykum. Namaskar.", audio_d: "Aao Ji. Namaste Ji." },
    { cat: "Greetings", eng: "How are you doing?", kashmiri: "Tuhi Chhi Kithay?", dogri: "Tundha Keha Haal Hai?", audio_k: "Tuhi Chhi Kithay?", audio_d: "Tundha Keha Haal Hai?" },
    { cat: "Greetings", eng: "I am fine, thank you!", kashmiri: "Me Chhu Warai, Shukriya", dogri: "Au Thik Haan, Dhanyavad", audio_k: "Me Chhu Warai, Shukriya", audio_d: "Au Thik Haan, Dhanyavad" },
    { cat: "Greetings", eng: "What is your name?", kashmiri: "Tuhund Naav Kyah Chhu?", dogri: "Tundha Naa Kyeh Hai?", audio_k: "Tuhund Naav Kyah Chhu?", audio_d: "Tundha Naa Kyeh Hai?" },
    { cat: "Greetings", eng: "Pleased to meet you", kashmiri: "Tuhyis Saath Melith Goyi Khushi", dogri: "Tundhe Ne Milia Badi Khushi Hoyi", audio_k: "Tuhyis Saath Melith Goyi Khushi", audio_d: "Tundhe Ne Milia Badi Khushi Hoyi" },
    
    { cat: "Travel", eng: "What is the name of this place?", kashmiri: "Yath Jaayi Kyah Chhu Naav?", dogri: "Eh Jaga Kuteh Hai?", audio_k: "Yath Jaayi Kyah Chhu Naav?", audio_d: "Eh Jaga Kuteh Hai?" },
    { cat: "Travel", eng: "Which way goes to Srinagar / Jammu?", kashmiri: "Srinagar Uk Vath Katih Chhi?", dogri: "Srinagar Di Sarak Kuteh Jandi Hai?", audio_k: "Srinagar Uk Vath Katih Chhi?", audio_d: "Srinagar Di Sarak Kuteh Jandi Hai?" },
    { cat: "Travel", eng: "Is the road clear for traffic?", kashmiri: "Vath Chha Khulith Traffic Khutir?", dogri: "Rasta Khulla Hai Ke Band?", audio_k: "Vath Chha Khulith Traffic Khutir?", audio_d: "Rasta Khulla Hai Ke Band?" },
    { cat: "Travel", eng: "How far is the railway station?", kashmiri: "Railway Station Koot Door Chhu?", dogri: "Railway Station Keta Door Hai?", audio_k: "Railway Station Koot Door Chhu?", audio_d: "Railway Station Keta Door Hai?" },

    { cat: "Shopping", eng: "Is this genuine certified Pampore Saffron?", kashmiri: "Assil GI Saffron Chha?", dogri: "Eh Asli Kesar Hai?", audio_k: "Assil GI Saffron Chha?", audio_d: "Eh Asli Kesar Hai?" },
    { cat: "Shopping", eng: "Is this 100% pure Pashmina wool?", kashmiri: "Eh Assil Pashmina Chha?", dogri: "Eh Asli Pashmina Shawl Hai?", audio_k: "Eh Assil Pashmina Chha?", audio_d: "Eh Asli Pashmina Shawl Hai?" },
    { cat: "Shopping", eng: "What is the price for this item?", kashmiri: "Yath Kyah Chhu Mol?", dogri: "Isda Kyeh Ret Hai?", audio_k: "Yath Kyah Chhu Mol?", audio_d: "Isda Kyeh Ret Hai?" },
    { cat: "Shopping", eng: "Please give me a fair price", kashmiri: "Wajbi Mol Kariv", dogri: "Sahi Ret Lavo", audio_k: "Wajbi Mol Kariv", audio_d: "Sahi Ret Lavo" },

    { cat: "Dining", eng: "Let us drink hot Saffron Kahwa tea", kashmiri: "Kashmiri Saffron Kahwa Pyev", dogri: "Garam Kahwa Piyei", audio_k: "Kashmiri Saffron Kahwa Pyev", audio_d: "Garam Kahwa Piyei" },
    { cat: "Dining", eng: "What are the main dishes in Wazwan?", kashmiri: "Wazwanas Manz Kyah Kyah Chhu?", dogri: "Wazwan Ch Kyeh Kyeh Banea Hai?", audio_k: "Wazwanas Manz Kyah Kyah Chhu?", audio_d: "Wazwan Ch Kyeh Kyeh Banea Hai?" },
    { cat: "Dining", eng: "This food is very delicious", kashmiri: "Khaas Batte Chhu Varah Modur", dogri: "Eh Khana Bada Swadisht Hai", audio_k: "Khaas Batte Chhu Varah Modur", audio_d: "Eh Khana Bada Swadisht Hai" },

    { cat: "Emergency", eng: "I need emergency assistance", kashmiri: "Madath Kariv / Madath Gasi", dogri: "Meri Madad Karo", audio_k: "Madath Kariv. Madath Gasi.", audio_d: "Meri Madad Karo." },
    { cat: "Emergency", eng: "Where is the nearest hospital?", kashmiri: "Nazdiki Hospital Katih Chhu?", dogri: "Nede Da Aspatal Kuteh Hai?", audio_k: "Nazdiki Hospital Katih Chhu?", audio_d: "Nede Da Aspatal Kuteh Hai?" },
    { cat: "Emergency", eng: "Please call police / emergency 112", kashmiri: "Police / 112 Call Kariv", dogri: "Police Nu Fon Karo", audio_k: "Police 112 Call Kariv", audio_d: "Police Nu Fon Karo" }
  ];

  let phraseCatFilter = 'all';
  let phraseSearchQuery = '';

  window.setPhrasebookCategory = function(cat, btnEl) {
    phraseCatFilter = cat;
    document.querySelectorAll('.pb-filter-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    window.renderPhrasebookTutor();
  };

  window.handlePhraseSearch = function(inputEl) {
    phraseSearchQuery = inputEl.value.toLowerCase();
    window.renderPhrasebookTutor();
  };

  window.renderPhrasebookTutor = function() {
    const container = document.getElementById('phrasebookTutorContainer');
    if (!container) return;

    let filtered = PHRASEBOOK_DATA.filter(p => {
      const matchCat = phraseCatFilter === 'all' || p.cat.toLowerCase() === phraseCatFilter.toLowerCase();
      const q = phraseSearchQuery;
      const matchSearch = !q || 
        p.eng.toLowerCase().includes(q) || 
        p.kashmiri.toLowerCase().includes(q) || 
        p.dogri.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    let html = `
      <div class="phrasebook-controls-bar">
        <div class="pb-search-box">
          <span>🔎</span>
          <input type="text" class="pb-search-input" placeholder="Search phrases (e.g. Saffron, Srinagar, Kahwa, Greetings, Price)..." oninput="window.handlePhraseSearch(this)">
        </div>
        <div class="pb-filter-tabs">
          <button class="pb-filter-btn active" onclick="window.setPhrasebookCategory('all', this)">🌐 All Phrases (${PHRASEBOOK_DATA.length})</button>
          <button class="pb-filter-btn" onclick="window.setPhrasebookCategory('Greetings', this)">🤝 Greetings</button>
          <button class="pb-filter-btn" onclick="window.setPhrasebookCategory('Travel', this)">🚗 Travel</button>
          <button class="pb-filter-btn" onclick="window.setPhrasebookCategory('Shopping', this)">🛍️ Shopping</button>
          <button class="pb-filter-btn" onclick="window.setPhrasebookCategory('Dining', this)">🍲 Dining</button>
          <button class="pb-filter-btn" onclick="window.setPhrasebookCategory('Emergency', this)">🚨 Emergency</button>
        </div>
      </div>

      <div class="phrasebook-grid">
    `;

    if (filtered.length === 0) {
      html += `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; background: var(--gray-50); border-radius: 8px;">
          <p>No matching phrases found for '${escapeHtml(phraseSearchQuery)}'. Try searching for 'Kahwa', 'Srinagar', 'Price', or 'Hospital'.</p>
        </div>
      `;
    } else {
      filtered.forEach(p => {
        html += `
          <div class="phrase-card-enhanced">
            <div class="phrase-card-head">
              <span class="phrase-eng-title">🇬🇧 ${escapeHtml(p.eng)}</span>
              <span class="phrase-cat-badge">${escapeHtml(p.cat)}</span>
            </div>

            <div class="phrase-lang-row row-kashmiri">
              <div>
                <span class="lang-label">🏔️ Kashmiri (Kosur):</span>
                <div class="lang-text">${escapeHtml(p.kashmiri)}</div>
              </div>
              <button class="btn-audio-speak audio-kashmiri" onclick="window.playPronunciation('${escapeHtml(p.audio_k)}')">
                🔊 Kashmiri
              </button>
            </div>

            <div class="phrase-lang-row row-dogri">
              <div>
                <span class="lang-label">🏞️ Dogri (Duggar):</span>
                <div class="lang-text">${escapeHtml(p.dogri)}</div>
              </div>
              <button class="btn-audio-speak audio-dogri" onclick="window.playPronunciation('${escapeHtml(p.audio_d)}')">
                🔊 Dogri
              </button>
            </div>
          </div>
        `;
      });
    }

    html += '</div>';
    container.innerHTML = html;
  };

  // 10. 20-District Iconic Local Food Showcase Data
  const DISTRICT_FOODS_DATA = [
    { district: "Srinagar", division: "Kashmir", dish: "Wazwan Tabak Maaz & Rogan Josh", type: "Royal Feast", img: "assets/wazwan_rogan_josh.jpg", desc: "Tender lamb ribs pan-fried in clarified butter served alongside crimson gravy slow-cooked with Kashmiri chillies and dried cockscomb flower.", tip: "Best paired with fragrant Kashmiri Safed Rice & hot Kehwa tea." },
    { district: "Pulwama", division: "Kashmir", dish: "Pampore Saffron Firni", type: "Sweet Dessert", img: "assets/saffron_firni.jpg", desc: "Silky rice pudding infused with pure GI-tagged Pampore Saffron strands, crushed cardamoms, and toasted slivered almonds in earthenware matkas.", tip: "Eaten chilled during autumn saffron harvest season." },
    { district: "Jammu", division: "Jammu", dish: "Kaladi Kulcha & Mint Chutney", type: "Street Snack", img: "assets/kaladi_kulcha.jpg", desc: "Artisanal raw hill cheese (Kaladi) pan-fried till golden crispy outside and molten inside, stuffed into warm bakery kulchas.", tip: "Add wild pomegranate (anardana) green chutney for signature tangy kick." },
    { district: "Ramban", division: "Jammu", dish: "Peera Rajma Chawal with Anardana", type: "Mountain Comfort", img: "assets/peera_rajma_chawal.jpg", desc: "Mountain red kidney beans cooked in aromatic spices, poured generously over steamed basmati rice with melting desi ghee and sour pomegranate dip.", tip: "Popular stop at Peera on the NH-44 highway corridor." },
    { district: "Anantnag", division: "Kashmir", dish: "Lidder Mountain Trout Fry", type: "Seafood Delight", img: "assets/wazwan_rogan_josh.jpg", desc: "Fresh rainbow trout from Pahalgam mountain streams pan-fried in mustard oil with Kashmiri red chillies and carom seeds.", tip: "Relished along the banks of the Lidder river." },
    { district: "Budgam", division: "Kashmir", dish: "Kanihama Saffron Sheermal & Dum Aloo", type: "Bakery & Curry", img: "assets/saffron_firni.jpg", desc: "Warm saffron-sprinkled baked flatbread served with deep-fried baby potatoes simmered in fennel and ginger yogurt gravy.", tip: "Traditional breakfast pairing in Budgam weaver villages." },
    { district: "Baramulla", division: "Kashmir", dish: "Lower Jhelum Nadru Yakhni", type: "Delicate Yogurt Curry", img: "assets/wazwan_rogan_josh.jpg", desc: "Crisp lotus stems harvested from water basins cooked in curd gravy with dried mint and Kashmiri cardamom.", tip: "Pairs wonderfully with Kashmiri Tsot naan bread." },
    { district: "Bandipora", division: "Kashmir", dish: "Wular Fish Pakora & Hogaad", type: "Lake Speciality", img: "assets/wazwan_rogan_josh.jpg", desc: "Crispy battered lake fish fritters and sun-dried fish (Hogaad) pan-seared with garlic and red chillies.", tip: "A zimindari winter comfort food around Wular lake." },
    { district: "Ganderbal", division: "Kashmir", dish: "Sonamarg Walnut Chutney & Kehwa", type: "Nutritious Dip", img: "assets/saffron_firni.jpg", desc: "Crushed high-altitude Sonamarg walnuts pounded with green chillies, mint, and thick curd.", tip: "Served as a dip with Kashmiri naan or Wazwan kebabs." },
    { district: "Kulgam", division: "Kashmir", dish: "Veshaw Nadru Monji Fritters", type: "Crispy Snack", img: "assets/wazwan_rogan_josh.jpg", desc: "Sliced lotus stems dipped in spiced rice flour batter and deep-fried to golden perfection.", tip: "Available fresh at street stalls near Aharbal waterfall." },
    { district: "Shopian", division: "Kashmir", dish: "Shopian Apple Halwa & Tart", type: "Orchard Dessert", img: "assets/saffron_firni.jpg", desc: "Sweet halwa made by reducing grated Shopian organic Red Delicious apples with khoya, cardamom, and ghee.", tip: "Tastes heavenly during apple harvesting season in October." },
    { district: "Kupwara", division: "Kashmir", dish: "Lolab Forest Gucchi Morel Curry", type: "Exotic Mushroom", img: "assets/wazwan_rogan_josh.jpg", desc: "Rare wild black morel mushrooms gathered from Lolab pine forests slow-cooked with ghee, cloves, and Kashmiri saffron.", tip: "One of the rarest and most prized culinary delicacies in the world." },
    { district: "Udhampur", division: "Jammu", dish: "Kud Golden Patisa & Kaladi", type: "Hill Sweet", img: "assets/kaladi_kulcha.jpg", desc: "Flaky, melt-in-mouth golden Patisa sweet made with pure desi ghee in Kud hill station shops.", tip: "Must-buy sweet souvenir when traveling between Udhampur and Ramban." },
    { district: "Doda", division: "Jammu", dish: "Bhaderwah Red Rajma Pulao", type: "Valley Grain", img: "assets/peera_rajma_chawal.jpg", desc: "Small-grained sweet Bhaderwahi red kidney beans cooked with aromatic basmati rice and local ghee.", tip: "Renowned for its naturally sweet flavor and soft texture." },
    { district: "Kishtwar", division: "Jammu", dish: "Kishtwar Saffron Halwa", type: "Royal Sweet", img: "assets/saffron_firni.jpg", desc: "Rich semolina dessert cooked with Kishtwar plateau saffron and mountain walnuts.", tip: "Prepared during festive celebrations in Chenab valley." },
    { district: "Kathua", division: "Jammu", dish: "Basohli Ambal & Dogri Dham", type: "Festive Feast", img: "assets/peera_rajma_chawal.jpg", desc: "Sweet and sour tamarind pumpkin curry prepared by traditional Botis (chefs) for community Dogri Dham feasts.", tip: "Served on leaf plates (Pattal) alongside Rajma and Maah Da Madra." },
    { district: "Samba", division: "Jammu", dish: "Samba Basmati Rajma & Jaggery", type: "Plain Classic", img: "assets/peera_rajma_chawal.jpg", desc: "Fragrant Samba basmati rice served with slow-simmered Rajma and pure sugarcane jaggery (Gud).", tip: "Simple, nourishing daily meal of the Jammu plains." },
    { district: "Reasi", division: "Jammu", dish: "Vaishno Devi Kanjak Poori Halwa", type: "Prashad Feast", img: "assets/saffron_firni.jpg", desc: "Sacred shrine prashad comprising fried golden pooris, suji halwa, and spiced dry black chana.", tip: "Served to pilgrims after Katra Yatra completion." },
    { district: "Poonch", division: "Jammu", dish: "Pir Panjal Maize Roti & Sarson Saag", type: "Highland Harvest", img: "assets/kaladi_kulcha.jpg", desc: "Coarse hand-pounded corn flour flatbread served with fresh winter mustard greens and white butter.", tip: "Staple winter meal across mountain villages of Poonch and Rajouri." },
    { district: "Rajouri", division: "Jammu", dish: "Rajouri Pure Milk Barfi & Pinni", type: "Dairy Delicacy", img: "assets/kaladi_kulcha.jpg", desc: "Dense milk reduction sweet prepared from high-fat mountain buffalo milk in Rajouri town.", tip: "Rich source of energy for highland winter months." }
  ];

  let foodDivFilter = 'all';

  window.setFoodDivision = function(divName, btnEl) {
    foodDivFilter = divName;
    document.querySelectorAll('.food-div-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    window.renderDistrictFoodExplorer();
  };

  window.renderDistrictFoodExplorer = function() {
    const container = document.getElementById('districtFoodContainer');
    if (!container) return;

    let filtered = DISTRICT_FOODS_DATA.filter(f => {
      if (foodDivFilter === 'all') return true;
      return f.division.toLowerCase() === foodDivFilter.toLowerCase();
    });

    let html = `
      <div class="food-controls-bar">
        <div class="food-div-tabs">
          <button class="food-div-btn active" onclick="window.setFoodDivision('all', this)">🌐 All 20 District Delicacies</button>
          <button class="food-div-btn" onclick="window.setFoodDivision('kashmir', this)">🏔️ Kashmir Division Foods (10)</button>
          <button class="food-div-btn" onclick="window.setFoodDivision('jammu', this)">🏞️ Jammu Division Foods (10)</button>
        </div>
      </div>

      <div class="food-cards-grid">
    `;

    filtered.forEach(f => {
      const isKashmir = f.division === 'Kashmir';
      const badgeStyle = isKashmir ? 'background:#fdf8f4; color:#d96b1e; border:1px solid #f3d5bd;' : 'background:#f4f8fd; color:#1d4ed8; border:1px solid #bfdbfe;';

      html += `
        <div class="food-card-cute">
          <div class="food-img-wrap">
            <img src="${f.img}" alt="${escapeHtml(f.dish)}" class="food-img" onerror="this.src='assets/kaladi_kulcha.jpg'">
            <span class="food-type-tag">${escapeHtml(f.type)}</span>
          </div>

          <div class="food-card-body">
            <div class="food-dist-row">
              <span class="food-dist-name">📍 ${escapeHtml(f.district)} District</span>
              <span class="food-div-tag" style="${badgeStyle}">${escapeHtml(f.division)}</span>
            </div>

            <h4 class="food-dish-title">${escapeHtml(f.dish)}</h4>
            <p class="food-desc">${escapeHtml(f.desc)}</p>

            <div class="food-tip-box">
              <strong>💡 Culinary Tip:</strong> ${escapeHtml(f.tip)}
            </div>
            
            <button class="btn-audio-speak audio-kashmiri" style="margin-top:10px; width:100%;" onclick="window.playPronunciation('Famous food of ${escapeHtml(f.district)} is ${escapeHtml(f.dish)}')">
              🔊 Hear Food Details
            </button>
          </div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  };

  // 11. Botanical & Floral Bloom Research Database
  const FLORAL_BLOOM_DATA = [
    {
      name: "Indira Gandhi Memorial Tulip Garden (Tulipa)",
      location: "Srinagar (Zabarwan Mountain Foothills)",
      season: "March - April (Spring Festival)",
      img: "assets/kashmir_tulips.jpg",
      fact: "Asia's largest Tulip Garden covering 30 hectares! Home to over 1.5 million blooming tulips across 65 rare varieties (Dutch Master, Golden Parade, Purple Prince).",
      research: "CSIR floriculture research has acclimatized high-altitude bulb storage techniques to extend spring blooming duration by 18 days."
    },
    {
      name: "Pampore Saffron Crocus (Crocus sativus)",
      location: "Pampore Karewas (Pulwama) & Kishtwar Plateau",
      season: "October - November (Autumn Harvest)",
      img: "assets/saffron_crocus.jpg",
      fact: "Each purple crocus flower yields exactly 3 crimson stigmas. It requires 150,000 hand-picked blossoms to produce 1 kg of pure export-grade Saffron!",
      research: "SKUAST-Kashmir biotechnology research developed HPLC quality mapping for high Crocin potency (250+ grade)."
    },
    {
      name: "Himalayan Blue Poppy (Meconopsis aculeata)",
      location: "High Alpine Meadows (Gulmarg, Gurez, Alpather Lake)",
      season: "July - August (Monsoon Alpine Bloom)",
      img: "assets/himalayan_blue_poppy.jpg",
      fact: "Known as the 'Queen of Himalayan Wildflowers'. Possesses rare translucent sky-blue petals with bright golden stamens, blooming at 3,500m+ altitude.",
      research: "Protected high-altitude alpine species studied for medicinal alkaloid compounds and glacial microclimate adaptation."
    },
    {
      name: "Sacred Dal Lake Kashmiri Lotus (Nelumbo nucifera)",
      location: "Dal Lake, Nigeen Lake & Wular Water Basins",
      season: "July - August (Summer Water Bloom)",
      img: "assets/dal_lake_lotus.jpg",
      fact: "Elegant pink and white lotus flowers cover Dal Lake in summer. Their underwater rhizomes form the famous Nadru vegetable, while seeds (Pambach) are eaten fresh!",
      research: "Freshwater bio-filtration studies reveal lotus root networks naturally purify lake water quality."
    },
    {
      name: "Pahalgam Purple Lavender Valleys (Lavandula angustifolia)",
      location: "Pahalgam Valley & Sirhama (Pulwama Floriculture Hub)",
      season: "June - July (Summer Purple Bloom)",
      img: "assets/kashmir_lavender.jpg",
      fact: "Vast purple lavender fields blanket mountain slopes under the Aroma Mission, creating dreamy purple landscapes for essential oil extraction.",
      research: "CSIR-IIIM Kashmir essential oil distillation research empowered over 2,500 small farmers with high-yield purple lavender cultivation."
    }
  ];

  window.renderFloralBloomExplorer = function() {
    const container = document.getElementById('floralBloomContainer');
    if (!container) return;

    let html = '<div class="floral-grid">';
    FLORAL_BLOOM_DATA.forEach(f => {
      html += `
        <div class="floral-card-cute">
          <div class="floral-img-box">
            <img src="${f.img}" alt="${escapeHtml(f.name)}" class="floral-img" onerror="this.src='assets/kashmir_tulips.jpg'">
            <span class="floral-season-badge">🗓️ ${escapeHtml(f.season)}</span>
          </div>

          <div class="floral-card-body">
            <span class="floral-loc-tag">📍 ${escapeHtml(f.location)}</span>
            <h4 class="floral-title">${escapeHtml(f.name)}</h4>
            
            <div class="floral-fact-box">
              <strong>🌸 Botanical Fact:</strong> ${escapeHtml(f.fact)}
            </div>

            <div class="floral-research-box">
              <strong>🔬 Research &amp; Conservation:</strong> ${escapeHtml(f.research)}
            </div>

            <button class="btn-audio-speak audio-kashmiri" style="margin-top:12px; width:100%;" onclick="window.playPronunciation('Flower ${escapeHtml(f.name)} blooming in ${escapeHtml(f.location)}')">
              🔊 Hear Flower Research Details
            </button>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  };

  // 12. Srinagar & Jammu Art & Craft Gallery Database
  const ART_CRAFT_GALLERY_DB = [
    {
      region: "Srinagar",
      craft: "Kashmiri Papier-Mâché Art (Sakhta & Naqashi)",
      gi: "GI Certified Craft",
      img: "assets/srinagar_papier_mache.jpg",
      desc: "Traditional paper-pulp molding (Sakhta) hand-painted with liquid gold leaf (Tilla) and intricate Chinar leaf, bird, and floral Hazara motifs by Srinagar master artisans.",
      mastery: "Practiced for over 600 years in Old Srinagar workshops (Zadibal & Rainawari)."
    },
    {
      region: "Srinagar",
      craft: "Kani Pashmina Loom Weaving",
      gi: "GI Certified Craft",
      img: "assets/kani_pashmina_loom.jpg",
      desc: "Loom weaving of Cashmere shawls using small wooden spools (Tuji) guided by coded color weave scripts (Talim) translated line by line by master weavers.",
      mastery: "Kanihama & Srinagar artisan guilds take 6 to 18 months to complete a single heirloom shawl."
    },
    {
      region: "Srinagar",
      craft: "Carved Walnut Woodware",
      gi: "GI Certified Craft",
      img: "assets/walnut_wood_carving.jpg",
      desc: "Deep 3D undercut relief carving on seasoned dark Kashmiri walnut wood featuring dragons, Chinar leaves, grapes, and lotus blossoms without artificial paints.",
      mastery: "Master woodcarvers use up to 40 specialized hand chisels and mallets."
    },
    {
      region: "Jammu",
      craft: "Basohli Miniature Painting (Kathua / Jammu)",
      gi: "GI Certified Art",
      img: "assets/basohli_miniature_art.jpg",
      desc: "World-famous Pahari miniature painting from Kathua/Basohli featuring intense mustard yellow and ochre colors, real beetle-wing jewel highlights, and expressive almond eyes.",
      mastery: "Patronized by Raja Kirpal Pal in the 17th century; now preserved under UNESCO heritage initiatives."
    },
    {
      region: "Jammu",
      craft: "Jammu Gold Tilla Leather Footwear (Juttis)",
      gi: "Traditional Heritage",
      img: "assets/basohli_miniature_art.jpg",
      desc: "Handcrafted leather footwear decorated with gold thread (Tilla) needlework and velvet lining by traditional cobbler guilds of Jammu and Samba.",
      mastery: "Popular wedding & festive footwear across Dogra heritage circles."
    }
  ];

  let craftRegionFilter = 'all';

  window.setCraftRegionFilter = function(region, btnEl) {
    craftRegionFilter = region;
    document.querySelectorAll('.craft-region-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    window.renderArtCraftGallery();
  };

  window.renderArtCraftGallery = function() {
    const container = document.getElementById('artCraftGalleryContainer');
    if (!container) return;

    let filtered = ART_CRAFT_GALLERY_DB.filter(c => {
      if (craftRegionFilter === 'all') return true;
      return c.region.toLowerCase() === craftRegionFilter.toLowerCase();
    });

    let html = `
      <div class="craft-controls-bar">
        <div class="craft-region-tabs">
          <button class="craft-region-btn active" onclick="window.setCraftRegionFilter('all', this)">🎨 All Crafts (Srinagar &amp; Jammu)</button>
          <button class="craft-region-btn" onclick="window.setCraftRegionFilter('srinagar', this)">🕌 Srinagar Master Crafts</button>
          <button class="craft-region-btn" onclick="window.setCraftRegionFilter('jammu', this)">🛕 Jammu Pahari Art</button>
        </div>
      </div>

      <div class="craft-gallery-grid">
    `;

    filtered.forEach(c => {
      const isSrinagar = c.region === 'Srinagar';
      const badgeStyle = isSrinagar ? 'background:#fdf8f4; color:#d96b1e; border:1px solid #f3d5bd;' : 'background:#f4f8fd; color:#1d4ed8; border:1px solid #bfdbfe;';

      html += `
        <div class="craft-card-creative">
          <div class="craft-img-wrap">
            <img src="${c.img}" alt="${escapeHtml(c.craft)}" class="craft-img" onerror="this.src='assets/srinagar_papier_mache.jpg'">
            <span class="craft-gi-badge">🏷️ ${escapeHtml(c.gi)}</span>
          </div>

          <div class="craft-card-body">
            <div class="craft-reg-row">
              <span class="craft-reg-title">📍 ${escapeHtml(c.region)} Region</span>
              <span class="craft-badge-pill" style="${badgeStyle}">${escapeHtml(c.region)} Heritage</span>
            </div>

            <h4 class="craft-name-title">${escapeHtml(c.craft)}</h4>
            <p class="craft-desc">${escapeHtml(c.desc)}</p>

            <div class="craft-mastery-box">
              <strong>📜 Guild Heritage:</strong> ${escapeHtml(c.mastery)}
            </div>

            <button class="btn-audio-speak audio-kashmiri" style="margin-top:12px; width:100%;" onclick="window.playPronunciation('Traditional craft ${escapeHtml(c.craft)} of ${escapeHtml(c.region)}')">
              🔊 Hear Craft Details
            </button>
          </div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  };

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderNH44Tracker();
    window.renderQuizWidget();
    renderCulinaryGlossary();
    window.renderFlashcardVault();
    window.renderPhrasebookTutor();
    window.renderDistrictFoodExplorer();
    window.renderFloralBloomExplorer();
    window.renderArtCraftGallery();
    if (document.getElementById('compareResultContainer')) {
      window.executeDistrictComparison();
    }
    if (document.getElementById('circuitDisplayBox')) {
      window.selectTravelCircuit('alpine', document.querySelector('.circuit-btn'));
    }
  });
})();
