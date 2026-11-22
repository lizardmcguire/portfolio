// Work dropdown.
// - Mouse: opens on hover; clicking "Work" goes to the Work page.
// - Touch: first tap on "Work" opens the list, a second tap goes to the Work page.
// - Keyboard: opens when tabbing into it; Escape closes it.
(function () {
  var wrap = document.querySelector('.nav-work');
  if (!wrap) return;
  var trigger = wrap.querySelector('.nav-trigger');
  var touchTap = false;
  var wasOpen = false;

  function isOpen() { return wrap.classList.contains('open'); }
  function setOpen(open) {
    wrap.classList.toggle('open', open);
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  wrap.addEventListener('pointerenter', function (e) {
    if (e.pointerType === 'mouse') setOpen(true);
  });
  wrap.addEventListener('pointerleave', function (e) {
    if (e.pointerType === 'mouse') setOpen(false);
  });

  trigger.addEventListener('pointerdown', function (e) {
    touchTap = e.pointerType !== 'mouse';
    wasOpen = isOpen();
  });
  trigger.addEventListener('click', function (e) {
    if (touchTap && !wasOpen) {
      e.preventDefault();
      setOpen(true);
    }
    touchTap = false;
  });

  wrap.addEventListener('focusin', function () { setOpen(true); });
  wrap.addEventListener('focusout', function (e) {
    if (!wrap.contains(e.relatedTarget)) setOpen(false);
  });
  document.addEventListener('pointerdown', function (e) {
    if (!wrap.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) {
      setOpen(false);
      trigger.focus();
    }
  });
})();
