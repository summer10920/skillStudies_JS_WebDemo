function adclose() {
  document.getElementById("adFull").style.display = "none";
}
function adgoto() {
  window.open(
    "https://zh.wikipedia.org/zh-tw/%E5%88%9D%E9%9F%B3%E6%9C%AA%E4%BE%86",
    "_blank"
  );
}

// 這裡能替代不透過HTML去寫，而是直接用JS去指定event的動作要求。
document.getElementById("adImage").onclick = adgoto; //這裡不加()是避免直接被執行，之前曾提及過。
document.getElementById("adFull").onclick = adclose;
document.getElementById("adClose").onclick = adclose;

function findCook(name) {
  var ckary = document.cookie.split("; "); //割除分開為array
  var getck = ckary.find(function(e) {
    return name == e.substr(0, name.length); //比對每個開頭名字與長度一致時，第一個就回傳設定為getck
  });
  if (getck != undefined) return getck.split("=")[1];
  // var value = getck.split("="); //將=拿掉分為陣列，第[1]格就是我們的值
  // return value[1];
  else return false;
}

//開始指定cookie，有同時有效時間為午夜前
var eatCook = findCook("watchedAd");
if (!eatCook) {
  //還沒有設定
  var end = new Date(); //先取得現在，再修改成午夜前的時間(以UTC時區+0為值)
  end.setHours(23), end.setMinutes(59), end.setSeconds(59);
  document.cookie = "watchedAd=yes;expires=" + end.toUTCString();
} else document.getElementById("adFull").remove();
