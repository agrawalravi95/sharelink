var serverURL = "http://localhost:8081";
var URLToCheck = "Hello";

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function getTags() {
  var xhr = createCORSRequest('GET', serverURL + '/resources/tags');

  xhr.onload = function() {

    var tags = JSON.parse(xhr.response).tags,
        tagTypes = JSON.parse(xhr.response).types,
        tagsForm = document.forms['tagsForm'],
        tagsFormURLInput = tagsForm.elements["shareURL"],
        tagsSubmitButton = document.createElement('input');
        tagsSubmitButton.type = 'submit';
        tagsSubmitButton.value = "Add to Resources";
        tagsForm.action = serverURL + '/resources/add/';

    chrome.tabs.getSelected(null, function(tab) {
      tagsFormURLInput.value = tab.url;
    });

    for (var i = 0; i < tagTypes.length; i++) {
      var tagTypeDiv = document.createElement('div');
          tagTypeDiv.classList.add('tags-block');

      var tagTypeHeader = document.createElement('h3');
          tagTypeHeader.innerText = tagTypes[i].name;

          tagTypeDiv.appendChild(tagTypeHeader);

      for(var j = 0; j<tags.length; j++) {
        console.log(tags[j]);
        if(tags[j].type==tagTypes[i].name)
        {
          var tagInput = document.createElement('input');
              tagInput.classList.add('tag-checkbox');
              tagInput.type = 'checkbox';
              tagInput.id = tags[j].name.replace(' ', '_');
              tagInput.name = tags[j].name;
              tagInput.checked = false;

          var tagLabel = document.createElement('label');
              tagLabel.classList.add('tag-checkbox__label');
              tagLabel.innerText = tags[j].name;
              tagLabel.htmlFor = tags[j].name.replace(' ', '_');

          tagTypeDiv.appendChild(tagInput);
          tagTypeDiv.appendChild(tagLabel);
        }
      }
      tagsForm.appendChild(tagTypeDiv);
    }

    tagsForm.appendChild(tagsSubmitButton);
  }

  xhr.onerror = function() {
    console.error("Couldn't load tags cause of" + xhr.response);
  }

  xhr.send();
}

function checkResources() {

  chrome.tabs.getSelected(null, function(tab) {

    var xhr = createCORSRequest('GET', serverURL + '/resources/check/' + tab.url);

    xhr.onload = function() {

      console.log(xhr.response);

      if(xhr.response == 'Found') return;
      
      var oldResource = document.getElementById('old-resource'),
          newResource = document.getElementById('new-resource');

      newResource.style.display = 'none';
      oldResource.style.display = 'block';
    }  

    xhr.onerror = function() {
      console.error("Failed to check resource");
    }

    xhr.send();

  });

  // var xhr = createCORSRequest('GET', serverURL + '/resources/' + )
}

document.addEventListener('DOMContentLoaded', function() {

  getTags();
  checkResources();
}, false); 