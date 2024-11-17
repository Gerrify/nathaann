const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const showTime = () => {
  var tgl = new Date();
  var h = tgl.getHours();
  var m = tgl.getMinutes();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;

  document.getElementById("time1").textContent = h + ":" + m;
  document.getElementById("time2").textContent = h + ":" + m;
  document.getElementById("time3").textContent = h + ":" + m;
  setTimeout(showTime, 10000);
};

var music = document.getElementById("bgm"),
  ketik1 = document.getElementById("ketik1"),
  ketik2 = document.getElementById("ketik2"),
  ketik3 = document.getElementById("ketik3"),
  isi1 = document.getElementById("isichat1"),
  isi2 = document.getElementById("isichat2"),
  isi3 = document.getElementById("isichat3");

const ketikAnim = async (e) => {
  const isi = e.nextElementSibling,
    ortuElement = e.parentElement;
  e.style.animation = "fade-out 2s";
  await delay(2000);
  e.style.display = "none";
  isi.style.display = "block";
  isi.style.animation = "fade-in 2s";
  ortuElement.style.width = `${isi.offsetWidth + 16}px`;
  ortuElement.style.height = `${isi.offsetHeight + 20}px`;
};
const chatAnim = async (e) => {
  let nextChatBox = e.parentElement.nextElementSibling,
    chatBoxStyle = e.parentElement.style;
  while (nextChatBox) {
    nextChatBox.style.opacity = "0";
    nextChatBox = nextChatBox.nextElementSibling;
  }
  chatBoxStyle.width = `${e.offsetWidth + 16}px`;
  chatBoxStyle.opacity = "0";
  chatBoxStyle.animation = "chat-anim .5s";
  await delay(500);
  chatBoxStyle.transition = "all 0.25s ease-in-out";
  chatBoxStyle.opacity = "1";
};

async function startAnimation() {
  await chatAnim(ketik1);
  await ketikAnim(ketik1);
  await delay(1000);
  await chatAnim(ketik2);
  await ketikAnim(ketik2);
  await delay(1000);
  await chatAnim(ketik3);
  await ketikAnim(ketik3);
}

// prettier-ignore
const list = [
    "cantik","lucu","imut","gemeshh","pooh","pastel","biru","pink","putih","hitam","ungu",
    "unicorn","nanuna","taruna","mixue","gacoan","udang keju","seafood","bmw","mini cooper",
    "executive","h&m","colorbox","bunga tulip","tulip","ramdhan","rumdun","joni","uti","akung",
    "mas angga","and finally","garaa",
  ];

let count = 0;
const validate = (e) => {
  e.preventDefault(); // cancel submit
  const answer = document.getElementById("text1").value.trim().toLowerCase();
  console.log(answer, list.includes(answer));
  if (!list.includes(answer)) {
    if (count == 3) {
      alert(
        "Seriusan?! lu lupa pw nya seng??? pencet tombol sticker tuh buat liat semua list pw nya."
      );
      return;
    }
    alert("pw nya salah!");
    count++;
    return;
  }
  if (list.includes(answer)) {
    document
      .getElementById("chatScreen")
      .classList.add("top-100", list.includes(answer));
    music.play();
  }
};

// Wait for the window to load completely
window.onload = function() {
  // Hide the preloader
  document.getElementById('preloader').style.display = 'none';
};


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("form1").addEventListener("submit", validate);

  showTime();

  startAnimation();
});
