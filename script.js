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

const music = document.getElementById("bgm"),
  emoji = new FontFace("emojicon", "url(./asset/font/AppleColorEmoji.ttf)"); 
(ketik1 = document.getElementById("ketik1")),
  (ketik2 = document.getElementById("ketik2")),
  (ketik3 = document.getElementById("ketik3"));

const ketikAnim = async (typingElement) => {
  const chatContainer = typingElement.parentElement;
  const nextChatBoxes = [...chatContainer.parentElement.children].slice(
    [...chatContainer.parentElement.children].indexOf(chatContainer) + 1
  );

  // Fade out all next chat boxes
  nextChatBoxes.forEach((box) => {
    box.style.opacity = "0";
  });

  // Adjust container size and animate typing element
  chatContainer.style.width = `${typingElement.offsetWidth + 20}px`;
  chatContainer.style.height = `${typingElement.offsetHeight + 24}px`;
  chatContainer.style.opacity = "0";
  chatContainer.style.animation = "chat-anim 0.5s ease-in-out";
  await delay(500);

  // Transition in and adjust size dynamically
  chatContainer.style.transition = "all 0.25s ease-in-out";
  chatContainer.style.opacity = "1";

  const chatContentElement = typingElement.nextElementSibling;

  // Typing element fade-out animation
  typingElement.style.animation = "fade-out 2s";
  await delay(2000);

  // Swap visibility of typing and chat content
  typingElement.style.display = "none";
  chatContentElement.style.display = "block";
  chatContentElement.style.animation = "fade-in 2s";

  // Adjust chat container size for content
  chatContainer.style.width = `${chatContentElement.offsetWidth + 20}px`;
  chatContainer.style.height = `${chatContentElement.offsetHeight + 24}px`;
};

async function startAnimation() {
  await ketikAnim(ketik1);
  await delay(1000);
  await ketikAnim(ketik2);
  await delay(1000);
  await ketikAnim(ketik3);
}

// prettier-ignore
const list = [
    "cantik","lucu","imut","gemeshh","vw","merah","biru","hologram","putih","hitam","volkswagen",
    "kimia","itenay","cappucino","hazelnut","matcha","ketoprak","padang","mazda","angga",
    "anggara","athaya","noor","the panturas","panturas","hindia","feast","baskara","oka","ika",
    "mawar","rose","light", "jalanan", "photophile"
  ];

let count = 1;
const validate = (e) => {
  e.preventDefault(); // cancel submit
  const answer = document.getElementById("text1").value.trim().toLowerCase();
  console.log(answer, list.includes(answer));
  if (!list.includes(answer)) {
    if (count == 3) {
      Swal.fire({
        title: "Jawaban Salah!",
        text: "Jawabanmu salah, coba cek kata kunci yang benar!",
        icon: "error",
        confirmButtonText: "Oke",
        showClass:{
          popup: 'animate__animated animate__lightSpeedInRight animate__faster',
        },
        hideClass:{
          popup: 'animate__animated animate__lightSpeedOutRight animate__faster',
        },
        position: 'top-end',

      })
      return
    }
    count++;
    Swal.fire({
      title: "Jawaban Salah!",
      text: `Jawabanmu salah, kamu punya ${ 4 - count } kesempatan`,
      icon: "error",
      confirmButtonText: "Oke",
      showClass:{
        popup: 'animate__animated animate__lightSpeedInRight animate__faster',
      },
      hideClass:{
        popup: 'animate__animated animate__lightSpeedOutRight animate__faster',
      },
    })
    return;
  }
  if (list.includes(answer)) {
    document
      .getElementById("chatScreen")
      .classList.add("top-100", list.includes(answer));
    music.play();
  }
};

const doneLoading = () => {
  document.getElementById("preloader").style.display = "none";
};
// Wait for the window to load completely
window.onload = async function () {
  showTime();
  await emoji.load();
  doneLoading();
  startAnimation();
  document.getElementById("form1").addEventListener("submit", validate);
};
