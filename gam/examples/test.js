function createCodeOverlay(iframe) {
  var div = document.createElement('div');
  var rect = iframe.getBoundingClientRect();
  var parentDiv = iframe.closest('.code-section');
  var idSuffix = parentDiv.id.split('-')[1];

  div.style.position = 'absolute';
  div.style.top = window.scrollY + rect.top + 'px';
  div.style.left = window.scrollX + rect.left + 'px';
  div.style.width = iframe.offsetWidth + 'px';
  div.style.height = iframe.offsetHeight + 'px';
  div.style.backgroundColor = 'rgba(0, 0, 0, 0.15)';
  div.style.zIndex = '1000';
  div.setAttribute('id', 'code-' + idSuffix + '-overlay');

  document.body.appendChild(div);

  // Store references for resizing
  var resizeOverlay = function () {
    var rect = iframe.getBoundingClientRect();
    div.style.top = window.scrollY + rect.top + 'px';
    div.style.left = window.scrollX + rect.left + 'px';
    div.style.width = iframe.offsetWidth + 'px';
    div.style.height = iframe.offsetHeight + 'px';
  };

  // Resize overlay when window is resized
  window.addEventListener('resize', resizeOverlay);

  // Optionally, return a cleanup function to remove the event listener
  // when the overlay is no longer needed
  return function cleanup() {
    window.removeEventListener('resize', resizeOverlay);
  };
}

// Mutation observer callback to check for iframes
function observerCallback(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'IFRAME') {
          // If an iframe is added, create the div over it
          createCodeOverlay(node);
        }
      });
    }
  }
}

// Create an observer instance linked to the callback function
var observer = new MutationObserver(observerCallback);

// Start observing the document body for configured mutations
observer.observe(document.body, { childList: true, subtree: true });

// Event listener for button click to remove the div
var buttons = document.querySelectorAll('.submit-button');

buttons.forEach((button) => {
  button.addEventListener('click', function (e) {
    let exampleId = button.closest('.example').id.split('-')[1];
    let overlayId = 'code-' + exampleId + '-overlay';
    console.log(overlayId);
    removeOverlay(overlayId);

    // Disable the prediction input and enable the actual input
    var predictionInput = button
      .closest('.example')
      .querySelector('.prediction-section .input-element');
    var actualInput = button
      .closest('.example')
      .querySelector('.actual-section .input-element');
    if (predictionInput && actualInput) {
      predictionInput.disabled = true; // Disable the prediction input
      actualInput.disabled = false; // Enable the actual input
    }
  });
});

function removeOverlay(id) {
  var overlay = document.getElementById(id);
  console.log(overlay);
  if (overlay) {
    overlay.remove(); // Remove the overlay
  }
}
