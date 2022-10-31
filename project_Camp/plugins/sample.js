let data = {};
let bookingForm = document.querySelector('.bookingInput')
let cancelBtn = document.querySelector('.cancelBtn');
let bookNow = document.querySelector('.bookNow');
let formBack = document.querySelector('.inputBackground');
let bookingPic = document.querySelector('.bookingPic');
let sendBtn = document.querySelector('.sendBtn');
let bookSuccess = document.querySelector('.bookSuccess')
let bookFail = document.querySelector('.bookFail')
let roomFetch = 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + JSON.parse(localStorage.getItem('roomId'))
let roomId = JSON.parse(localStorage.getItem('roomId'))
let descriptionShort = [{
    id: '3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu',
    Bed: '單人床',
    Footage: '18',
    Guest: '1',
    des1: '單人間僅供一位客人使用。',
    des2: '臥室配有單人床和私人浴室。',
    amenities: ['t', 'f', 'f', 't', 'f', 't', 'f', 't', 'f', 't', 't', 't']
}, {
    id: 'RA8NhExaXXZB7EODVALSDvFFQzj1JP0a4C1pwZ1acPaieRBwiWoCb0FE0KUbXaxg',
    Bed: '雙人床',
    Footage: '26',
    Guest: '2~3',
    des1: '雙人房供二到三位客人使用。',
    des2: '臥室配有雙人床和私人浴室。',
    amenities: ['t', 't', 't', 't', 't', 't', 'f', 't', 'f', 't', 't', 't']
}, {
    id: 'VCxbQq1vLeUtxW781k9Dlq3mHBRNl5YP19Lhq8k5TbIr2BeH58gRpnNKGoEgkysz',
    Bed: '兩張雙人床',
    Footage: '36',
    Guest: '2~4',
    des1: '雙床雙人房供二到四位客人使用。',
    des2: '臥室配有兩張雙人床和私人浴室。',
    amenities: ['t', 't', 't', 't', 't', 't', 'f', 't', 'f', 't', 't', 't']
}, {
    id: 'g0mYhN6ignMz4VYW7eiWsXZN8DHolHzH8LuVmM6hq5h6BrrqrLMw4aJgHv7LZ3RQ',
    Bed: '小雙人床',
    Footage: '22',
    Guest: '1',
    des1: '豪華單人房僅供一位客人使用。',
    des2: '臥室配有小雙人床和私人浴室。',
    amenities: ['t', 't', 't', 't', 'f', 't', 'f', 't', 'f', 't', 't', 't']
}, {
    id: 'kICyWhZ5XsfI4n1d4gBOsDjIyIxNozwgmxYKyZpzi5pjLcU2Nl4RhiGrn6zaPuTJ',
    Bed: '雙人床加大',
    Footage: '22',
    Guest: '2~3',
    des1: '豪華雙人房供二到三位客人使用。',
    des2: '臥室配有一張雙人床加大和私人浴室。',
    amenities: ['t', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't']
}, {
    id: 'YovqNpFDaal598jbpd1A14gXwDE6gekTqJgxOAGcq78B8YnP7claymQVFy2GTwgb',
    Bed: '兩張雙人床加大',
    Footage: '22',
    Guest: '2~4',
    des1: '豪華雙床雙人房供二到四位客人使用。',
    des2: '臥室配有兩張雙人床加大和私人浴室。',
    amenities: ['t', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't']
}
]
let normalDayPrice = 0
let holidayPrice = 0
let nameText = document.getElementById('name')
let phoneText = document.getElementById('phone')
let checkInText = document.getElementById('checkIn')
let checkOutText = document.getElementById('checkOut')
let album = document.querySelector('.album')
let albumLeft = document.querySelector('.albumLeft')
let albumRight = document.querySelector('.albumRight')
let albumPic1 = document.querySelector('.albumPic1')
let albumPic2 = document.querySelector('.albumPic2')
let albumPic3 = document.querySelector('.albumPic3')
let currentPic = 1;

albumLeft.addEventListener('click', changeAlbumPhoto, false)
albumRight.addEventListener('click', changeAlbumPhoto, false)
album.addEventListener('click', closeAlbum, false)
checkOutText.addEventListener('blur', checkcheckOutText, false)
checkInText.addEventListener('blur', checkcheckInText, false)
phoneText.addEventListener('blur', checkPhoneText, false)
phoneText.addEventListener('click', checkPhoneText, false)
nameText.addEventListener('blur', checkNameText, false)
nameText.addEventListener('click', checkNameText, false)

bookingPic.addEventListener('click', imgshow, false)
bookFail.addEventListener('click', backHome, false)
bookSuccess.addEventListener('click', backHome, false)
sendBtn.addEventListener('click', checkData, false)
formBack.addEventListener('click', closeForm, false)
cancelBtn.addEventListener('click', closeForm, false)
bookNow.addEventListener('click', intoForm, false)

//get data from Fetch
fetch(roomFetch, {
    method: 'get',
    headers: new Headers({
        'Authorization': 'Bearer tOfddSilxwkxOaM9kVM28iN7mDVGL4FxPza8fG0PwnNIhCimNxE0KUeFcQ89'
    }),
})
    .then((response) => {
        return response.json()
        //return response.text()
    }).then((myJson) => {
        data = myJson.room[0];
        already = myJson.booking;
        localStorage.setItem("alreadybook", JSON.stringify(already));
        showLeftCalendar(alreadybook)
        showRightCalendar(alreadybook)
        updatepage(data);
        document.querySelector('.loaderBack').style.opacity = 0;
        if (document.querySelector('.loaderBack').style.opacity == '0') {
            document.querySelector('.loaderBack').setAttribute('id', 'disappear');
        }
        showCheckInCalendar(alreadybook)
        showCheckOutCalendar(alreadybook)
    });


