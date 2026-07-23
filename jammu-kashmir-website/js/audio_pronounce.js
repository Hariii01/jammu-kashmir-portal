/**
 * Jammu & Kashmir Text-to-Speech & Audio Pronunciation Engine
 * Allows users to listen to audio pronunciations for Kashmiri, Dogri & Vedic terms.
 */
(function() {
  function speakTerm(text, langHint) {
    if (!('speechSynthesis' in window)) {
      alert("Audio speech synthesis is not supported in your browser.");
      return;
    }

    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;

    // Pick Hindi or Indian English voice if available
    const voices = window.speechSynthesis.getVoices();
    const inVoice = voices.find(v => v.lang === 'hi-IN' || v.lang === 'en-IN');
    if (inVoice) {
      utterance.voice = inVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  window.playPronunciation = function(term) {
    speakTerm(term);
  };

  // Automatically add audio buttons to term elements with data-pronounce attribute
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-pronounce]').forEach(el => {
      const term = el.getAttribute('data-pronounce') || el.textContent.trim();
      const btn = document.createElement('button');
      btn.className = 'btn-audio-pronounce';
      btn.innerHTML = '🔊 Listen';
      btn.title = `Listen to audio pronunciation of '${term}'`;
      btn.onclick = (e) => {
        e.stopPropagation();
        speakTerm(term);
      };
      el.appendChild(btn);
    });
  });
})();
