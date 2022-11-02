// onload = (() => {
let
  fetchPath = 'db.json',
  nationalHoliday = [];

dayjs.locale('zh-tw');
dayjs.extend(window.dayjs_plugin_localeData);
dayjs.extend(window.dayjs_plugin_isSameOrBefore);



let init = () => {
  fetch(fetchPath, { method: 'GET' }).then(response => response.json()).then(json => {
    nationalHoliday = json.nationalHoliday;

    showCalendar();
  })




};

const showCalendar = () => {
  const today = dayjs();
  let theDay = dayjs(),
    //let theDay = dayjs('2022-12-01');
    objL = {
      listBox: '',
      title: '',
      thisDate: theDay,
    },
    objR = {
      listBox: '',
      title: '',
      thisDate: theDay.add(1, 'month'),
    },
    listMaker = (obj) => {
      const
        firstDay = obj.thisDate.date(1).day(),
        totalDay = obj.thisDate.daysInMonth();

      for (let i = 1; i < (firstDay || 7); i++) {
        obj.listBox += `<li class="JsCal"></li>`;
      }
      for (let i = 1; i <= totalDay; i++) {
        let classStr = 'JsCal';
        if (theDay.date(i).isSameOrBefore(today)) classStr += ' delDay';
        else {
          if (
            nationalHoliday.includes(obj.thisDate.date(i).format('YYYY-MM-DD')) || (i + firstDay) % 7 < 2
          ) classStr += ' holiday';
          classStr += ' emptyDay';
        }

        obj.listBox += `<li class="${classStr}">${i}</li>`;
      }
      obj.title = `${dayjs.months()[obj.thisDate.month()]} ${obj.thisDate.year()}`;
      return obj;
    },
    listPrint = () => {
      document.querySelector('.leftDayList').innerHTML = listMaker(objL).listBox;
      document.querySelector('.rightDayList').innerHTML = listMaker(objR).listBox;
      document.querySelector('.leftBar>h4').textContent = objL.title;
      document.querySelector('.rightBar>h4').textContent = objR.title;
    },
    changeMonth = (count) => {
      console.log(theDay);
      theDay = theDay.add(count, 'month');
      console.log(theDay);
      objL = {
        listBox: '',
        title: '',
        thisDate: theDay,
      };
      objR = {
        listBox: '',
        title: '',
        thisDate: theDay.add(1, 'month'),
      };

      listPrint();
    };
  listPrint();
  return {
    add: function () {
      changeMonth(1);
    },
    sub: function () {
      changeMonth(-1);
    }
  }
}

init();






// })();