import TemplateGallery from "./gallery_template";
import Util from "./util";
import "babel-polyfill";
export default class Gallery {
  //  getInstance = function from main.js

  // _apiKey = parameter from main.js example: '12314u34'

  // _search = parameter from main.js example: 'dogs'

  // Om INTE class Gallery har en påbörjad instans (returnera en ny instans med parametrarna _apiKey & _search).

  // Om class Gallery HAR en påbörjad instans (rensa bort all content och påbörja en ny request).

  static getInstance(_apiKey, _search) {
    if (!Gallery._instance) {
      Gallery._instance = new Gallery(_apiKey, _search);
      return Gallery._instance;
    } else {
      TemplateGallery.cleanContent();
      Gallery._instance = new Gallery(_apiKey, _search);
      return Gallery._instance;
    }
  }

  // Skapar en instans av Gallery.
  constructor(_apiKey, _search) {
    // Global konfiguering. 'defaultvärden'.
    this.apiKey = `&api_key=${_apiKey}`;
    this.searchInput = _search;
    this.format = "&format=json&nojsoncallback=1";
    this.photos = 0;
    this.search(); // Search funktion som körs varje gång en instans av Gallery 'körs'.
  }
  /**
   * @param {API Methods} _method
   * @param {any parameters from the API} _params
   * @return data from the call
   */

  //  Hämta data från API. Datan består av bland annat metoderna (ex: 'flickr.photos.search') och parametrarna (ex: '&text=Blue mountains&per_page=9&safe_search=3&content_type=1')
  async apiRequest(_method, ..._params) {
    const params = [];
    params.push(..._params);
    const apiParams = params.join("");
    try {
      const flickrApi = await fetch(`
      https://api.flickr.com/services/rest/?method=${_method}${
        this.apiKey
      }${apiParams}${this.format}`);
      const data = await flickrApi.json();
      Util.loading();
      if (data.stat === "fail") {
        TemplateGallery.error("Ops, something went wrong :(");
      } else {
        return data;
      }
    } catch (e) {
      return e;
    }
  }

  // Default funktion som kör varje gång en ny instans påbörjas.
  search() {
    // Metoder och parametrar från Flickr API.
    const gallery = [];
    this.apiRequest(
      "flickr.photos.search",
      `&text=${this.searchInput}`,
      "&per_page=9",
      "&safe_search=3",
      "&content_type=1"
      // '&page=10'
    ).then(res => {
      const photos = res.photos.photo;
      if (photos.length === 0) {
        Util.loadComplete();
        TemplateGallery.error(
          "Beklagar, vi kunde inte hitta några bilder som matchar din sökning. Var god ange ett nytt sökord och försök igen!"
        );
      }
      photos.map(p => {
        this.apiRequest("flickr.photos.getSizes", `&photo_id=${p.id}`)
          .then(_pictures => {
            const imageQuality = _pictures.sizes.size.findIndex(
              pic => pic.label === "Medium"
            );
            const maxSize = _pictures.sizes.size[imageQuality].width;
            TemplateGallery.home(
              _pictures.sizes.size[imageQuality].source,
              maxSize
            );
          })
          .then(x => Util.loadComplete());
      });
    });
  }
}
