'use strict';

// var ESCAPE_KEYCODE = 27;
// var ENTER_KEYCODE = 13;
// var OFFERTITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
//   'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
//   'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
// var OFFERTYPE = ['flat', 'house', 'bungalo', 'palace'];
// var OFFERCHECKIN = ['12:00', '13:00', '14:00'];
// var OFFERCHECKOUT = ['12:00', '13:00', '14:00'];
// var OFFERFEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var DICTTYPE = {
//   flat: 'Квартира',
//   house: 'Дом',
//   bungalo: 'Бунгало',
//   palace: 'Дворец'
// };
// var MIN_PRICE_RESIDENCE = {
//   flat: 1000,
//   house: 5000,
//   bungalo: 0,
//   palace: 10000
// };
// var CAPACITY_RULES = {
//   '3': ['3', '2', '1'],
//   '2': ['2', '1'],
//   '1': ['1'],
//   '100': ['0']
// };


// var getRandomNumber = function (min, max) {
//   return min + Math.floor(Math.random() * (max - min + 1));
// };
//
// var generateRandomIntArray = function (min, max) {
//   var randomArray = [];
//   var nextNumber;
//   while (randomArray.length <= max - min) {
//     nextNumber = min + Math.floor(Math.random() * (max - min + 1));
//     if (randomArray.indexOf(nextNumber) > -1) {
//       continue;
//     }
//     randomArray[randomArray.length] = nextNumber;
//   }
//   return randomArray;
// };
//
// var getRandomSubset = function (elements) {
//   var indx = generateRandomIntArray(0, getRandomNumber(1, elements.length) - 1);
//   var subset = [];
//   for (var i = 0; i < indx.length; i++) {
//     subset[i] = elements[indx[i]];
//   }
//   return subset;
// };

// var generateAdvertising = function () {
//   var x = getRandomNumber(300, 900);
//   var y = getRandomNumber(100, 500);
//   var advertising = {
//     author: {
//       avatar: 'img/avatars/user' + '0' + avatarNumbers.pop() + '.png'
//     },
//     offer: {
//       title: OFFERTITLES[offerTitleIndex.pop()],
//       address: x + ', ' + y,
//       price: getRandomNumber(1e3, 1e6),
//       type: OFFERTYPE[getRandomNumber(0, OFFERTYPE.length - 1)],
//       rooms: getRandomNumber(1, 5),
//       guests: getRandomNumber(0, 10),
//       checkin: OFFERCHECKIN[getRandomNumber(0, OFFERCHECKIN.length - 1)],
//       checkout: OFFERCHECKOUT[getRandomNumber(0, OFFERCHECKOUT.length - 1)],
//       features: getRandomSubset(OFFERFEATURES),
//       description: '',
//       photos: []
//     },
//     location: {
//       x: x,
//       y: y
//     }
//   };
//   return advertising;
// };

// var getAdvertisings = function (number) {
//   var ads = [];
//   for (var i = 0; i < number; i++) {
//     ads[i] = generateAdvertising();
//   }
//   return ads;
// };

// var createButtonFragment = function (id, advert) {
//   var buttonElement = document.createElement('button');
//   buttonElement.className = 'map__pin';
//   buttonElement.style.left = advert.location.x + 'px';
//   buttonElement.style.top = (advert.location.y - Math.round(44 / 2 + 18)) + 'px';
//   buttonElement.data = id;
//   buttonElement.tabIndex = 0;
//
//   var imgElement = document.createElement('img');
//   imgElement.width = 40;
//   imgElement.height = 40;
//   imgElement.draggable = false;
//   imgElement.src = advert.author.avatar;
//
//   buttonElement.appendChild(imgElement);
//
//   return buttonElement;
// };

// var fillAdvTemplate = function (template, advert) {
//   var pTags = template.querySelectorAll('p');
//
//   template.querySelector('h3').textContent = advert.offer.title;
//   pTags[0].textContent = advert.offer.address;
//   template.querySelector('.popup__price').textContent = advert.offer.price + '\u20bd/ночь';
//   template.querySelector('h4').textContent = DICTTYPE[advert.offer.type];
//   pTags[2].textContent = advert.offer.rooms + ' комната для ' + advert.offer.guests + ' гостей';
//   pTags[3].textContent = 'Заезд после ' + advert.offer.checkin + ' , выезд до ' + advert.offer.checkout;
//   pTags[4].textContent = advert.offer.description;
//   template.querySelector('.popup__avatar').src = advert.author.avatar;
//
//   var featureList = template.querySelector('.popup__features');
//   while (featureList.firstChild) {
//     featureList.removeChild(featureList.firstChild);
//   }
//
//   for (var i = 0; i < advert.offer.features.length; i++) {
//     var li = document.createElement('li');
//     li.className = 'feature feature--' + advert.offer.features[i];
//     featureList.appendChild(li);
//   }
//   return template;
// };

// Interactions
// var activateFormFields = function () {
//   document.querySelector('.map').classList.remove('map--faded');
//   document.querySelector('form.notice__form').classList.remove('notice__form--disabled');
//   for (var i = 0; i < fieldsets.length; i++) {
//     fieldsets[i].disabled = false;
//   }
// };

