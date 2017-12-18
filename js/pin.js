'use strict';

(function () {
  var createButtonFragment = function (id, advert) {
    var buttonElement = document.createElement('button');
    buttonElement.className = 'map__pin';
    buttonElement.style.left = advert.location.x + 'px';
    buttonElement.style.top = (advert.location.y - Math.round(44 / 2 + 18)) + 'px';
    buttonElement.data = id;
    buttonElement.tabIndex = 0;

    var imgElement = document.createElement('img');
    imgElement.width = 40;
    imgElement.height = 40;
    imgElement.draggable = false;
    imgElement.src = advert.author.avatar;

    buttonElement.appendChild(imgElement);

    return buttonElement;
  };

  var insertButtonsFragment = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < advertisings.length; i++) {
      fragment.appendChild(createButtonFragment(i, advertisings[i]));
    }

    document.querySelector('.map__pins').appendChild(fragment);
  };

  var displayLookAlikeAds = function () {
    insertButtonsFragment();
    var mapPins = document.querySelectorAll('.map__pin');

    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', onMapPinClick);
    // mapPins[i].addEventListener('keydown', onMapPinKeydown);
    }
  };

  var setPinActive = function (pin) {
  var activePin = document.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
  pin.classList.add('map__pin--active');
};
})();
