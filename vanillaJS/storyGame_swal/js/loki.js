var name;
var mybtn = document.getElementById("btn");
mybtn.addEventListener("click", start);
function gameplay() {
  Swal.fire({
    title: '這裡是猜猜遊戲，請輸入角色名字',
    input: 'text',
    inputValue: '大俠',
    showLoaderOnConfirm: true,
    confirmButtonText: '我取好了',
    cancelButtonText: '略過',
    showCancelButton: true,
    allowOutsideClick: false
  }).then(function (result) {
    if (result.dismiss === 'cancel') {
      name = "阿明";
      Swal.fire({
        title: `不想輸入?別怕~~我不是死神`,
        text: `那就叫你${name}吧，阿明開始闖關吧`,
        allowOutsideClick: false,
        imageUrl: 'files/00.jpg',
        imageHeight: 300
      }).then(start);
    }
    else {
      name = result.value;
      Swal.fire({
        title: `${name}這名字聽起來就專業！`,
        text: '請開始闖關挑戰',
        allowOutsideClick: false,
        imageUrl: 'files/01.jpg',
        imageHeight: 300
      }).then(start);
    }
  });
}
function start() {
  let mission;
  Swal.fire({
    title: `勇者${name}，你即將進入了充滿陷阱的迷宮..`,
    text: "一旦選錯路就會馬上GG，你要開始了嗎?",
    confirmButtonText: '出發!',
    cancelButtonText: '先不要..',
    showCancelButton: true,
    allowOutsideClick: false,
    imageUrl: 'files/10.jpg',
    imageHeight: 300,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.dismiss === 'cancel') {
      Swal.fire({
        title: `等你準備好挑戰再來吧！`,
        allowOutsideClick: false,
        imageUrl: 'files/11.jpg',
        imageHeight: 300
      });
    }
    else {
      Swal.fire({
        title: `欣賞你的勇氣，開始闖五關吧！`,
        allowOutsideClick: false,
        imageUrl: 'files/12.gif',
        imageHeight: 300
      }).then(function () {
        Swal.fire({//lv1
          title: "第1關:詭異的不明聲音",
          text: "遠處發出低沉的怒吼，要前往查看嗎?",
          confirmButtonText: '來瞧瞧!',
          cancelButtonText: '危險不去',
          showCancelButton: true,
          allowOutsideClick: false,
          imageUrl: 'files/20.gif',
          imageHeight: 300,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33'
        }).then((result) => {
          if (result.dismiss === 'cancel') {
            Swal.fire({
              //B
              title: "GAME OVER",
              text: `因為忽略，找不到廁紙可用的道長對你使出了咒殺`,
              confirmButtonText: "重新來過",
              allowOutsideClick: false,
              imageUrl: "files/21.jpg",
              imageHeight: 300
            });
          }
          else {
            Swal.fire({ //G
              title: "過關",
              text: "原來是沒有廁紙的旅行者，給了他一些廁紙，繼續趕路",
              allowOutsideClick: false,
              imageUrl: 'files/22.jpg',
              imageHeight: 300
            }).then(function () {
              Swal.fire({//lv2
                title: "第2關:周杰倫的可愛女人",
                text: "有個女人受傷跌在地上，去扶她嗎?",
                confirmButtonText: '美女怎啦!',
                cancelButtonText: '趕路不去',
                showCancelButton: true,
                allowOutsideClick: false,
                imageUrl: 'files/30.gif',
                imageHeight: 300,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
              }).then((result) => {
                if (result.dismiss !== 'cancel') {
                  Swal.fire({
                    //B
                    title: "GAME OVER",
                    text: "因為遇到碰瓷，你的旅行已提早結束",
                    confirmButtonText: "重新來過",
                    allowOutsideClick: false,
                    imageUrl: "files/31.gif",
                    imageHeight: 300
                  });
                }
                else {
                  Swal.fire({ //G
                    title: "過關",
                    text: "沒有任何豔遇發生",
                    allowOutsideClick: false,
                    imageUrl: 'files/32.jpg',
                    imageHeight: 300
                  }).then(function () {
                    Swal.fire({//lv3
                      title: "第3關:浦島太郎是膩?",
                      text: "有個烏龜正被小屁孩欺負，要救嗎?",
                      confirmButtonText: '唉唷救牠!',
                      cancelButtonText: '趕路不去',
                      showCancelButton: true,
                      allowOutsideClick: false,
                      imageUrl: 'files/40.jpg',
                      imageHeight: 300,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33'
                    }).then((result) => {
                      if (result.dismiss !== 'cancel') {
                        Swal.fire({
                          //B
                          title: "GAME OVER",
                          text: "原來小屁孩是官二代，你被黑衣人綁走了",
                          confirmButtonText: "重新來過",
                          allowOutsideClick: false,
                          imageUrl: "files/41.jpg",
                          imageHeight: 300
                        });
                      }
                      else {
                        Swal.fire({ //G
                          title: "過關",
                          text: "原來是隻鱉，一口反擊了小屁孩，自食惡果",
                          allowOutsideClick: false,
                          imageUrl: 'files/42.gif',
                          imageHeight: 300
                        }).then(function () {
                          Swal.fire({//lv4
                            title: "第4關:這次變桃太郎膩?",
                            text: "有隻狗跟你乞討丸子吃，要給嗎?",
                            confirmButtonText: '餓壞了，吃吧!',
                            cancelButtonText: '想吃去買阿',
                            showCancelButton: true,
                            allowOutsideClick: false,
                            imageUrl: 'files/50.gif',
                            imageHeight: 300,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33'
                          }).then((result) => {
                            if (result.dismiss !== 'cancel') {
                              Swal.fire({
                                //B
                                title: "GAME OVER",
                                text: "又來了雞跟猴子，誘拐你立即前往鬼島討罰",
                                confirmButtonText: "重新來過",
                                allowOutsideClick: false,
                                imageUrl:
                                  "files/51.jpg",
                                imageHeight: 300
                              });
                            }
                            else {
                              Swal.fire({ //G
                                title: "過關",
                                text: "狗生氣地朝你揮了一拳？沒事發生...前進吧！小氣的勇者",
                                allowOutsideClick: false,
                                imageUrl: 'files/52.jpg',
                                imageHeight: 300
                              }).then(function () {
                                Swal.fire({//lv5
                                  title: "第5關:掉落的陷阱?",
                                  text: "不小心掉到密室內，牆上發現有謎題該去解嗎?",
                                  confirmButtonText: '解開!',
                                  cancelButtonText: '小心有詐',
                                  showCancelButton: true,
                                  allowOutsideClick: false,
                                  imageUrl: 'files/60.jpg',
                                  imageHeight: 300,
                                  confirmButtonColor: '#3085d6',
                                  cancelButtonColor: '#d33'
                                }).then((result) => {
                                  if (result.dismiss === 'cancel') {
                                    Swal.fire(
                                      {
                                        //B
                                        title:"GAME OVER",
                                        text:"因為你的疑心病，被困在密室內無法離開",
                                        confirmButtonText:"重新來過",
                                        allowOutsideClick: false,
                                        imageUrl:"files/61.gif",
                                        imageHeight: 300
                                      }
                                    );
                                  }
                                  else {
                                    Swal.fire({ //G
                                      title: "過關",
                                      text: "你帥氣的解出1+1=2順利逃脫密室",
                                      allowOutsideClick: false,
                                      imageUrl: 'files/62.jpg',
                                      imageHeight: 300
                                    }).then(function () {
                                      finish(1);
                                    });
                                  }
                                });
                              });
                            }
                          });
                        });
                      }
                    });
                  });
                }
              });
            });
          }
        });
      });
    }
  });
}
function finish(e) {
  if (e) {
    document.body.style.backgroundImage = "url('files/bg2.jpg')";
    mybtn.removeEventListener("click", start);
    mybtn.addEventListener("click", function(){
      location.reload();
    });
    mybtn.value = "恭喜過關";
  }
}
gameplay();