//讓視窗置中
bookingForm.style.left = (window.innerWidth - 1110) / 2 + "px";
bookingForm.style.top = (window.innerHeight - 610) / 2 + "px";
bookFail.style.top = (window.innerHeight - 610) / 2 + "px";
bookSuccess.style.top = (window.innerHeight - 610) / 2 + "px";
window.onresize = function () {
    bookingForm.style.left = (window.innerWidth - 1110) / 2 + "px";
    document.querySelector('.roomWrap').style.height = window.innerHeight + "px"
}
document.querySelector('.roomWrap').style.height = window.innerHeight + "px"

//關閉表單
function closeForm(e) {
    e.preventDefault();
    if (e.target.id == 'formBack' || e.target.id == 'cancelBtn') {
        formBack.style.display = 'none'
        bookSuccess.style.display = 'none'
        bookFail.style.display = 'none'
    }
}

//打開表單
function intoForm(e) {
    e.preventDefault();
    formBack.style.display = 'block'
    bookingForm.style.display = 'flex'
}

//更新頁面
function updatepage(update) {
    document.querySelector('.roomTitle h2').textContent = update.name;
    document.querySelector('.infoPlace h2').textContent = update.name;
    document.querySelector('.weekPrice').textContent = update.normalDayPrice;
    normalDayPrice = update.normalDayPrice;
    document.querySelector('.holiPrice').textContent = update.holidayPrice;
    holidayPrice = update.holidayPrice;
    document.querySelector('.infoPlace .weekPrice').textContent = update.normalDayPrice;
    document.querySelector('.infoPlace .holiPrice').textContent = update.holidayPrice;
    document.querySelector('.roomRule .checkInEarly').textContent = update.checkInAndOut.checkInEarly;
    document.querySelector('.roomRule .checkInLate').textContent = update.checkInAndOut.checkInLate;
    document.querySelector('.roomRule .checkOut').textContent = update.checkInAndOut.checkOut;
    document.querySelector('.roomList .checkInEarly').textContent = update.checkInAndOut.checkInEarly;
    document.querySelector('.roomList .checkInLate').textContent = update.checkInAndOut.checkInLate;
    document.querySelector('.roomList .checkOut').textContent = update.checkInAndOut.checkOut;
    for (let i = 0; i < 6; i++) {
        if (roomId == descriptionShort[i].id) {
            document.querySelector('.roomTitle .Footage').textContent = descriptionShort[i].Footage;
            document.querySelector('.roomTitle .Guest').textContent = descriptionShort[i].Guest;
            document.querySelector('.roomTitle .Bed').textContent = descriptionShort[i].Bed;
            document.querySelector('.infoPlace .Footage').textContent = descriptionShort[i].Footage;
            document.querySelector('.infoPlace .Guest').textContent = descriptionShort[i].Guest;
            document.querySelector('.infoPlace .Bed').textContent = descriptionShort[i].Bed;
            document.querySelector('.roomInfo .des1').textContent = descriptionShort[i].des1;
            document.querySelector('.roomInfo .des2').textContent = descriptionShort[i].des2;
            for (let n = 0; n < 12; n++) {
                if (descriptionShort[i].amenities[n] == 'f') {
                    document.querySelectorAll('.bookingInfo .roomIcon li')[n].setAttribute('class', 'without')
                    document.querySelectorAll('.bookingInfo .roomIcon .yesORno')[n].setAttribute("src", "images/amenities/icons-cancel.svg")
                    document.querySelectorAll('.infoPlace .roomIcon li')[n].setAttribute('class', 'none')
                } else if (descriptionShort[i].amenities[n] == 't') {
                    document.querySelectorAll('.bookingInfo .roomIcon .yesORno')[n].setAttribute("src", "images/amenities/icons-ok.svg")
                }
            }
        }
    }
    document.querySelectorAll('.roomPic')[0].style = `background-image:URL(${update.imageUrl[0]})`;
    document.querySelectorAll('.roomPic')[1].style = `background-image:URL(${update.imageUrl[1]})`;
    document.querySelectorAll('.roomPic')[2].style = `background-image:URL(${update.imageUrl[2]})`;
    albumPic1.style = `background-image:URL(${update.imageUrl[0]})`;
    albumPic2.style = `background-image:URL(${update.imageUrl[1]})`;
    albumPic3.style = `background-image:URL(${update.imageUrl[2]})`;
}

//確認姓名欄位
function checkNameText(e) {
    document.querySelector('.calendarCheckIn').style.display = "none";
    document.querySelector('.calendarCheckOut').style.display = "none";
    if (e.target.value == "") {
        document.querySelector('.rightName').textContent = '請填入姓名'
    } else (
        document.querySelector('.rightName').textContent = ''
    )
}

//確認電話欄位
function checkPhoneText(e) {
    document.querySelector('.calendarCheckIn').style.display = "none";
    document.querySelector('.calendarCheckOut').style.display = "none";
    if (e.target.value == "") {
        document.querySelector('.rightPhone').textContent = '請填入電話'
    } else (
        document.querySelector('.rightPhone').textContent = ''
    )
}

