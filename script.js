const hoverSound = document.getElementById("hoverSound");
const bgMusic = document.getElementById("bgMusic");

window.addEventListener("load", () => {
  bgMusic.volume = 0.25;
  bgMusic.play().catch(() => console.log("Autoplay blocked"));
});

document.body.addEventListener("click", () => {
  if (bgMusic.paused) bgMusic.play();
});

document.body.addEventListener("mouseover", (e) => {
  if (["BUTTON", "DIV"].includes(e.target.tagName)) {
    hoverSound.currentTime = 0;
    hoverSound.play();
  }
});

document.addEventListener("mousemove", (e) => {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = `${e.pageX}px`;
  sparkle.style.top = `${e.pageY}px`;
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1000);

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  const angle = 120 + (x - 0.5) * 40 + (y - 0.5) * 40;
  document.body.style.setProperty("--bg-angle", `${angle}deg`);
});

const toggleBtn = document.getElementById("toggleBtn");
const hiddenPara = document.getElementById("hiddenPara");
toggleBtn.onclick = () => {
  const isHidden = hiddenPara.style.display === "none";
  hiddenPara.style.display = isHidden ? "block" : "none";
  toggleBtn.textContent = isHidden ? "Hide" : "Show again";
};

document.querySelectorAll(".box").forEach((box) => {
  box.onmouseover = () => box.style.transform = "scale(1.1)";
  box.onmouseout = () => box.style.transform = "scale(1)";
});

const inputs = document.querySelectorAll("input[type=text]");
const result = document.getElementById("result");

inputs.forEach((inp) => {
  inp.onchange = () => {
    if (inp.value.length < 3) {
      result.textContent = "❌ Too short!";
      result.style.color = "red";
    } else {
      result.textContent = "✅ Looks good!";
      result.style.color = "#0f0";
    }
  };
});

const form = document.getElementById("formId");
const msgDiv = document.getElementById("message");

form.onsubmit = (e) => {
  e.preventDefault();
  const [name, email, age] = [...form.querySelectorAll("input")].map(i => i.value.trim());

  let error = "";
  if (name.length < 2) error += "Name too short. ";
  if (!email.includes("@")) error += "Invalid email. ";
  if (!(age > 0)) error += "Age must be positive. ";

  msgDiv.textContent = error ? "❌ " + error : `✅ Welcome, ${name}!`;
  msgDiv.style.color = error ? "red" : "lime";

  if (!error) form.reset();
};

const themeBtns = document.getElementsByName("theme");
const themeMsg = document.getElementById("themeMsg");

themeBtns.forEach((t) => {
  t.onchange = () => {
    document.body.style.background = t.value === "Dark"
      ? "linear-gradient(135deg,#232526,#414345)"
      : "linear-gradient(135deg, var(--color1), var(--color2), var(--color3), var(--color4))";

    themeMsg.textContent = `Current theme: ${t.value}`;
  };
});

const taskList = document.getElementById("taskList");
const newTask = document.getElementById("newTask");
const addTaskBtn = document.getElementById("addTaskBtn");

newTask.oninput = () => {
  addTaskBtn.disabled = newTask.value.trim().length < 3;
};

addTaskBtn.onclick = () => {
  const val = newTask.value.trim();
  if (!val) return;

  const li = document.createElement("li");
  li.textContent = val;
  li.onclick = () => li.classList.toggle("done");

  taskList.appendChild(li);
  newTask.value = "";
  addTaskBtn.disabled = true;
};
