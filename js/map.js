'use strict';

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

var generateRandomArray = function (min, max) {
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

var avatarNumbers = generateRandomArray(1, 8);

var generateAdvertising = function () {
  var advertising = {
    author: {
      avatar: 'img/avatars/user' + '0' + avatarNumbers.pop() + '.png'
    },
    offer: {

    }
  };
};

/*
{
  "author": {
    "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где xx это число от 1 до 8 с ведущим нулем. Например 01, 02 и т. д. Адреса изображений не повторяются
  },

  "offer": {
    "title": строка, заголовок предложения, одно из фиксированных значений "Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде". Значения не должны повторяться.
    "address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"
    "price": число, случайная цена от 1000 до 1 000 000
    "type": строка с одним из трех фиксированных значений: flat, house или bungalo
    "rooms": число, случайное количество комнат от 1 до 5
    "guests": число, случайное количество гостей, которое можно разместить
    "checkin": строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00,
    "checkout": строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00
    "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
    "description": пустая строка,
    "photos": пустой массив
  },

  "location": {
    "x": случайное число, координата x метки на карте от 300 до 900,
    "y": случайное число, координата y метки на карте от 100 до 500
  }
}
*/