//確認入住日期
function checkcheckInText(e) {
    if (e.target.value == "") {
        document.querySelector('.rightCheckin').textContent = '請選擇入住日期'
    } else (
        document.querySelector('.rightCheckin').textContent = ''
    )
}

//確認退房日期
function checkcheckOutText(e) {
    if (e.target.value == "") {
        document.querySelector('.rightCheckout').textContent = '請選擇退房日期'
    } else (
        document.querySelector('.rightCheckout').textContent = ''
    )
}

//確認輸入資料 跳轉頁面
function checkData() {
    let bookFetch = {};
    let totalnight;
    let beString;
    let reg = /(^([a-zA-Z]+\s)*[a-zA-Z]+$)|(^[\u4e00-\u9fa5]+$)/;
    if (document.getElementById('name').value == '') {
        document.querySelector('.rightName').textContent = '請填入姓名'
    } else {
        document.querySelector('.rightName').textContent = ''
    }
    if (document.getElementById('phone').value == '') {
        document.querySelector('.rightPhone').textContent = '請填入電話'
    } else {
        document.querySelector('.rightPhone').textContent = ''
    }
    if (checkInText.value == "") {
        document.querySelector('.rightCheckin').textContent = '請選擇入住日期'
    } else {
        document.querySelector('.rightCheckin').textContent = ''
    }
    if (checkOutText.value == "") {
        document.querySelector('.rightCheckout').textContent = '請選擇退房日期'
    } else {
        document.querySelector('.rightCheckout').textContent = ''
    }

    if (reg.test(nameText.value) == false) {
        document.querySelector('.rightName').textContent = '請填入正確資料'
    } else if (document.getElementById('name').value !== '' && document.getElementById('phone').value !== '' && checkInText.value !== "" && checkOutText.value !== "" && reg.test(nameText.value)) {
        if (new Date(chooseDate[0]) > new Date(chooseDate[1])) {
            bookFetch = {
                name: nameText.value,
                tel: phoneText.value,
                date: [checkInText.value]
            };
            beString = chooseDate[1].split(',')
            let MonthN = monthNumber(beString[0], beString[1] - 1)
            totalnight = (new Date(chooseDate[0]) - new Date(chooseDate[1])) / 86400000
            for (let i = 1; i < totalnight; i++) {
                beString[2] = Number(beString[2]) + 1

                if (beString[2] < 10) {
                    beString[2] = '0' + beString[2]
                }
                if (beString[2] > MonthN) {
                    beString[1] = Number(beString[1]) + 1
                    beString[2] = '01'
                }
                if (beString[1] < 10) {
                    beString[1] = '0' + Number(beString[1])
                }
                bookFetch.date.push(beString[0] + '-' + beString[1] + '-' + beString[2])
            }
        } else if (new Date(chooseDate[0]) < new Date(chooseDate[1])) {
            bookFetch = {
                name: nameText.value,
                tel: phoneText.value,
                date: [checkInText.value]
            };
            beString = chooseDate[0].split(',')
            let MonthN = monthNumber(beString[0], beString[1] - 1)
            let totalnight = (new Date(chooseDate[1]) - new Date(chooseDate[0])) / 86400000
            for (let i = 1; i < totalnight; i++) {
                beString[2] = Number(beString[2]) + 1

                if (beString[2] < 10) {
                    beString[2] = '0' + beString[2]
                }
                if (beString[2] > MonthN) {
                    beString[1] = Number(beString[1]) + 1
                    beString[2] = '01'
                }
                if (beString[1] < 10) {
                    beString[1] = '0' + Number(beString[1])
                }
                bookFetch.date.push(beString[0] + '-' + beString[1] + '-' + beString[2])
            }
        }
        fetch(roomFetch, {
            method: 'post',
            body: JSON.stringify(bookFetch), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer tOfddSilxwkxOaM9kVM28iN7mDVGL4FxPza8fG0PwnNIhCimNxE0KUeFcQ89'
            }),
        })
            .then((response) => {
                return response.json()
                //return response.text()
            }).then((myJson) => {
                if (myJson.message == "您所提供的訂房時間(date)已有訂房。") {
                    bookingForm.style.display = 'none'
                    bookFail.style.display = 'block'
                } else {
                    bookingForm.style.display = 'none'
                    bookSuccess.style.display = 'block'
                }
            });
    }
}

//點擊結果頁面 回到首頁
function backHome() {
    window.location.href = "index.html"
}

//打開Album
function imgshow(e) {
    if (e.target.className == 'bookingPic') {
        document.querySelector('.album').style.display = 'block'
    }
}

//關閉Album
function closeAlbum(e) {
    if (e.target.nodeName !== 'IMG') {
        document.querySelector('.album').style.display = 'none'
    }
}

function changeAlbumPhoto(e) {
    e.preventDefault();
    if (e.target.parentNode.className == 'albumLeft'){
        if ( currentPic == 1){
            currentPic = 3
            albumPic1.style.display = 'none';
            albumPic3.style.display = 'block';
        } else if ( currentPic == 2){
            currentPic = 1
            albumPic2.style.display = 'none';
            albumPic1.style.display = 'block';
        }else if ( currentPic == 3){
            currentPic = 2
            albumPic3.style.display = 'none';
            albumPic2.style.display = 'block';
        }
    }
    if (e.target.parentNode.className == 'albumRight'){
        if ( currentPic == 1){
            currentPic = 2
            albumPic1.style.display = 'none';
            albumPic2.style.display = 'block';
        } else if ( currentPic == 2){
            currentPic = 3
            albumPic2.style.display = 'none';
            albumPic3.style.display = 'block';
        }else if ( currentPic == 3){
            currentPic = 1
            albumPic3.style.display = 'none';
            albumPic1.style.display = 'block';
        }

    }
}

