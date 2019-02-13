export default class TemplateGallery {
  static home(_link, _size) {
    document.querySelector(".gallery ul").insertAdjacentHTML(
      "beforeend",
      `
    <li style="max-width:${_size}px">
      <div class="bg-photos" style="background-image: url(${_link})"></div>
    </li>`
    );
  }
  // Callback function from main.js. grabs .gallery ul and makes it return nothing. cleans the ul.
  static cleanContent() {
    document.querySelector(".gallery ul").innerHTML = null;
  }

  // _message = error message from main.js
  static error(_message) {
    document
      .querySelector(".gallery ul")
      .insertAdjacentHTML(
        "beforeend",
        `<h1 class="alert-no-results">${_message}</h1>`
      );
  }
}
