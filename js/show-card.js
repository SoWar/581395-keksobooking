'use strict';

(function () {
  window.displayPopup = function (popup, insertBefore) {
    popup.classList.remove('hidden');
    insertBefore.parentNode.insertBefore(popup, insertBefore);
  };

})();
