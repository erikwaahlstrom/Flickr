document.getElementById("getData").addEventListener("click", getData);

// Prinsts the response from Flickr REST-API

function getData() {
  fetch(
    "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=649e73c96231d2012dbac7bc57ea60fb&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(images) {
      let html = "";

      images.forEach(function(image) {
        html += `
        <p>${image}</p>
        `;
      });
      document.getElementById("output").innerHTML = html;
    })
    .catch(function(error) {
      console.log(error);
    });
}
