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
  var TIME_INOUT = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };

  var changeMinResidencePrice = function (target, value) {
    inputPrice.min = value;
    inputPrice.placeholder = value;
  };

  var syncInOutTime = function (target, value) {
    target.value = value;
  };

  var setActiveCapacityOptions = function (inputCapacity, validOptions) {

    while (inputCapacity.firstChild) {
      inputCapacity.removeChild(inputCapacity.firstChild);
    }

    var docFragment = document.createDocumentFragment();

    [].forEach.call(inputCapacityClone.children, function (option) {
      if (validOptions.indexOf(option.value) > -1) {
        option.selected = option.value === validOptions[0];
        docFragment.appendChild(option.cloneNode(true));
      }
    });

    inputCapacity.appendChild(docFragment);
  };

  var fieldsets = document.querySelectorAll('form.notice__form fieldset');

  var onResidenceTypeSelect = function () {
    window.synchronizeFields(inputResidenceType, inputPrice, MIN_PRICE_RESIDENCE, changeMinResidencePrice);
  };

  var onTimeInChange = function () {
    window.synchronizeFields(inputTimeIn, inputTimeOut, TIME_INOUT, syncInOutTime);
  };

  var onTimeOutChange = function () {
    window.synchronizeFields(inputTimeOut, inputTimeIn, TIME_INOUT, syncInOutTime);
  };

  var onRoomNumberChange = function () {
    window.synchronizeFields(inputRoomNumber, inputCapacity, CAPACITY_RULES, setActiveCapacityOptions);
  };

  var initialFormSync = function () {
    window.synchronizeFields(inputResidenceType, inputPrice, MIN_PRICE_RESIDENCE, changeMinResidencePrice);
    window.synchronizeFields(inputTimeIn, inputTimeOut, TIME_INOUT, syncInOutTime);
    window.synchronizeFields(inputRoomNumber, inputCapacity, CAPACITY_RULES, setActiveCapacityOptions);
  };

  var inputResidenceType = document.querySelector('#type');
  inputResidenceType.addEventListener('change', onResidenceTypeSelect);
  var inputPrice = document.querySelector('#price');

  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');
  inputTimeIn.addEventListener('change', onTimeInChange);
  inputTimeOut.addEventListener('change', onTimeOutChange);

  var inputRoomNumber = document.querySelector('#room_number');
  inputRoomNumber.addEventListener('change', onRoomNumberChange);

  var inputCapacity = document.querySelector('#capacity');
  var inputCapacityClone = inputCapacity.cloneNode(true);
  inputCapacityClone.querySelector('option[selected]').removeAttribute('selected');

  var addressField = document.querySelector('#address');

  initialFormSync();

  window.form = {
    activateFormFields: function () {
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('form.notice__form').classList.remove('notice__form--disabled');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = false;
      }
    },
    displayPinCoordinates: function (x, y) {
      addressField.value = 'x:' + x + ', y:' + y;
    }
  };
})();
