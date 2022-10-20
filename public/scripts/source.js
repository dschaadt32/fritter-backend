/* eslint-disable @typescript-eslint/restrict-template-expressions */

function createSource(fields) {
  fetch('/api/source', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editSource(fields) {
  fetch('/api/source', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteSource(fields) {
  fetch('/api/source', {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

