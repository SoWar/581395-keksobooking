'use strict';

(function () {
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

  var displayActivePinPopup = function (pin) {
    if (pin.classList.contains('map__pin--main')) {
      return;
    }
    popupTemplate.classList.remove('hidden');
    var filledTemplate = fillAdvTemplate(popupTemplate, advertisings[pin.data]);
    insertPopupBefore.parentNode.insertBefore(filledTemplate, insertPopupBefore);
  };

  var closePopup = function () {
    popupTemplate.classList.add('hidden');
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };
})();
