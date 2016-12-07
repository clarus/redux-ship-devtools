window.addEventListener("message", function (event) {
  var data = event.data;
  if (typeof data === 'object' && data !== null &&
    data.type === 'ReduxShipDevtools' && data.version === 1
  ) {
    chrome.runtime.sendMessage(data.payload, function () {});
  }
}, false);