//月曆
let monthName = ["January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"];
let monthNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let monthNumFeb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate()
let in90Day = new Date(year, month, day + 90);
let chooseDatanum = ['0', '0'];
let chooseDate = ['0', '0']
let bookingAttay = []
let leftMonth;
let leftYear;
let rightMonth;
let rightYear;

let leftTitle = document.querySelector('.leftBar h4')
let rightTitle = document.querySelector('.rightBar h4')
let leftDayList = document.querySelector('.leftDayList')
let rightDayList = document.querySelector('.rightDayList')
let lastBtn = document.querySelector('.lastBtn')
let nextBtn = document.querySelector('.nextBtn')
let activeDay = document.querySelectorAll('.emptyDay a')
let alreadybook = JSON.parse(localStorage.getItem('alreadybook'))

rightDayList.addEventListener('click', chooseDay, false)
leftDayList.addEventListener('click', chooseDay, false)
nextBtn.addEventListener('click', nextMonth, false)
lastBtn.addEventListener('click', lastMonth, false)

//每月第一天
function firstDay(theYear, theMonth) {
    let theTime = new Date(theYear, theMonth, 1);
    return (theTime.getDay());
}

//每月總數
function monthNumber(theYear, theMonth) {
    if (theYear % 4 == 0) {
        return (monthNumFeb[theMonth])
    } else {
        return (monthNum[theMonth])
    }
}

//結果顯示於左側月曆上
function showLeftCalendar(booked) {
    booked = JSON.parse(localStorage.getItem('alreadybook'))
    let strList = '';
    let strTitle = '';
    let First = firstDay(year, month)
    let MonthN = monthNumber(year, month)
    leftMonth = month;
    leftYear = year;
    for (let i = 1; i <= First; i++) {
        strList += `<li class="JsCal"></li>`
    }
    for (let i = 1; i <= MonthN; i++) {
        if ((i <= day && year == date.getFullYear() && month == date.getMonth()) || year < date.getFullYear() || (year == date.getFullYear() && month < date.getMonth())) {
            strList += `<li class="delDay JsCal">${i}</li>`
        } else if ((Math.ceil((in90Day - new Date(year, month, i)) / 86400000)) <= 90 && (Math.ceil((in90Day - new Date(year, month, i)) / 86400000)) >= 0) {
            strList += `<li class="emptyDay JsCal"><a data-num="${Math.ceil((in90Day - new Date(year, month, i)) / 86400000) + 1}" href="#">${i}</a></li>`
        } else {
            strList += `<li class="delDay JsCal">${i}</li>`
        }
    }
    strTitle = monthName[month] + ' ' + year;
    leftTitle.textContent = strTitle
    leftDayList.innerHTML = strList;
    let g;
    let lens = booked.length;
    for (let i = 0; i < MonthN; i++) {
        for (let n = 0; n < lens; n++) {
            g = booked[n].date.split('-');
            if (g[0] == year && g[1] - 1 == month && g[2] == i) {
                document.querySelectorAll('.leftDayList li')[i + First - 1].setAttribute('class', 'delDay JsCal')
            }
        }
    }
    monthInput = month
}

//結果顯示於右側月曆上
function showRightCalendar(booked) {
    booked = JSON.parse(localStorage.getItem('alreadybook'))
    if (month == 11) {
        year = year + 1
        month = 0
    } else {
        month = month + 1;
    }
    rightMonth = month;
    rightYear = year;
    let strList = '';
    let strTitle = '';
    let First = firstDay(year, month)
    let MonthN = monthNumber(year, month)
    for (let i = 1; i <= First; i++) {
        strList += `<li class="JsCal"></li>`
    }
    for (let i = 1; i <= MonthN; i++) {
        if ((i <= day && year == date.getFullYear() && month == date.getMonth()) || year < date.getFullYear() || (year == date.getFullYear() && month < date.getMonth())) {
            strList += `<li class="delDay JsCal">${i}</li>`
        } else if ((Math.ceil((in90Day - new Date(year, month, i)) / 86400000)) <= 90 && (Math.ceil((in90Day - new Date(year, month, i)) / 86400000)) >= 0) {
            strList += `<li class="emptyDay JsCal"><a data-num="${Math.ceil((in90Day - new Date(year, month, i)) / 86400000) + 1}" href="#">${i}</a></li>`
        } else {
            strList += `<li class="delDay JsCal">${i}</li>`
        }
    }
    strTitle = monthName[month] + ' ' + year;
    rightTitle.textContent = strTitle
    rightDayList.innerHTML = strList;
    let g;
    let lens = booked.length;
    for (let i = 0; i < MonthN; i++) {
        for (let n = 0; n < lens; n++) {
            g = booked[n].date.split('-');
            if (g[0] == year && g[1] - 1 == month && g[2] == i) {
                document.querySelectorAll('.rightDayList li')[i + First - 1].setAttribute('class', 'delDay JsCal')
            }
        }
    }
}

//回到上個月
function lastMonth(e) {
    e.preventDefault();
    if (month == 0) {
        year = year - 1;
        month = 10
    } else {
        month = month - 2;
    }
    if (month < 0) {
        year = year - 1;
        month = 11
    }
    showLeftCalendar(alreadybook)
    showRightCalendar(alreadybook)
    chooseDatanum = ['0', '0'];
    chooseDate = ['0', '0']
    bookingAttay = []
    normalNightCount = 0;
    holidayNightCount = 0;
}

