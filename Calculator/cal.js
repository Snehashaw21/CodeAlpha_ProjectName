const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const historyBox = document.getElementById("history");

let currentInput = "";

function addToHistory(expression, result) {
  const entry = document.createElement("div");
  entry.textContent = `${expression} = ${result}`;
  entry.classList.add("history-item");

  entry.addEventListener("click", () => {
    currentInput = result;
    display.value = currentInput;
  });

  historyBox.prepend(entry); 
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (btn.classList.contains("clear")) {
      currentInput = ""; 
    } else if (btn.classList.contains("del")) {
      currentInput = currentInput.slice(0, -1); 
    } else if (value === "=") {
      try {
        const expression = currentInput
          .replace(/÷/g, "/")
          .replace(/×/g, "*")
          .replace(/−/g, "-");
        const result = eval(expression).toString();
        addToHistory(currentInput, result);
        currentInput = result;
      } catch {
        currentInput = "Error";
      }
    } else {
      currentInput += value;
    }

    display.value = currentInput;
  });
});
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/", "."].includes(e.key)) {
    currentInput += e.key;
  } else if (e.key === "Enter") {
    try {
      const result = eval(currentInput).toString();
      addToHistory(currentInput, result);
      currentInput = result;
    } catch {
      currentInput = "Error";
    }
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  } else if (e.key.toLowerCase() === "c") {
    currentInput = ""; 
  }
  display.value = currentInput;
});
