// onload = (() => {
let

  fetchPath = 'db.json';

dayjs.locale('zh-tw');
dayjs.extend(window.dayjs_plugin_localeData);



let init = () => {
  showCalendar();



  // fetch(fetchPath, { method: 'GET' }).then(response => response.json()).then(json => {
  //   console.log(json);
  // })
};

const showCalendar = () => {
  const
    today = dayjs(),
    objL = {
      listBox: '',
      title: '',
      firstDay: today.day(),
      totalDay: today.daysInMonth(),
    },
    objR = {
      listBox: '',
      title: '',
      firstDay: today.add(1, 'month').day(),
      totalDay: today.add(1, 'month').daysInMonth()
    },
    listMaker = (obj) => {
      for (let i = 1; i < obj.firstDay; i++) {
        obj.listBox += `<li class="JsCal"></li>`;
      }
      for (let i = 1; i <= obj.totalDay; i++) {
        obj.listBox += `
        <li 
          class="emptyDay JsCal${(i + obj.firstDay) % 7 < 2 ? ' holiday' : ''}"
        >${i}</li>`;
      }
      return obj;
    };

  document.querySelector('.leftDayList').innerHTML = listMaker(objL).listBox;
  document.querySelector('.rightDayList').innerHTML = listMaker(objR).listBox;
}

init();






// })();