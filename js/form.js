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

  var changeMinResidencePrice = function (type) {
    var inputPrice = document.querySelector('#price');
    inputPrice.min = MIN_PRICE_RESIDENCE[type];
    inputPrice.placeholder = MIN_PRICE_RESIDENCE[type];
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
        item.selected = item.value === CAPACITY_RULES[roomsNumber][0];
        temp.appendChild(item.cloneNode(true));
      }
    });

    inputCapacity.appendChild(temp);
  };

  var fieldsets = document.querySelectorAll('form.notice__form fieldset');

  window.form = {
    activateFormFields: function () {
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('form.notice__form').classList.remove('notice__form--disabled');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = false;
      }
    }
  };

  var onResidenceTypeSelect = function (evnt) {
    changeMinResidencePrice(evnt.target.selectedOptions[0].value);
  };

  var onTimeInOutChange = function (evnt) {
    syncInOutTime(evnt.target);
  };

  var onRoomNumberChange = function (evnt) {
    setActiveCapacityOptions(evnt.target.selectedOptions[0].value);
  };

  var inputResidenceType = document.querySelector('#type');
  inputResidenceType.addEventListener('change', onResidenceTypeSelect);
  changeMinResidencePrice(inputResidenceType.selectedOptions[0].value);

  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');
  inputTimeIn.addEventListener('change', onTimeInOutChange);
  inputTimeOut.addEventListener('change', onTimeInOutChange);

  var inputRoomNumber = document.querySelector('#room_number');
  inputRoomNumber.addEventListener('change', onRoomNumberChange);

  var inputCapacity = document.querySelector('#capacity');
  var inputCapacityClone = inputCapacity.cloneNode(true);
  inputCapacityClone.querySelector('option[selected]').removeAttribute('selected');
  setActiveCapacityOptions(inputRoomNumber.selectedOptions[0].value);

})();
