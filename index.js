const container = document.querySelector(".container");
const buttons = document.querySelectorAll("button");
const input = document.querySelector("input");

const messageElement = document.querySelector(".message");
let message = "";

const handleMessage = (msg) => {
  messageElement.textContent = msg;
  message = msg;
  setTimeout(() => {
    messageElement.textContent = "";
  }, 2000);
};

const handleButtonClick = (event) => {
  const value = event.target.value;

  if (value === "back") {
    input.value = input.value.slice(0, -1);
    return;
  }

  if (value === "=") {
    if (input.value.length === 0) {
      handleMessage("Expression cannot be empty");
      return;
    }
    input.value = eval(input.value);
    return;
  }

  if (value === "all-clear") {
    input.value = "";
    return;
  }

  if (["+", "*", "/"].includes(value) && input.value.length === 0) {
    handleMessage("Expression cannot start with an operator");
    return;
  }

  if (["+", "-", "*", "/"].includes(value)) {
    const lastChar = input.value.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar)) {
      return;
    }
  }

  if (!message) {
    input.value += value;
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

window.addEventListener("keydown", (event) => {
  let key = event.key;

  if (key === "Enter") key = "=";
  if (key === "Escape") key = "all-clear";
  if (key === "Backspace") key = "back";

  const btn = document.querySelector(`button[value="${key}"]`);
  if (btn) {
    event.preventDefault();
    btn.classList.add("active");
    btn.click();

    setTimeout(() => btn.classList.remove("active"), 150);
  }
});
