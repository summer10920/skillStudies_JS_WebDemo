!(function () { //因為 init 衝突，所以其實包成區間執行是比較的作法，前例lokiCalendar也是應該這樣處理

  const init = () => {
    const lightBox = document.querySelector('#lokiLightBox');
    const targetCtrl = lightBox.querySelector('.control');
    const targetMain = lightBox.querySelector('.mainZone');

    lightBox.querySelector('.backdrop').onclick = function () {
      lightBox.style.cssText = 'display:none';
    }

    document.querySelectorAll('#lokiPark .col').forEach(item => {
      const minImg = item.querySelector('img').cloneNode();
      // console.log(item.nextElementSibling.children[0].textContent);
      // minImg.dataset.str = item.nextElementSibling.children[0].textContent;
      minImg.dataset.str = item.querySelector('h5').textContent;

      minImg.onclick = function () {
        targetMain.children[0].src = this.src;
        targetMain.children[1].textContent = this.dataset.str;
      }

      item.onclick = function () {
        lightBox.style.cssText = 'display:flex';
        minImg.click();
      }

      targetCtrl.append(minImg);
    });

  }
  init();
})();