/* eslint-disable @typescript-eslint/restrict-template-expressions */

function createSimilar(fields) {
  fetch('/api/similar', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteSimilar(fields) {
  fetch('/api/similar', {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