//去下個月
function nextMonth(e) {
    e.preventDefault();
    showLeftCalendar(alreadybook)
    showRightCalendar(alreadybook)
    chooseDatanum = ['0', '0'];
    chooseDate = ['0', '0']
    bookingAttay = []
    normalNightCount = 0;
    holidayNightCount = 0;
}

//連起來
function chooseDay(e) {
    e.preventDefault();
    totalPrice(e)
    let lens = 0
    let firstdateNum = document.querySelectorAll('.JsCal a')[0].dataset.num
    let click = document.querySelectorAll('.JsCal a')[firstdateNum - e.target.dataset.num]
    //如果儲存頭尾的陣列都為0 將data-num存入chooseDatanum陣列中 +上CLASS
    if (chooseDatanum[0] == 0 && chooseDatanum[1] == 0 && e.target.nodeName == 'A') {
        chooseDatanum.splice(0, 1)
        chooseDatanum.push(click.dataset.num)
        click.setAttribute('id', 'start')
    } else if (chooseDatanum[0] == 0 && chooseDatanum[1] !== 0 && e.target.nodeName == 'A') {
        chooseDatanum.splice(0, 1)
        chooseDatanum.push(click.dataset.num)
        click.setAttribute('id', 'end')
        //判斷先點的大 還是後點的大
        if (Number(chooseDatanum[0]) == Number(chooseDatanum[1])) {
            document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[0]].removeAttribute('id')
            document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[1]].removeAttribute('id')
            chooseDatanum = [0, 0]
        }
        else if (Number(chooseDatanum[0]) > Number(chooseDatanum[1])) {
            //把所有連接起來父元素li加上ID(設定樣式)
            lens = chooseDatanum[0] - chooseDatanum[1]
            document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[0]].parentNode.setAttribute('id', 'head')
            document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[1]].parentNode.setAttribute('id', 'tail')
            for (let y = 1; y < lens; y++) {
                document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[0] + y].parentNode.setAttribute('id', 'connectionLi')
            }
        } else if (Number(chooseDatanum[0]) < Number(chooseDatanum[1])) {
            //把所有連接起來父元素li加上ID(設定樣式)
            click.setAttribute('id', 'start')
            document.querySelectorAll('.JsCal a')[firstdateNum - Number(chooseDatanum[0])].setAttribute('id', 'end')
            document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[1]].parentNode.setAttribute('id', 'head')
            document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[0]].parentNode.setAttribute('id', 'tail')
            lens = chooseDatanum[1] - chooseDatanum[0]
            for (let y = 1; y < lens; y++) {
                document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[1] + y].parentNode.setAttribute('id', 'connectionLi')
            }
        }
    } else if (chooseDatanum[0] !== 0 && chooseDatanum[1] !== 0 && e.target.nodeName == 'A') {
        //把所有連接起來的父元素li ID拿掉(去掉樣式)
        if (Number(chooseDatanum[0]) > Number(chooseDatanum[1])) {
            lens = chooseDatanum[0] - chooseDatanum[1]
            document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[0]].parentNode.removeAttribute('id')
            document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[1]].parentNode.removeAttribute('id')
            for (let y = 1; y < lens; y++) {
                document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[0] + y].parentNode.removeAttribute('id')
            }
        } else if (Number(chooseDatanum[0]) < Number(chooseDatanum[1])) {
            lens = chooseDatanum[1] - chooseDatanum[0]
            document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[1]].parentNode.removeAttribute('id')
            document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[0]].parentNode.removeAttribute('id')
            for (let y = 1; y < lens; y++) {
                document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[1] + y].parentNode.removeAttribute('id')
            }
        }
        //數字重製 
        document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[0]].removeAttribute('id')
        document.querySelectorAll('.JsCal a')[firstdateNum - chooseDatanum[1]].removeAttribute('id')
        chooseDatanum = [0, 0]
        //繼續儲存新的第一個點擊
        chooseDatanum.splice(0, 1)
        chooseDatanum.push(click.dataset.num)
        click.setAttribute('id', 'start')
    }

}

