//dayjs init
dayjs.locale('zh-tw');
dayjs.extend(dayjs_plugin_localeData);
dayjs.extend(dayjs_plugin_isSameOrBefore); //宣告

//全域變數宣告區
let
  fetchPath = 'db.json',
  nationalHoliday = [],  //國定假日
  booked = [],  //已預約狀況
  pallet = {}   //營位資訊
  ;

//初次執行項目
const init = () => {
  fetch(fetchPath).then(response => response.json()).then(json => {
    // console.log(json);  //檢查成功
    ({ nationalHoliday, booked, pallet } = json);

    calendarService();
  });
}

//執行
init();

//Service
const calendarService = () => {
  let
    theDay = dayjs();

  const
    today = dayjs(),
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

      // 0 可以當 false
      for (let i = 1; i < (firstDay || 7); i++) {
        obj.listBox += `<li class="JsCal"></li>`;
      }

      for (let i = 1; i <= totalDay; i++) {
        let classStr = 'JsCal';

        if (obj.thisDate.date(i).isSameOrBefore(today)) classStr += ' delDay'; //過期
        else {
          const dateStr = obj.thisDate.date(i).format('YYYY-MM-DD');
          if ((i + firstDay) % 7 < 2 || nationalHoliday.includes(dateStr)) classStr += ' holiday'; //是否周末或國定日

          const checkDay = booked.find(item => item.date == dateStr);
          if (checkDay && !(pallet.count - Object.values(checkDay.sellout).reduce((preVal, num) => preVal + num, 0))) //滿帳
            classStr += ' fullDay';
          
            classStr += ' selectDay';
        }
        obj.listBox += `<li class="${classStr}">${i}</li>`;
      }

      obj.title = `${dayjs.months()[obj.thisDate.month()]} ${obj.thisDate.year()}`;
      return obj;
    },

    listPrint = () => {
      document.querySelector('.leftDayList').innerHTML = listMaker(objL).listBox;
      document.querySelector('.rightDayList').innerHTML = listMaker(objR).listBox;

      //替換文字
      document.querySelector('.leftBar>h4').textContent = objL.title;
      document.querySelector('.rightBar>h4').textContent = objR.title;
    };

  //執行
  listPrint();
}