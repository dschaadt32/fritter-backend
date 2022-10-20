/* eslint-disable @typescript-eslint/restrict-template-expressions */

function createExpand(fields) {
  fetch('/api/expand', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editExpand(fields) {
  fetch('/api/expand', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteExpand(fields) {
  fetch('/api/expand', {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

