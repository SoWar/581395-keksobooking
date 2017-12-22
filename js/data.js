'use strict';

(function () {

  var loadAds = function (ads) {
    window.data = {
      advertisings: ads
    };
  };

  var displayErrorPopup = function (errorMsg) {
    errorPopupTemplate.querySelector('.error__popup--message').textContent = errorMsg;
    document.body.insertAdjacentElement('afterbegin', errorPopupTemplate);

    var errClose = errorPopupTemplate.querySelector('.error__popup--close');
    errClose.addEventListener('click', function () {
      document.body.removeChild(errorPopupTemplate);
    });
  };

  var errorPopupTemplate = document.querySelector('template.error__template').content.querySelector('div.error__popup');

  window.backend.load(loadAds, displayErrorPopup);

  window.data = {
    displayErrorPopup: displayErrorPopup
  };

})();

