import loadingGIF from "../img/loading.gif";

export default class Util {
  static loading() {
    const printContainer = document.querySelector(".load");
    let template = ` 
        <div class="overlay">
            <img src=${loadingGIF}>
        </div>
        `;
    printContainer.insertAdjacentHTML("beforeend", template);
  }
  static loadComplete() {
    const printContainer = document.querySelector(".load");
    printContainer.innerHTML = null;
  }
  static startTime() {
    const checkTime = i => {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    };

    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    document.querySelector(".time").innerHTML = h + ":" + m;
    const t = setTimeout(Util.startTime, 1000);
  }
}
