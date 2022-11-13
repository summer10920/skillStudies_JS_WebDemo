let
  fetchPath = 'db.json',
  nationalHoliday = [],
  booked = [],
  pallet = {},
  calendarCtrl = null,
  defaultDayType = {
    date: '',
    pallet: {
      aArea: { total: 0, price: 0, count: 0 },
      bArea: { total: 0, price: 0, count: 0 },
      cArea: { total: 0, price: 0, count: 0 },
      dArea: { total: 0, price: 0, count: 0 },
    }
  },
  tableData = {
    totalPrice: 0,
    normalCount: 0,
    holidayCount: 0,
    nightGo: false,
    undo: true,
    pallet: {
      aArea: { title: '河畔 × A區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      bArea: { title: '山間 × B區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      cArea: { title: '平原 × C區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      dArea: { title: '車屋 × D區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 }
    }
  };

//dayjs init
dayjs.locale('zh-tw');
dayjs.extend(window.dayjs_plugin_localeData);
dayjs.extend(window.dayjs_plugin_isSameOrBefore);
dayjs.extend(window.dayjs_plugin_isBetween);

let init = () => {
  fetch(fetchPath, { method: 'GET' }).then(response => response.json()).then(json => {
    ({ nationalHoliday, booked, pallet } = json);//語法原為表達式

    calendarCtrl = calendarService();
    calendarCtrl.print();

    document.querySelector('a[href="#nextCtrl"]').onclick = (event) => {
      event.preventDefault();
      calendarCtrl.add();
    }
    document.querySelector('a[href="#prevCtrl"]').onclick = (event) => {
      event.preventDefault();
      calendarCtrl.sub();
    }

    document.querySelectorAll('form select').forEach(node => {
      node.onchange = function () {
        // tableData.totalPrice += tableData.pallet[node.name].sumPrice * node.value;
        tableData.totalPrice = 0;
        document.querySelectorAll('form select').forEach(item => {
          tableData.totalPrice += tableData.pallet[item.name].sumPrice * item.value
          tableData.pallet[item.name].orderCount = Number(item.value);
        }
        );
        document.querySelector('form>h3').textContent = `$${tableData.totalPrice} / ${tableData.normalCount}晚平日，${tableData.holidayCount}晚假日`;

      }
    });

    const offcanvas = new bootstrap.Offcanvas(document.querySelector('.offcanvas'));
    document.querySelector('form button').onclick = (event) => {
      liStr = '';
      document.querySelectorAll('form select').forEach(item => {
        if (item.value == 0) return;
        liStr += `
          <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">${tableData.pallet[item.name].title} </div>
                <div>
                  ${tableData.pallet[item.name].sellInfo}
                </div>
              </div>
              <span class="badge bg-warning rounded-pill">x <span class="fs-6">${tableData.pallet[item.name].orderCount}</span></span>
          </li>
        `;
      });
      document.querySelector('.offcanvas ol').innerHTML = liStr;
      document.querySelector('.offcanvas .card-header').textContent = document.querySelector('form>h3').textContent;
      document.querySelector('.offcanvas button[type="submit"]').disabled = !liStr;
      offcanvas.show();
    }


  })
};

const calendarService = () => {
  const
    today = dayjs(),
    chooseDays = [],
    defaultTable = JSON.parse(JSON.stringify(tableData)); //深層複製，純資料可行。
  ;
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
        const dateStr = obj.thisDate.date(i).format('YYYY-MM-DD');

        if (obj.thisDate.date(i).isSameOrBefore(today)) classStr += ' delDay'; //過期
        else {
          const checkDay = booked.find(item => item.date == dateStr);
          if (checkDay && !(pallet.count - Object.values(checkDay.sellout).reduce((preVal, num) => preVal + num, 0))) //滿帳
            classStr += ' fullDay';
          if (nationalHoliday.includes(dateStr) || (i + firstDay) % 7 < 2)
            classStr += ' holiday';
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
      document.querySelector('.leftBar>h4').textContent = objL.title;
      document.querySelector('.rightBar>h4').textContent = objR.title;

      document.querySelectorAll('.selectDay').forEach((item) => {
        item.onclick = (event) => {
          calendarCtrl.choose(event);
        }
      })
    },
    changeMonth = count => {
      theDay = theDay.add(count, 'month');
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
    },
    chooseList = target => {
      if (!chooseDays[0] && !chooseDays[1]) { // [null,null] => first start
        chooseDays[0] = target;
        chooseDays[0].classList.add('selectHead');
      } else if (chooseDays[0] && !chooseDays[1]) { // [node,null] => first end
        if (dayjs(target.dataset.date).isSameOrBefore(dayjs(chooseDays[0].dataset.date))) {
          chooseDays[1] = chooseDays[0];
          chooseDays[1].classList.replace('selectHead', 'selectFoot');
          chooseDays[0] = target;
          chooseDays[0].classList.add('selectHead');
        } else {
          chooseDays[1] = target;
          chooseDays[1].classList.add('selectFoot');
        }

        //add selectConnect between head and foot
        document.querySelectorAll('li[data-date]').forEach(item => {
          if (dayjs(item.dataset.date).isBetween(chooseDays[0].dataset.date, chooseDays[1].dataset.date))
            item.classList.add('selectConnect');
        });

        tableMarker();

      } else { //[node,node] => second start
        //remove connect
        document.querySelectorAll('li.selectConnect').forEach(
          item => item.classList.remove('selectConnect')
        );

        chooseDays[0].classList.remove('selectHead');
        chooseDays[1].classList.remove('selectFoot');
        chooseDays[0] = target;
        chooseDays[0].classList.add('selectHead');
        chooseDays[1] = null;
      }

    },
    tableMarker = () => {
      tableData = JSON.parse(JSON.stringify(defaultTable));
      for (const key in tableData.pallet)
        tableData.pallet[key].sellCount = pallet[key].total;

      const aa = document.querySelectorAll('li.selectHead, li.selectConnect').forEach(node => { //one node one day
        for (const key in tableData.pallet) {
          const hasOrder = booked.find(item => item.date == node.dataset.date);
          if (hasOrder)
            tableData.pallet[key].sellCount = Math.min(tableData.pallet[key].sellCount, pallet[key].total - hasOrder.sellout[key]);
          if (tableData.pallet[key].sellCount) { //this day can sell
            const dayPrice = pallet[key][node.classList.contains('holiday') ? 'holidayPrice' : 'normalPrice'];
            tableData.pallet[key].sumPrice += dayPrice;
            tableData.pallet[key].sellInfo += `<div>${node.dataset.date}(${dayPrice})</div>`;
          }
        }
        tableData[node.classList.contains('holiday') ? 'holidayCount' : 'normalCount']++;
      });
      tablePrint();
    },
    tablePrint = () => {
      document.querySelectorAll('form select').forEach(node => {
        const tagname = node.name;
        const count = tableData.pallet[tagname].sellCount;

        let optionStr = '';
        for (let i = 0; i <= count; i++) optionStr += `<option value="${i}">${i}</option>`;
        node.innerHTML = optionStr;
        node.disabled = !count;

        const palletInfo = node.parentElement.previousElementSibling;
        palletInfo.innerHTML = count == 0 ? '' : tableData.pallet[tagname].sellInfo;

        const span = palletInfo.previousElementSibling.children.item(1).children.item(0);
        span.textContent = count;
      });
      document.querySelector('form>h3').textContent = `$0 / ${tableData.normalCount}晚平日，${tableData.holidayCount}晚假日`;
    };
  return {
    print: () => listPrint(),
    add: () => {
      changeMonth(1);
      listPrint();
    },
    sub: () => {
      changeMonth(-1);
      listPrint();
    },
    choose: e => {
      const clsList = e.target.classList;
      if (clsList.contains('selectHead') || clsList.contains('selectFoot')) return;
      chooseList(e.target);
    }
  }
}

init();