'use strict';

var OFFERTITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFERTYPE = ['flat', 'house', 'bungalo'];
var OFFERCHECKIN = ['12:00', '13:00', '14:00'];
var OFFERCHECKOUT = ['12:00', '13:00', '14:00'];
var OFFERFEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DICTTYPE = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};


var getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

var generateRandomIntArray = function (min, max) {
  var randomArray = [];
  var nextNumber;
  while (randomArray.length <= max - min) {
    nextNumber = min + Math.floor(Math.random() * (max - min + 1));
    if (randomArray.indexOf(nextNumber) > -1) {
      continue;
    }
    randomArray[randomArray.length] = nextNumber;
  }
  return randomArray;
};

var getRandomSubset = function (elements) {
  var indx = generateRandomIntArray(0, getRandomNumber(1, elements.length) - 1);
  var subset = [];
  for (var i = 0; i < indx.length; i++) {
    subset[i] = elements[indx[i]];
  }
  return subset;
};

var generateAdvertising = function () {
  var x = getRandomNumber(300, 900);
  var y = getRandomNumber(100, 500);
  var advertising = {
    author: {
      avatar: 'img/avatars/user' + '0' + avatarNumbers.pop() + '.png'
    },
    offer: {
      title: OFFERTITLES[offerTitleIndex.pop()],
      address: x + ', ' + y,
      price: getRandomNumber(1e3, 1e6),
      type: OFFERTYPE[getRandomNumber(0, OFFERTYPE.length - 1)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(0, 10),
      checkin: OFFERCHECKIN[getRandomNumber(0, OFFERCHECKIN.length - 1)],
      checkout: OFFERCHECKOUT[getRandomNumber(0, OFFERCHECKOUT.length - 1)],
      features: getRandomSubset(OFFERFEATURES),
      description: '',
      photos: []
    },
    location: {
      x: x,
      y: y
    }
  };
  return advertising;
};

var getAdvertisings = function (number) {
  var ads = [];
  for (var i = 0; i < number; i++) {
    ads[i] = generateAdvertising();
  }
  return ads;
};

var createButtonFragment = function (id, advert) {
  var buttonElement = document.createElement('button');
  buttonElement.className = 'map__pin';
  buttonElement.style.left = advert.location.x + 'px';
  buttonElement.style.top = (advert.location.y - Math.round(44 / 2 + 18)) + 'px';
  buttonElement.data = id;

  var imgElement = document.createElement('img');
  imgElement.width = 40;
  imgElement.height = 40;
  imgElement.draggable = false;
  imgElement.src = advert.author.avatar;

  buttonElement.appendChild(imgElement);

  return buttonElement;
};

var fillAdvTemplate = function (template, advert) {
  // todo: correct variable usage
  // var temp = template.cloneNode(true);
  var temp = template;
  var pTags = temp.querySelectorAll('p');

  temp.querySelector('h3').textContent = advert.offer.title;
  pTags[0].textContent = advert.offer.address;
  temp.querySelector('.popup__price').textContent = advert.offer.price + '\u20bd/ночь';
  temp.querySelector('h4').textContent = DICTTYPE[advert.offer.type];
  pTags[2].textContent = advert.offer.rooms + ' комната для ' + advert.offer.guests + ' гостей';
  pTags[3].textContent = 'Заезд после ' + advert.offer.checkin + ' , выезд до ' + advert.offer.checkout;
  pTags[4].textContent = advert.offer.description;
  temp.querySelector('.popup__avatar').src = advert.author.avatar;

  var featureList = temp.querySelector('.popup__features');
  while (featureList.firstChild) {
    featureList.removeChild(featureList.firstChild);
  }

  for (var i = 0; i < advert.offer.features.length; i++) {
    var li = document.createElement('li');
    li.className = 'feature feature--' + advert.offer.features[i];
    featureList.appendChild(li);
  }
  return temp;
};

// Interactions
var deactivateFormFields = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }
};

var activateFormFields = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('form.notice__form').classList.remove('notice__form--disabled');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
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
    // todo: не вешать событие на главную кнопку
    mapPins[i].addEventListener('click', onMapPinClick);
  }
};

var setPinActive = function (pin) {
  var activePin = document.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
  pin.classList.add('map__pin--active');
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
};

// EventHandlers
var onMainPinMouseUp = function () {
  activateFormFields();
  displayLookAlikeAds();
  closePopup();
};

var onMapPinClick = function (event) {
  setPinActive(event.currentTarget);
  displayActivePinPopup(event.currentTarget);
};

var fieldsets = document.querySelectorAll('form.notice__form fieldset');
deactivateFormFields();

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mouseup', onMainPinMouseUp);

// глобальная переменная для всех pins
// var mapPins;

var avatarNumbers = generateRandomIntArray(1, 8);
var offerTitleIndex = generateRandomIntArray(0, OFFERTITLES.length - 1);
var advertisings = getAdvertisings(OFFERTITLES.length);

var popupTemplate = document.querySelector('template').content.querySelector('article.map__card');
// closePopup();
var insertPopupBefore = document.querySelector('.map__filters-container');


