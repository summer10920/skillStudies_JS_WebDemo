// onload = (() => {
let

  fetchPath = 'db.json';

dayjs.locale('zh-tw');
dayjs.extend(window.dayjs_plugin_localeData);



let init = () => {




  // fetch(fetchPath, { method: 'GET' }).then(response => response.json()).then(json => {
  //   console.log(json);
  // })
};

let showLeftCalendar = () => {
  let obj = {
    listBoxL: '',
    listBoxR: '',
    titleL: '',
    titleR: '',
    firstDayL: dayjs().day(),
    firstDayR: dayjs().add(1, 'month').day(),
    totalDayL: dayjs().daysInMonth(),
    totalDayR: dayjs().add(1, 'month').daysInMonth()
  }
  for (let i = 0; i < obj.firstDayL; i++) {
    obj.listBoxL += `<li class="JsCal"></li>`;
  }
  for (let i = 0; i < obj.firstDayR; i++) {
    obj.listBoxR += `<li class="JsCal"></li>`;
  }
  for (let i = 1; i <= obj.totalDayL; i++) {
    obj.listBoxL += `<li class="JsCal">${i}</li>`;
  }
  for (let i = 1; i <= obj.totalDayR; i++) {
    obj.listBoxR += `<li class="JsCal">${i}</li>`;
  }
  document.querySelector('.leftDayList').innerHTML = obj.listBoxL;
  document.querySelector('.rightDayList').innerHTML = obj.listBoxR;
}

init();






// })();