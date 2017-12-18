'use strict';

(function () {
  var MIN_PRICE_RESIDENCE = {
    flat: 1000,
    house: 5000,
    bungalo: 0,
    palace: 10000
  };
  var CAPACITY_RULES = {
    '3': ['3', '2', '1'],
    '2': ['2', '1'],
    '1': ['1'],
    '100': ['0']
  };

  var activateFormFields = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('form.notice__form').classList.remove('notice__form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  };

  var changeMinResidencePrice = function (type) {
    var inputPrice = document.querySelector('#price');
    inputPrice.min = MIN_PRICE_RESIDENCE[type];
  };

  var syncInOutTime = function (target) {
    if (target.id === 'timein') {
      inputTimeOut.selectedIndex = target.selectedIndex;
    } else {
      inputTimeIn.selectedIndex = target.selectedIndex;
    }
  };

  var setActiveCapacityOptions = function (roomsNumber) {

    while (inputCapacity.firstChild) {
      inputCapacity.removeChild(inputCapacity.firstChild);
    }

    var temp = document.createDocumentFragment();

    [].forEach.call(inputCapacityClone.children, function (item) {
      if (CAPACITY_RULES[roomsNumber].indexOf(item.value) > -1) {
        item.selected = item.value === CAPACITY_RULES[roomsNumber][0] ? true : false;
        temp.appendChild(item.cloneNode(true));
      }
    });

    inputCapacity.appendChild(temp);
  };
})();
