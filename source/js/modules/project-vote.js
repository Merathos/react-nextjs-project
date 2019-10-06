'use strict';

(function () {
  var vote = document.querySelector('.project-vote');
  var popup = document.querySelector('.vote-popup');

  if (!vote || !popup) {
    return;
  }


  var submitForm = vote.querySelector('.project-vote__submit-form form');
  var revokeBtn = vote.querySelector('.project-vote__revoke-btn');

  var popupBtn = popup.querySelector('.vote-popup__revoke-btn');

  var popupShownTimeout = null;

  var approveValue = +vote.querySelector('.vote-results__value--approve').textContent.replace(/\s+/g, '');
  var rejectValue = +vote.querySelector('.vote-results__value--reject').textContent.replace(/\s+/g, '');

  var scaleIndicator = vote.querySelector('.vote-results__indicator');


  var onSubmitFormClick = function (evt) {
    if (evt.target.classList.contains('project-vote__vote-btn') && !evt.target.classList.contains('project-vote__vote-btn--selected')) {
      vote.classList.add('project-vote--voted');
      evt.target.classList.add('project-vote__vote-btn--selected');

      vote.querySelector('input').dispatchEvent(new Event('change'));

      popup.classList.add('vote-popup--shown');

      popupShownTimeout = setTimeout(function () {
        popup.classList.remove('vote-popup--shown');
      }, 5000);
    }
  };

  var revokeVote = function (evt) {
    evt.preventDefault();

    vote.classList.remove('project-vote--voted');

    submitForm.querySelector('.project-vote__vote-btn--selected').classList.remove('project-vote__vote-btn--selected');
    submitForm.reset();

    popup.classList.remove('vote-popup--shown');
    clearTimeout(popupShownTimeout);
  };


  vote.classList.add('project-page__vote--js', 'project-vote--js');

  scaleIndicator.style.width = Math.trunc(approveValue / (approveValue + rejectValue) * 100) + '%';

  new Sticky('.project-page__vote');

  submitForm.addEventListener('click', onSubmitFormClick);
  revokeBtn.addEventListener('click', revokeVote);
  popupBtn.addEventListener('click', revokeVote);
})();
