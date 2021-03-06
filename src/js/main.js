import Gallery from "./gallery";
import Util from "./util";
import TemplateGallery from "./gallery_template";

// waiting for the page loading
// When page loads the API ket is set and the searchform is selected with querySelector. Then when the searchbutton is clicked the eventhandler starts. The searchInput is selected with the querySelector + value in a variable. Then we check if the searchInput is not equal to '' we return a function callback from TemplateGallery component. grabs .gallery ul and makes it return nothing. cleans the ul then sends the apikey and search input value from main.js to gallery.js.
// if the search box is empty return => clean ul
window.addEventListener("load", () => {
  Util.startTime();
  // API KEY
  const apiKey = "aad79acb002d2bcdbfce37406f478e6f";
  const defaultSearchInput = document.querySelector(".searchInput").value;
  if (defaultSearchInput) {
    TemplateGallery.cleanContent();
    Gallery.getInstance(apiKey, defaultSearchInput);
  } else {
    TemplateGallery.cleanContent();
    TemplateGallery.error(
      `You haven't searched for anything specific. Please enter a input value in the search form`
    );
  }
  const searchForm = document
    .querySelector(".searchForm")
    .addEventListener("submit", e => {
      e.preventDefault();
      const searchInput = document.querySelector(".searchInput").value;
      if (searchInput) {
        TemplateGallery.cleanContent();
        Gallery.getInstance(apiKey, searchInput);
      } else {
        TemplateGallery.cleanContent();
        TemplateGallery.error(
          `Ajdå! Det verkar som att du råkat söka utan att ange något i sökfältet. Prova igen!`
        );
      }
    });
});