//計算價格 回傳值
function totalPrice(e) {
    let price = 0
    let normalNightCount = 0;
    let holidayNightCount = 0;

    if (chooseDate[0] !== '0' && chooseDate[1] !== '0' && e.target.nodeName == 'A') {
        chooseDate = ['0', '0']
        bookingAttay = []
        normalNightCount = 0;
        holidayNightCount = 0;
    }
    if (e.target.parentNode.parentNode.className == 'leftDayList' && e.target.nodeName == 'A') {
        chooseDate.splice(0, 1)
        chooseDate.push(leftYear + ',' + (leftMonth + 1) + ',' + e.target.textContent)
        whetherPlusZero(leftYear, leftMonth, e.target.textContent)
    } else if (e.target.parentNode.parentNode.className == 'rightDayList' && e.target.nodeName == 'A') {
        chooseDate.push(rightYear + ',' + (rightMonth + 1) + ',' + e.target.textContent)
        chooseDate.splice(0, 1)
        whetherPlusZero(rightYear, rightMonth, e.target.textContent)
    }

    if (new Date(chooseDate[0]) > new Date(chooseDate[1]) && chooseDate[0] !== '0') {
        let d2 = new Date(chooseDate[1])
        let totalnight = (new Date(chooseDate[0]) - new Date(chooseDate[1])) / 86400000
        document.getElementById('checkIn').value = bookingAttay[1]
        document.getElementById('checkOut').value = bookingAttay[0]

        for (let i = 0; i < totalnight; i++) {
            d2.setDate(d2.getDate() + 1)
            if (d2.getDay() - 1 == 1 || d2.getDay() - 1 == 2 || d2.getDay() - 1 == 3 || d2.getDay() - 1 == 4) {
                price = price + normalDayPrice
                normalNightCount += 1
            } else {
                price = price + holidayPrice
                holidayNightCount += 1
            }
        }
        if (normalNightCount == 0 && holidayNightCount !== 0) {
            document.querySelector('.totalNight').textContent = '/ ' + holidayNightCount + '晚假日'
            document.querySelector('.countNight').textContent = holidayNightCount + '晚假日'
        } else if (normalNightCount !== 0 && holidayNightCount == 0) {
            document.querySelector('.totalNight').textContent = '/ ' + normalNightCount + '晚平日'
            document.querySelector('.countNight').textContent = normalNightCount + '晚平日'

        } else if (normalNightCount !== 0 && holidayNightCount !== 0) {
            document.querySelector('.totalNight').textContent = '/ ' + normalNightCount + '晚平日' + '，' + holidayNightCount + '晚假日'
            document.querySelector('.countNight').textContent = normalNightCount + '晚平日' + ' / ' + holidayNightCount + '晚假日'
        }
        document.querySelector('.countDay').textContent = totalnight + 1 + '天，'
        document.querySelector('.totalPrice span').textContent = '$' + thousandComma(price)
        document.querySelector('.totalPrice').textContent = '$' + thousandComma(price)
    } else if (new Date(chooseDate[0]) < new Date(chooseDate[1]) && chooseDate[0] !== '0') {
        let d1 = new Date(chooseDate[0])
        let totalnight = (new Date(chooseDate[1]) - new Date(chooseDate[0])) / 86400000
        document.getElementById('checkIn').value = bookingAttay[0]
        document.getElementById('checkOut').value = bookingAttay[1]
        for (let i = 0; i < totalnight; i++) {
            d1.setDate(d1.getDate() + 1)
            if (d1.getDay() - 1 == 1 || d1.getDay() - 1 == 2 || d1.getDay() - 1 == 3 || d1.getDay() - 1 == 4) {
                price = price + normalDayPrice
                normalNightCount += 1
            } else {
                price = price + holidayPrice
                holidayNightCount += 1
            }
        }
        if (normalNightCount == 0 && holidayNightCount !== 0) {
            document.querySelector('.totalNight').textContent = '/ ' + holidayNightCount + '晚假日'
            document.querySelector('.countNight').textContent = holidayNightCount + '晚假日'
        } else if (normalNightCount !== 0 && holidayNightCount == 0) {
            document.querySelector('.totalNight').textContent = '/ ' + normalNightCount + '晚平日'
            document.querySelector('.countNight').textContent = normalNightCount + '晚平日'

        } else if (normalNightCount !== 0 && holidayNightCount !== 0) {
            document.querySelector('.totalNight').textContent = '/ ' + normalNightCount + '晚平日' + '，' + holidayNightCount + '晚假日'
            document.querySelector('.countNight').textContent = normalNightCount + '晚平日' + ' / ' + holidayNightCount + '晚假日'
        }
        document.querySelector('.countDay').textContent = totalnight + 1 + '天，'
        document.querySelector('.totalPrice span').textContent = '$' + thousandComma(price)
        document.querySelector('.totalPrice').textContent = '$' + thousandComma(price)
    }
}

//千位數字 加上','
function thousandComma(number) {
    let num = number.toString();
    let pattern = /(-?\d+)(\d{3})/;

    while (pattern.test(num)) {
        num = num.replace(pattern, "$1,$2");
    }
    return num;
}

//判斷是否有0 組字串 存回bookingD
function whetherPlusZero(y, m, d) {
    if (Number(m + 1) < 10) {
        m = '0' + Number(m + 1)
    }
    if (d < 10) {
        d = '0' + d
    }
    bookingAttay.push(y + '-' + m + '-' + d)
}

//Input內的月曆

//結果顯示於CheckIn月曆上
let dateInput = new Date();
let yearInput = dateInput.getFullYear();
let monthInput = dateInput.getMonth();
let dayInput = dateInput.getDate()
let in90DayInput = new Date(yearInput, monthInput, dayInput + 90);
let checkInDayListInput = document.querySelector('.checkInDayListInput')
let checkOutDayListInput = document.querySelector('.checkOutDayListInput')
let checkInBarInput = document.querySelector('.checkInBarInput h4')
let checkOutBarInput = document.querySelector('.checkOutBarInput h4')
let lastBtnCheckIn = document.querySelector('.lastBtnCheckIn')
let nextBtnCheckIn = document.querySelector('.nextBtnCheckIn')
let lastBtnCheckout = document.querySelector('.lastBtnCheckout')
let nextBtnCheckout = document.querySelector('.nextBtnCheckout')
let calendarCheckIn = document.querySelector('.calendarCheckIn')

