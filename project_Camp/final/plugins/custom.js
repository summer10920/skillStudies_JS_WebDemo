onload = () => {
  var grid = document.querySelector('#lokiPark article.row');
  new Masonry(grid, { percentPosition: 'true' });

  //menu background effect
  const menuEffect = () => {
    const headerMenu = document.querySelector('nav.navbar');
    let desktopMode = getComputedStyle(headerMenu.querySelector('button')).getPropertyValue('display');

    if (scrollY > 500 || desktopMode != 'none') headerMenu.classList.remove('init');
    else headerMenu.classList.add('init');
  }

  onresize = () => {
    menuEffect();
  }
  onscroll = () => {
    menuEffect();
  }

  AOS.init();
}