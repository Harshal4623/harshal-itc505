const input = document.getElementById("numbers");
const parsed = document.getElementById("parsed");
const result = document.getElementById("result");
const stepsEl = document.getElementById("steps");

document.getElementById("btnSort").addEventListener("click", () => {
  const arr = parseNumbers(input.value);

  if (arr.length === 0) {
    alert("Enter numbers like: 9, 3, 7");
    return;
  }

  parsed.textContent = JSON.stringify(arr);

  const { sorted, log } = bubbleSortWithLog(arr);
  result.textContent = JSON.stringify(sorted);
  stepsEl.textContent = log.join("\n");
});

document.getElementById("btnRandom").addEventListener("click", () => {
  const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
  input.value = arr.join(", ");
  parsed.textContent = JSON.stringify(arr);
  result.textContent = "(waiting…)";
  stepsEl.textContent = "(waiting…)";
});

document.getElementById("btnClear").addEventListener("click", () => {
  input.value = "";
  parsed.textContent = "(waiting…)";
  result.textContent = "(waiting…)";
  stepsEl.textContent = "(waiting…)";
});

function parseNumbers(text) {
  return text
    .split(",")
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => Number(s))
    .filter(n => Number.isFinite(n));
}

function bubbleSortWithLog(inputArr) {
  const a = [...inputArr];
  const log = [];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }

    log.push(`Pass ${i + 1}: ${JSON.stringify(a)}`);

    if (!swapped) {
      log.push("No swaps → already sorted. Stopping early.");
      break;
    }
  }

  return { sorted: a, log };
}