checkOutText.addEventListener('click', toggelcheckOut, false)
checkInText.addEventListener('click', toggelcheckIn, false)
lastBtnCheckIn.addEventListener('click', lastMonthInput, false)
nextBtnCheckIn.addEventListener('click', nextMonthInput, false)
lastBtnCheckout.addEventListener('click', lastMonthInput, false)
nextBtnCheckout.addEventListener('click', nextMonthInput, false)
checkInDayListInput.addEventListener('click', chooseCheck, false)
checkOutDayListInput.addEventListener('click', chooseCheck, false)

//顯示CheckIn的月曆
function showCheckInCalendar(booked) {
    booked = JSON.parse(localStorage.getItem('alreadybook'))

    let strList = '';
    let strTitle = '';
    let First = firstDay(yearInput, monthInput)
    let MonthN = monthNumber(yearInput, monthInput)

    for (let i = 1; i <= First; i++) {
        strList += `<li></li>`
    }
    for (let i = 1; i <= MonthN; i++) {
        if ((i <= dayInput && yearInput == date.getFullYear() && monthInput == dateInput.getMonth()) || yearInput < dateInput.getFullYear() || (yearInput == dateInput.getFullYear() && monthInput < dateInput.getMonth())) {
            strList += `<li class="delDay">${i}</li>`
        } else if ((Math.ceil((in90DayInput - new Date(yearInput, monthInput, i)) / 86400000)) <= 90 && (Math.ceil((in90DayInput - new Date(yearInput, monthInput, i)) / 86400000)) >= 0) {
            strList += `<li class="emptyDay"><a href="#">${i}</a></li>`
        } else {
            strList += `<li class="delDay">${i}</li>`
        }
    }
    strTitle = monthName[monthInput] + ' ' + yearInput;
    checkInBarInput.textContent = strTitle
    checkInDayListInput.innerHTML = strList;
    let g;
    let lens = booked.length;
    for (let i = 0; i < MonthN; i++) {
        for (let n = 0; n < lens; n++) {
            g = booked[n].date.split('-');
            if (g[0] == yearInput && g[1] - 1 == monthInput && g[2] == i) {
                document.querySelectorAll('.checkInDayListInput li')[i + First - 1].setAttribute('class', 'delDay')
            }
        }
    }
}

//CheckIn回到上個月
function lastMonthInput(e) {
    e.preventDefault();
    monthInput = monthInput - 1;
    if (monthInput < 0) {
        monthInput = 11
        yearInput = yearInput - 1
    }
    showCheckInCalendar(alreadybook)
    showCheckOutCalendar(alreadybook)
    normalNightCount = 0;
    holidayNightCount = 0;
}

//CheckIn去下個月
function nextMonthInput(e) {
    e.preventDefault();
    monthInput = monthInput + 1;
    if (monthInput > 11) {
        monthInput = 0
        yearInput = yearInput + 1
    }
    showCheckInCalendar(alreadybook)
    showCheckOutCalendar(alreadybook)
    normalNightCount = 0;
    holidayNightCount = 0;
}

//顯示CheckOut的月曆
function showCheckOutCalendar(booked) {
    booked = JSON.parse(localStorage.getItem('alreadybook'))

    let strList = '';
    let strTitle = '';
    let First = firstDay(yearInput, monthInput)
    let MonthN = monthNumber(yearInput, monthInput)

    for (let i = 1; i <= First; i++) {
        strList += `<li></li>`
    }
    for (let i = 1; i <= MonthN; i++) {
        if ((i <= dayInput && yearInput == dateInput.getFullYear() && monthInput == dateInput.getMonth()) || yearInput < dateInput.getFullYear() || (yearInput == dateInput.getFullYear() && monthInput < dateInput.getMonth())) {
            strList += `<li class="delDay">${i}</li>`
        } else if ((Math.ceil((in90DayInput - new Date(yearInput, monthInput, i)) / 86400000)) <= 90 && (Math.ceil((in90DayInput - new Date(yearInput, monthInput, i)) / 86400000)) >= 0) {
            strList += `<li class="emptyDay"><a href="#">${i}</a></li>`
        } else {
            strList += `<li class="delDay">${i}</li>`
        }
    }
    strTitle = monthName[monthInput] + ' ' + yearInput;
    checkOutBarInput.textContent = strTitle
    checkOutDayListInput.innerHTML = strList;
    let g;
    let lens = booked.length;
    for (let i = 0; i < MonthN; i++) {
        for (let n = 0; n < lens; n++) {
            g = booked[n].date.split('-');
            if (g[0] == yearInput && g[1] - 1 == monthInput && g[2] == i) {
                document.querySelectorAll('.checkOutDayListInput li')[i + First - 1].setAttribute('class', 'delDay')
            }
        }
    }
}

//點text 開關checkIn月曆
function toggelcheckIn() {
    showCheckInCalendar(alreadybook);
    if (document.querySelector('.calendarCheckIn').style.display == "" || document.querySelector('.calendarCheckIn').style.display == "none") {
        document.querySelector('.calendarCheckIn').style.display = "block";
    } else if (document.querySelector('.calendarCheckIn').style.display == "block") {
        document.querySelector('.calendarCheckIn').style.display = "none";
        document.querySelector('.calendarCheckOut').style.display = "none";
    }
    if (document.querySelector('.calendarCheckIn').style.display == "block") {
        document.querySelector('.calendarCheckOut').style.display = "none";
    }
}

