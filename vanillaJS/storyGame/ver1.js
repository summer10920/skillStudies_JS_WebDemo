function gameplay() {
  let name;
  if ((name = prompt("這裡是１／２遊戲，請輸入你的遊戲名字", "大俠"))) {
    alert(name + "是你的名字，請開始闖關");
  } else {
    name = "阿明";
    alert("不想輸入就叫阿明，開始闖關吧!");
  }
  if (confirm(`勇者${name}，你即將進入了充滿陷阱的迷宮，一旦選錯路就會馬上GG，你要開始了嗎?`)) {
    alert("欣賞你的勇氣，開始闖五關吧！");
    if (
      qus(
        "岔路1；遠處發出低沉的怒吼，要前往查看嗎?",
        "原來是沒有廁紙的旅行者，給了他一些廁紙，繼續趕路",
        "因為忽略，找不到廁紙可用的旅行者對你使出了咒殺",
        true
      )
    )
      return;
    if (
      qus(
        "岔路2；有個女人受傷跌在地上，去扶她嗎?",
        "沒有任何豔遇發生",
        "因為遇到碰瓷，你的旅行已提早結束",
        false
      )
    )
      return;
    if (
      qus(
        "岔路3；有個烏龜正被小屁孩欺負，要救嗎?",
        "原來是隻鱉一口咬住小屁孩，自食惡果",
        "原來小屁孩是官二代，你被黑衣人綁走了",
        false
      )
    )
      return;
    if (
      qus(
        "岔路4；有隻狗跟你乞討丸子吃，要給嗎?",
        "小氣的勇者前進吧，沒事兒",
        "來了雞跟猴子，誘拐你立即前往鬼島討罰",
        false
      )
    )
      return;
    if (
      qus(
        "岔路5；不小心掉到密室內，牆上發現有謎題該去解嗎?",
        "你帥氣的解出1+1=2順利逃脫密室",
        "因為你的疑心病，被困在密室內無法離開",
        true
      )
    )
      return;
    alert(`恭喜${name}闖關成功`);
  } else {
    alert("等你準備好挑戰再來吧！");
  }
}
function qus(msg, good, bad, be) {
  if (confirm(msg) == be) alert(good);
  else {
    alert(bad + "\n" + "GAME OVER");
    return true;
  }
}
gameplay();
