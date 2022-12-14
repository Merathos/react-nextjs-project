'use strict';


(function () {
  var header = document.querySelector('.js-page-header');

  if (!header) {
    return;
  }

  var headerBar = header.querySelector('.js-page-header__bar');

  var adjustHeaderAppearance = function () {
    if (document.documentElement.clientWidth >= window.var.resolution.DESKTOP && window.pageYOffset > 0) {
      header.classList.add('page-header--above-content');
      // header.style.top = -headerBar.offsetHeight + 'px';
    } else {
      header.classList.remove('page-header--above-content');
      // header.style.top = 0;
    }
  };

  var adjustPageContentTopPadding = function () {
    document.body.style.paddingTop = header.offsetHeight + 'px';
  };


  var onWindowResize = function () {
    header.classList.remove('page-header--above-content');

    adjustPageContentTopPadding();
    adjustHeaderAppearance();
  };


  header.classList.add('page-header--js');

  adjustPageContentTopPadding();
  adjustHeaderAppearance();


  document.addEventListener('scroll', adjustHeaderAppearance);
  window.addEventListener('resize', onWindowResize);


  window.adjustPageContentTopPadding = adjustPageContentTopPadding;
})();
