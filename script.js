const CONFIG = {
  name: "فاطمه رحیمی",
  firstName: "فاطمه",
  birthday: "۲۱ مرداد",
  accentColor: "#f08bb5",
  favoriteColor: "صورتی",
  favoriteFlower: "لیلیوم"
};

document.documentElement.style.setProperty("--accent", CONFIG.accentColor);

const screens = {
  boot: document.getElementById("boot"),
  code: document.getElementById("code"),
  error: document.getElementById("error"),
  birthday: document.getElementById("birthday"),
  secret: document.getElementById("secret"),
  finish: document.getElementById("finish")
};

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(element, text, speed = 22) {
  element.textContent = "";
  for (const char of text) {
    element.textContent += char;
    await sleep(char === "\n" ? speed * 3 : speed);
  }
}

const bootText = `> در حال راه‌اندازی برنامه...

> بررسی تاریخ...

✓ تاریخ شناسایی شد
✓ رویداد مهم پیدا شد
✓ اطلاعات مقصد دریافت شد

نام: ${CONFIG.name}
تاریخ: ${CONFIG.birthday}

> آماده اجرای برنامه...`;

(async function boot() {
  await typeText(document.getElementById("bootText"), bootText, 18);
  document.getElementById("runBtn").classList.remove("hidden");
})();

document.getElementById("runBtn").addEventListener("click", async () => {
  showScreen("code");

  const code = `Person ${CONFIG.firstName} = new Person("${CONFIG.firstName}");

${CONFIG.firstName}.setBirthday("${CONFIG.birthday}");

if (${CONFIG.firstName}.isSpecial()) {
    happiness++;
    smile.activate();
}

birthday.message = "امروز روز توست.";
favorite.color = "${CONFIG.favoriteColor}";
favorite.flower = "${CONFIG.favoriteFlower}";`;

  await typeText(document.getElementById("codeText"), code, 13);

  const bar = document.getElementById("progressBar");
  const percent = document.getElementById("compilePercent");
  const status = document.getElementById("compileStatus");

  for (let i = 0; i <= 100; i++) {
    bar.style.width = `${i}%`;
    percent.textContent = `${i}%`;
    await sleep(18);
  }

  status.textContent = "✓ اجرا با موفقیت انجام شد.";
  status.style.color = "var(--success)";
  document.getElementById("continueBtn").classList.remove("hidden");
});

document.getElementById("continueBtn").addEventListener("click", () => {
  showScreen("error");
});

document.getElementById("checkErrorBtn").addEventListener("click", async () => {
  showScreen("birthday");
});

document.getElementById("secretBtn").addEventListener("click", () => {
  showScreen("secret");
});

document.getElementById("openSecretBtn").addEventListener("click", async () => {
  document.getElementById("secretQuestion").classList.add("hidden");
  const content = document.getElementById("secretContent");
  content.classList.remove("hidden");

  const paragraphs = content.querySelectorAll("p");
  paragraphs.forEach((p, index) => {
    p.style.opacity = "0";
    p.style.transform = "translateY(8px)";
    setTimeout(() => {
      p.style.transition = "opacity .6s ease, transform .6s ease";
      p.style.opacity = "1";
      p.style.transform = "translateY(0)";
    }, index * 500);
  });
});

document.getElementById("finishBtn").addEventListener("click", () => {
  showScreen("finish");
  createHearts();
});

function createHearts() {
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.textContent = "♥";
    heart.style.position = "fixed";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.bottom = "-20px";
    heart.style.color = CONFIG.accentColor;
    heart.style.opacity = `${0.25 + Math.random() * 0.5}`;
    heart.style.fontSize = `${10 + Math.random() * 16}px`;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "30";
    heart.style.transition = `transform ${3 + Math.random() * 3}s linear, opacity 3s linear`;
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = `translateY(-${window.innerHeight + 80}px) translateX(${(Math.random() - .5) * 120}px) rotate(${(Math.random() - .5) * 80}deg)`;
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 6500);
  }
}
