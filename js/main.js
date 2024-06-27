// inputs
let yearInput = document.querySelector(".fields .year-field #year-input");
let monthInput = document.querySelector(".fields .month-field #month-input");
let dayInput = document.querySelector(".fields .day-field #day-input");
let allInputs = document.querySelectorAll("form .fields input");
let dayError = document.querySelector(".day-field .error");
let monthError = document.querySelector(".month-field .error");
let yearError = document.querySelector(".year-field .error");
// outputs
let yearsResult = document.querySelector(".result .years-result span");
let monthsResult = document.querySelector(".result .months-result span");
let daysResult = document.querySelector(".result .days-result span");
// on input events

let currentYear = new Date().getFullYear();
let isValid = false;

dayInput.addEventListener("input", () => {
  if (dayInput.value.length === 2) {
    monthInput.focus();
  }
});
monthInput.addEventListener("input", () => {
  if (monthInput.value.length === 2) {
    yearInput.focus();
  }
});
yearInput.addEventListener("input", () => {
  if (yearInput.value.length === 4) {
    yearInput.blur();
  }
});
// on submition
let submitBtn = document.querySelector("form .btn");

submitBtn.addEventListener("click", (e) => {
  if (+dayInput.value) {
    if (
      +dayInput.value > 31 ||
      +dayInput.value < 1 ||
      +dayInput.value > daysInMonth(+monthInput.value, +yearInput.value)
    ) {
      dayError.textContent = "Must be a valid day";
      isValid = false;
      clearResult();
    } else {
      dayError.textContent = "";
      isValid = true;
    }
  } else {
    clearResult();
    dayError.textContent = "This field is required";
    isValid = false;
  }
  if (monthInput.value) {
    if (monthInput.value < 1 || monthInput.value > 12) {
      monthError.textContent = "Must be a valid month";
      isValid = false;
      clearResult();
    } else {
      monthError.textContent = "";
    }
  } else {
    monthError.textContent = "This field is required";
    clearResult();
  }
  if (yearInput.value) {
    if (yearInput.value > currentYear) {
      yearError.textContent = "Must be in the past";
      isValid = false;
      clearResult();
    } else {
      yearError.textContent = "";
    }
  } else {
    yearError.textContent = "This field is required";
    clearResult();
    isValid = false;
  }
  calculate();
});

function calculate() {
  if (isValid) {
    let yearValue = Number(yearInput.value);
    let monthValue = Number(monthInput.value);
    let dayValue = Number(dayInput.value);
    let birthdate = new Date(
      `${yearValue}/${monthValue}/${dayValue}`
    ).getTime();
    let datenow = new Date().getTime();
    let diffdate = datenow - birthdate;
    yearsResult.innerHTML = Math.floor(
      diffdate / (1000 * 60 * 60 * 24 * 365.25)
    );
    monthsResult.innerHTML = Math.floor(
      (diffdate % (1000 * 60 * 60 * 24 * 365.25)) /
        ((1000 * 60 * 60 * 24 * 365.25) / 12)
    );
    daysResult.innerHTML = Math.floor(
      (diffdate % ((1000 * 60 * 60 * 24 * 365.25) / 12)) / 1000 / 60 / 60 / 24
    );
  }
}

// days in month function
function daysInMonth(month, year) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
    default:
      return -1;
  }
}

function clearResult() {
  daysResult.innerHTML = "- -";
  monthsResult.innerHTML = "- -";
  yearsResult.innerHTML = "- -";
}