// var insertButtonsFragment = function () {
//   var fragment = document.createDocumentFragment();
//
//   for (var i = 0; i < advertisings.length; i++) {
//     fragment.appendChild(createButtonFragment(i, advertisings[i]));
//   }
//
//   document.querySelector('.map__pins').appendChild(fragment);
// };

// var displayLookAlikeAds = function () {
//   insertButtonsFragment();
//   var mapPins = document.querySelectorAll('.map__pin');
//
//   for (var i = 0; i < mapPins.length; i++) {
//     mapPins[i].addEventListener('click', onMapPinClick);
//   }
// };

// var setPinActive = function (pin) {
//   var activePin = document.querySelector('.map__pin--active');
//   if (activePin) {
//     activePin.classList.remove('map__pin--active');
//   }
//   pin.classList.add('map__pin--active');
// };

// var displayActivePinPopup = function (pin) {
//   if (pin.classList.contains('map__pin--main')) {
//     return;
//   }
//   popupTemplate.classList.remove('hidden');
//   var filledTemplate = fillAdvTemplate(popupTemplate, advertisings[pin.data]);
//   insertPopupBefore.parentNode.insertBefore(filledTemplate, insertPopupBefore);
// };
//
// var closePopup = function () {
//   popupTemplate.classList.add('hidden');
//   var activePin = document.querySelector('.map__pin--active');
//   if (activePin) {
//     activePin.classList.remove('map__pin--active');
//   }
// };

// var changeMinResidencePrice = function (type) {
//   var inputPrice = document.querySelector('#price');
//   inputPrice.min = MIN_PRICE_RESIDENCE[type];
//   inputPrice.placeholder = MIN_PRICE_RESIDENCE[type];
// };
//
// var syncInOutTime = function (target) {
//   if (target.id === 'timein') {
//     inputTimeOut.selectedIndex = target.selectedIndex;
//   } else {
//     inputTimeIn.selectedIndex = target.selectedIndex;
//   }
// };

// var setActiveCapacityOptions = function (roomsNumber) {
//
//   while (inputCapacity.firstChild) {
//     inputCapacity.removeChild(inputCapacity.firstChild);
//   }
//
//   var temp = document.createDocumentFragment();
//
//   [].forEach.call(inputCapacityClone.children, function (item) {
//     if (CAPACITY_RULES[roomsNumber].indexOf(item.value) > -1) {
//       item.selected = item.value === CAPACITY_RULES[roomsNumber][0] ? true : false;
//       temp.appendChild(item.cloneNode(true));
//     }
//   });
//
//   inputCapacity.appendChild(temp);
// };

// EventHandlers
var onMainPinMouseUp = function () {
  window.form.activateFormFields();
  window.pin.displayLookAlikeAds();
  window.card.closePopup();
};

// var onMapPinClick = function (evnt) {
//   window.pin.setPinActive(evnt.currentTarget);
//   displayActivePinPopup(evnt.currentTarget);
// };

// var onPopupCloseClick = function () {
//   closePopup();
// };
//
// var onPopupCloseKeydown = function (evnt) {
//   if (evnt.keyCode === ENTER_KEYCODE) {
//     closePopup();
//   }
// };
//
// var onEscapeKeydown = function (evnt) {
//   if (evnt.keyCode === ESCAPE_KEYCODE) {
//     closePopup();
//   }
// };

// var onResidenceTypeSelect = function (evnt) {
//   changeMinResidencePrice(evnt.target.selectedOptions[0].value);
// };
//
// var onTimeInOutChange = function (evnt) {
//   syncInOutTime(evnt.target);
// };
//
// var onRoomNumberChange = function (evnt) {
//   setActiveCapacityOptions(evnt.target.selectedOptions[0].value);
// };

// var fieldsets = document.querySelectorAll('form.notice__form fieldset');

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mouseup', onMainPinMouseUp);

// var avatarNumbers = generateRandomIntArray(1, 8);
// var offerTitleIndex = generateRandomIntArray(0, OFFERTITLES.length - 1);
// var advertisings = getAdvertisings(OFFERTITLES.length);

// var popupTemplate = document.querySelector('template').content.querySelector('article.map__card');
// var insertPopupBefore = document.querySelector('.map__filters-container');

// var buttonPopupClose = popupTemplate.querySelector('.popup__close');
// buttonPopupClose.addEventListener('click', onPopupCloseClick);
// buttonPopupClose.addEventListener('keydown', onPopupCloseKeydown);
// document.addEventListener('keydown', onEscapeKeydown);

// var inputResidenceType = document.querySelector('#type');
// inputResidenceType.addEventListener('change', onResidenceTypeSelect);
// changeMinResidencePrice(inputResidenceType.selectedOptions[0].value);
//
// var inputTimeIn = document.querySelector('#timein');
// var inputTimeOut = document.querySelector('#timeout');
// inputTimeIn.addEventListener('change', onTimeInOutChange);
// inputTimeOut.addEventListener('change', onTimeInOutChange);
//
// var inputRoomNumber = document.querySelector('#room_number');
// inputRoomNumber.addEventListener('change', onRoomNumberChange);
//
// var inputCapacity = document.querySelector('#capacity');
// var inputCapacityClone = inputCapacity.cloneNode(true);
// inputCapacityClone.querySelector('option[selected]').removeAttribute('selected');
// setActiveCapacityOptions(inputRoomNumber.selectedOptions[0].value);

