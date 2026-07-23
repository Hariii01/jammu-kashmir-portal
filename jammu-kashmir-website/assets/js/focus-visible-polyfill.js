// Simple focus-visible polyfill for older browsers
// Adds "focus-visible-polyfill" class to elements focused via keyboard (Tab)
(function(){
  if ('hasOwnProperty' in Element.prototype && 'matches' in Element.prototype) {
    // basic environment check — proceed
  }

  var usingKeyboard = false;

  function onKeyDown(e){
    if (e.key === 'Tab' || e.keyCode === 9) {
      usingKeyboard = true;
      document.documentElement.classList.add('using-keyboard');
    }
  }

  function onPointerDown(){
    usingKeyboard = false;
    document.documentElement.classList.remove('using-keyboard');
  }

  function onFocusIn(e){
    try{
      if (usingKeyboard && e.target) {
        e.target.classList.add('focus-visible-polyfill');
      }
    }catch(err){}
  }

  function onFocusOut(e){
    try{ if(e.target) e.target.classList.remove('focus-visible-polyfill'); }catch(err){}
  }

  window.addEventListener('keydown', onKeyDown, true);
  window.addEventListener('mousedown', onPointerDown, true);
  window.addEventListener('pointerdown', onPointerDown, true);
  window.addEventListener('touchstart', onPointerDown, true);
  document.addEventListener('focusin', onFocusIn, true);
  document.addEventListener('focusout', onFocusOut, true);

  // expose for debugging
  try{ window.__focusVisiblePolyfill = {isKeyboard: function(){return usingKeyboard;}} }catch(e){}
})();