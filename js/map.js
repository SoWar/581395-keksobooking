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

var createButtonFragment = function (advert) {
  var buttonElement = document.createElement('button');
  buttonElement.className = 'map__pin';
  buttonElement.style.left = advert.location.x + 'px';
  buttonElement.style.top = (advert.location.y - Math.round(44 / 2 + 18)) + 'px';

  var imgElement = document.createElement('img');
  imgElement.width = 40;
  imgElement.height = 40;
  imgElement.draggable = false;
  imgElement.src = advert.author.avatar;

  buttonElement.appendChild(imgElement);

  return buttonElement;
};

var fillAdvTemplate = function (template, advert) {
  var temp = template.cloneNode(true);

  temp.querySelector('h3').textContent = advert.offer.title;
  temp.querySelector('p').textContent = advert.offer.address;
  temp.querySelector('.popup__price').textContent = advert.offer.price + '\u20bd/ночь';
  temp.querySelector('h4').textContent = DICTTYPE[advert.offer.type];
  temp.querySelectorAll('p')[2].textContent = advert.offer.rooms + ' комната для ' +  advert.offer.guests + ' гостей';
  temp.querySelectorAll('p')[3].textContent = 'Заезд после ' + advert.offer.checkin + ' , выезд до ' + advert.offer.checkout;
  temp.querySelectorAll('p')[4].textContent = advert.offer.description;
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

var avatarNumbers = generateRandomIntArray(1, 8);
var checkinIndex = generateRandomIntArray(0, OFFERCHECKIN.length - 1);
var checkoutIndex = generateRandomIntArray(0, OFFERCHECKOUT.length - 1);
var offerTitleIndex = generateRandomIntArray(0, OFFERTITLES.length - 1);
var advertisings = getAdvertisings(OFFERTITLES.length);

var tagMap = document.querySelector('section.map');
tagMap.classList.remove('map--faded');

var fragment = document.createDocumentFragment();

for (var i = 0; i < advertisings.length; i++) {
  fragment.appendChild(createButtonFragment(advertisings[i]));
}

var tagToInsert = document.querySelector('.map__pins');
tagToInsert.appendChild(fragment);

var template = document.getElementsByTagName('template')[0].content.querySelector('article.map__card');
var insertBeforeElement = document.querySelector('.map__filters-container');
var filledTemlate = fillAdvTemplate(template, advertisings[0]);

insertBeforeElement.parentNode.insertBefore(filledTemlate, insertBeforeElement);

