

(function () {
  var ESCAPE_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var DICTTYPE = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };


  var popupTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var buttonPopupClose = popupTemplate.querySelector('.popup__close');
  var insertPopupBefore = document.querySelector('.map__filters-container');

  var fillAdvTemplate = function (template, advert) {
    var pTags = template.querySelectorAll('p');

    template.querySelector('h3').textContent = advert.offer.title;
    pTags[0].textContent = advert.offer.address;
    template.querySelector('.popup__price').textContent = advert.offer.price + '\u20bd/ночь';
    template.querySelector('h4').textContent = DICTTYPE[advert.offer.type];
    pTags[2].textContent = advert.offer.rooms + ' комната для ' + advert.offer.guests + ' гостей';
    pTags[3].textContent = 'Заезд после ' + advert.offer.checkin + ' , выезд до ' + advert.offer.checkout;
    pTags[4].textContent = advert.offer.description;
    template.querySelector('.popup__avatar').src = advert.author.avatar;

    var featureList = template.querySelector('.popup__features');
    while (featureList.firstChild) {
      featureList.removeChild(featureList.firstChild);
    }

    for (var i = 0; i < advert.offer.features.length; i++) {
      var li = document.createElement('li');
      li.className = 'feature feature--' + advert.offer.features[i];
      featureList.appendChild(li);
    }
    return template;
  };

  var onPopupCloseClick = function () {
    window.card.closePopup();
  };

  var onPopupCloseKeydown = function (evnt) {
    if (evnt.keyCode === ENTER_KEYCODE) {
      window.card.closePopup();
    }
  };

  var onEscapeKeydown = function (evnt) {
    if (evnt.keyCode === ESCAPE_KEYCODE) {
      window.card.closePopup();
    }
  };

  buttonPopupClose.addEventListener('click', onPopupCloseClick);
  buttonPopupClose.addEventListener('keydown', onPopupCloseKeydown);
  document.addEventListener('keydown', onEscapeKeydown);

  window.card = {
    closePopup: function () {
      popupTemplate.classList.add('hidden');
      var activePin = document.querySelector('.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
    },
    displayActivePinPopup: function (pin) {
      if (pin.classList.contains('map__pin--main')) {
        return;
      }
      var filledTemplate = fillAdvTemplate(popupTemplate, window.data.advertisings[pin.data]);
      window.displayPopup(filledTemplate, insertPopupBefore);
    }
  };
})();
