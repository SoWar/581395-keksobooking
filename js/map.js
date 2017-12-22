'use strict';

(function () {
  var MAX_Y = 500;
  var MIN_Y = 100;
  var MAX_X = 1200;
  var MIN_X = 0;

  var onMainPinMouseUp = function () {
    window.form.activateFormFields();
    window.pin.displayLookAlikeAds();
    window.card.closePopup();
  };

  var onMainPinMouseDown = function (evnt) {
    evnt.preventDefault();

    var startCoords = {
      x: evnt.clientX,
      y: evnt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var y = mapPinMain.offsetTop - shift.y;
      if (y > MAX_Y) {
        y = MAX_Y;
      } else if (y < MIN_Y) {
        y = MIN_Y;
      }

      var x = mapPinMain.offsetLeft - shift.x;
      if (x > MAX_X) {
        x = MAX_X;
      } else if (x < MIN_X) {
        x = MIN_X;
      }

      mapPinMain.style.top = y + 'px';
      mapPinMain.style.left = x + 'px';

      window.form.displayPinCoordinates(x, y + window.pin.PIN_POINTER_SHIFT_Y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('mouseup', onMainPinMouseUp);
  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
})();