//點text 開關checkOut月曆
function toggelcheckOut() {
    showCheckOutCalendar(alreadybook);
    if (document.querySelector('.calendarCheckOut').style.display == "" || document.querySelector('.calendarCheckOut').style.display == "none") {
        document.querySelector('.calendarCheckOut').style.display = "block";
    } else if (document.querySelector('.calendarCheckOut').style.display == "block") {
        document.querySelector('.calendarCheckIn').style.display = "none";
        document.querySelector('.calendarCheckOut').style.display = "none";
    }
}

//input內的日曆選擇
function chooseCheck(e) {
    document.querySelector('.calendarCheckIn').style.display = "none";
    document.querySelector('.calendarCheckOut').style.display = "none";
    let price = 0
    let normalNightCount = 0;
    let holidayNightCount = 0;

    if (chooseDate[0] !== '0' && chooseDate[1] !== '0' && e.target.nodeName == 'A') {
        chooseDate = ['0', '0']
        bookingAttay = [];
        normalNightCount = 0;
        holidayNightCount = 0;
    }
    if (e.target.parentNode.parentNode.className == 'checkInDayListInput' && e.target.nodeName == 'A') {
        chooseDate.splice(0, 1)
        chooseDate.push(yearInput + ',' + (monthInput + 1) + ',' + e.target.text)
        whetherPlusZero(yearInput, monthInput, e.target.text)
    } else if (e.target.parentNode.parentNode.className == 'checkOutDayListInput' && e.target.nodeName == 'A') {
        chooseDate.splice(0, 1)
        chooseDate.push(yearInput + ',' + (monthInput + 1) + ',' + e.target.text)
        whetherPlusZero(yearInput, monthInput, e.target.text)
    }
    document.getElementById('checkIn').value = bookingAttay[0]
    document.getElementById('checkOut').value = ''

    if (new Date(chooseDate[0]) > new Date(chooseDate[1]) && chooseDate[0] !== '0') {
        let d2 = new Date(chooseDate[1])
        let totalnight = (new Date(chooseDate[0]) - new Date(chooseDate[1])) / 86400000
        document.getElementById('checkIn').value = bookingAttay[1]
        document.getElementById('checkOut').value = bookingAttay[0]

        for (let i = 0; i < totalnight; i++) {
            d2.setDate(d2.getDate() + 1)
            if (d2.getDay() - 1 == 1 || d2.getDay() - 1 == 2 || d2.getDay() - 1 == 3 || d2.getDay() - 1 == 4) {
                price = price + normalDayPrice
                normalNightCount += 1
            } else {
                price = price + holidayPrice
                holidayNightCount += 1
            }
        }
        if (normalNightCount == 0 && holidayNightCount !== 0) {
            document.querySelector('.totalNight').textContent = '/ ' + holidayNightCount + '晚假日'
            document.querySelector('.countNight').textContent = holidayNightCount + '晚假日'
        } else if (normalNightCount !== 0 && holidayNightCount == 0) {
            document.querySelector('.totalNight').textContent = '/ ' + normalNightCount + '晚平日'
            document.querySelector('.countNight').textContent = normalNightCount + '晚平日'

        } else if (normalNightCount !== 0 && holidayNightCount !== 0) {
            document.querySelector('.totalNight').textContent = '/ ' + normalNightCount + '晚平日' + '，' + holidayNightCount + '晚假日'
            document.querySelector('.countNight').textContent = normalNightCount + '晚平日' + ' / ' + holidayNightCount + '晚假日'
        }
        document.querySelector('.countDay').textContent = totalnight + 1 + '天，'
        document.querySelector('.totalPrice span').textContent = '$' + thousandComma(price)
        document.querySelector('.totalPrice').textContent = '$' + thousandComma(price)
    } else if (new Date(chooseDate[0]) < new Date(chooseDate[1]) && chooseDate[0] !== '0') {
        let d1 = new Date(chooseDate[0])
        let totalnight = (new Date(chooseDate[1]) - new Date(chooseDate[0])) / 86400000
        document.getElementById('checkIn').value = bookingAttay[0]
        document.getElementById('checkOut').value = bookingAttay[1]
        for (let i = 0; i < totalnight; i++) {
            d1.setDate(d1.getDate() + 1)
            if (d1.getDay() - 1 == 1 || d1.getDay() - 1 == 2 || d1.getDay() - 1 == 3 || d1.getDay() - 1 == 4) {
                price = price + normalDayPrice
                normalNightCount += 1
            } else {
                price = price + holidayPrice
                holidayNightCount += 1
            }
        }
        if (normalNightCount == 0 && holidayNightCount !== 0) {
            document.querySelector('.totalNight').textContent = '/ ' + holidayNightCount + '晚假日'
            document.querySelector('.countNight').textContent = holidayNightCount + '晚假日'
        } else if (normalNightCount !== 0 && holidayNightCount == 0) {
            document.querySelector('.totalNight').textContent = '/ ' + normalNightCount + '晚平日'
            document.querySelector('.countNight').textContent = normalNightCount + '晚平日'

        } else if (normalNightCount !== 0 && holidayNightCount !== 0) {
            document.querySelector('.totalNight').textContent = '/ ' + normalNightCount + '晚平日' + '，' + holidayNightCount + '晚假日'
            document.querySelector('.countNight').textContent = normalNightCount + '晚平日' + ' / ' + holidayNightCount + '晚假日'
        }
        document.querySelector('.countDay').textContent = totalnight + 1 + '天，'
        document.querySelector('.totalPrice span').textContent = '$' + thousandComma(price)
        document.querySelector('.totalPrice').textContent = '$' + thousandComma(price)
    }
    checkcheckInText(e)
    checkcheckOutText(e)
}
