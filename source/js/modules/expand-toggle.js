'use strict';

(function () {
  var toggle = document.querySelector('.js-expand-toggle');
  var parent = document.querySelector('.js-expand-parent');

  if (!toggle) {
    return;
  }

  var toggleText = toggle.querySelector('span');

  var onToggleClick = function (evt) {
    toggleText.textContent = '';
    parent.classList.toggle('is-open');

    toggleText.textContent = parent.classList.contains('is-open') ? 'Свернуть' : 'Развернуть';
  };

  toggle.addEventListener('click', onToggleClick);
})();
