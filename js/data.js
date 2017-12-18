'use strict';

(function () {
  var ESCAPE_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var OFFERTITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFERTYPE = ['flat', 'house', 'bungalo', 'palace'];
  var OFFERCHECKIN = ['12:00', '13:00', '14:00'];
  var OFFERCHECKOUT = ['12:00', '13:00', '14:00'];
  var OFFERFEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DICTTYPE = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
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
})();

