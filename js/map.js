'use strict';

// EventHandlers
var onMainPinMouseUp = function () {
  window.form.activateFormFields();
  window.pin.displayLookAlikeAds();
  window.card.closePopup();
};

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mouseup', onMainPinMouseUp);

