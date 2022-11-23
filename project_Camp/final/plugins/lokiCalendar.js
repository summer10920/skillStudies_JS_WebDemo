//dayjs init
dayjs.locale('zh-tw');
dayjs.extend(dayjs_plugin_localeData);
dayjs.extend(dayjs_plugin_isSameOrBefore); //宣告

//全域變數宣告區
let
  fetchPath = 'db.json',
  nationalHoliday = [],
  booked = [],
  pallet = {},
  calendarCtrl = null //初始日曆物件
  ;

//初次執行項目
const init = () => {
  fetch(fetchPath).then(response => response.json()).then(json => {
    ({ nationalHoliday, booked, pallet } = json);

    calendarCtrl = calendarService(); //calendarService提供一個函式物件
    calendarCtrl.print();

    document.querySelector('a[href="#nextCtrl"]').onclick = (event) => { //綁定event
      event.preventDefault();
      calendarCtrl.add();
    }
    document.querySelector('a[href="#prevCtrl"]').onclick = (event) => { //綁定event
      event.preventDefault();
      calendarCtrl.sub();
    }
  });
}

//執行
init();

//Service
const calendarService = () => {
  let
    theDay = dayjs(),
    today = dayjs(),
    objL = {    //改成let
      listBox: '',
      title: '',
      thisDate: theDay,
    },
    objR = {    //同理
      listBox: '',
      title: '',
      thisDate: theDay.add(1, 'M'),
    };

  const
    chooseDays = [null, null], // 初始已選陣列
    changeMonth = count => {
      theDay = theDay.add(count, 'M');
      objL = {  //obj回到乾淨狀態下，使得listMaker可以重新賦予
        listBox: '',
        title: '',
        thisDate: theDay,
      };
      objR = {  //同理
        listBox: '',
        title: '',
        thisDate: theDay.add(1, 'month'),
      };
    },
    listMaker = obj => {
      const
        firstDay = obj.thisDate.date(1).day(),
        totalDay = obj.thisDate.daysInMonth();

      for (let i = 1; i < (firstDay || 7); i++) {
        obj.listBox += `<li class="JsCal"></li>`;
      }

      for (let i = 1; i <= totalDay; i++) {
        let classStr = 'JsCal';
        const dateStr = obj.thisDate.date(i).format('YYYY-MM-DD'); //搬移時機，使得listBox可以使用

        if (obj.thisDate.date(i).isSameOrBefore(today)) classStr += ' delDay'; //過期
        else {
          if ((i + firstDay) % 7 < 2 || nationalHoliday.includes(dateStr)) classStr += ' holiday'; //是否周末或國定日

          const checkDay = booked.find(item => item.date == dateStr);
          if (checkDay && !(pallet.count - Object.values(checkDay.sellout).reduce((preVal, num) => preVal + num, 0))) //滿帳
            classStr += ' fullDay';

          classStr += ' selectDay';
        }
        obj.listBox += `<li class="${classStr}" data-date="${dateStr}">${i}</li>`;
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

      //賦予selectDay可點擊，
      document.querySelectorAll('.selectDay').forEach((item) => {
        item.onclick = () => calendarCtrl.choose(item); // 每次點選將執行給該函式並傳送 item 自己
      })
    },
    chooseList = item => {
      // console.log(item);
      if (!chooseDays[0] && !chooseDays[1]) { //[null,null] => first click
        chooseDays[0] = item; //存入
        chooseDays[0].classList.add('selectHead');
      } else if (chooseDays[0] && !chooseDays[1]) {  //[item,null]=> second click
        chooseDays[1] = item; //存入

        const foot2head = dayjs(item.dataset.date).isSameOrBefore(dayjs(chooseDays[0].dataset.date)); //目前item是否早於先前點的日子，代表foot->head
        if (foot2head) {
          chooseDays[0].classList.replace('selectHead', 'selectFoot');
          chooseDays[1].classList.add('selectHead');
          [chooseDays[0], chooseDays[1]] = [chooseDays[1], chooseDays[0]];
        } else chooseDays[1].classList.add('selectFoot');
      } else { //[item,item] => third click

        chooseDays[0].classList.remove('selectHead');
        chooseDays[1].classList.remove('selectFoot');
        chooseDays[1] = null;

        //這裡的邏輯可以跟[null,null]合併為前綴特別處理
        chooseDays[0] = item;
        chooseDays[0].classList.add('selectHead');
      }
    };

  return {
    print: () => listPrint(),
    add: () => { //如果add，就是要求增加一個月，使得theDay可以 + 1。再進行 listPrint
      changeMonth(1);
      listPrint();
    },
    sub: () => {
      changeMonth(-1); //同理
      listPrint();
    },
    choose: item => {
      chooseList(item); //轉提供
    }
  }
}