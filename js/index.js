const PARTNERS = {
  UZUM: 'uzum',
  IPAKYOLI: 'ipakyoli',
  UZCARD: 'uzcard'
}

const oldPinInputs = document.querySelectorAll('.old-pin-digit');
const newPinInputs = document.querySelectorAll('.new-pin-digit');
let oldPinCode = ''
let newPinCode = ''
const oldPinBlock = document.getElementById('oldPin')
const newPinBlock = document.getElementById('newPin')
const successBlock = document.getElementById('successBlock')
const errorBlock = document.getElementById('errorBlock')
const successMessageBlock = document.getElementById('successMessageBlock')
const backIcon = document.getElementById('backIcon')
const nextIcon = document.getElementById('nextIcon')
const placeholderOldPin = document.getElementById('placeholderOldPin')
const placeholderNewPin = document.getElementById('placeholderNewPin')
const placeholderNewRepeatPin = document.getElementById('placeholderNewRepeatPin')
let isError = false
const PLACEHOLDERS = {
  INVALID_PIN_ENTER_ru: 'Введена неверная пин',
  ENTER_EXISTING_PING_ru: 'Введите текущий пин',
  NEW_PIN_ru: 'Введите новый пин',
  REPEAT_NEW_PIN_ru: 'Повторите новый пин',
  ENTER_EXISTING_PING_uz: 'Mavjud pinni kiriting',
  NEW_PIN_uz: 'Yangi pinni kiriting',
  REPEAT_NEW_PIN_uz: 'Yangi pinni qayta kiriting',
  INVALID_PIN_ENTER_uz: 'Noto\'g\'ri pin kiritldi',
  INVALID_PIN_ENTER_en: 'Invalid pin entered',
  ENTER_EXISTING_PING_en: 'Enter your current pin',
  NEW_PIN_en: 'Enter a new pin',
  REPEAT_NEW_PIN_en: 'Repeat new pin',
}

function getLang() {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang');
  if(lang) {
    placeholderOldPin.innerText = PLACEHOLDERS[`ENTER_EXISTING_PING_${lang}`]
    placeholderNewPin.innerText = PLACEHOLDERS[`NEW_PIN_${lang}`]
    placeholderNewRepeatPin.innerText = PLACEHOLDERS[`REPEAT_NEW_PIN_${lang}`]
  } else {
    placeholderOldPin.innerText = PLACEHOLDERS[`ENTER_EXISTING_PING_uz`]
    placeholderNewPin.innerText = PLACEHOLDERS[`NEW_PIN_uz`]
    placeholderNewRepeatPin.innerText = PLACEHOLDERS[`REPEAT_NEW_PIN_uz`]
  }
}

getLang()

function updateOldPinCode() {
  oldPinCode = Array.from(oldPinInputs).map(input => input.value).join('');
  if(oldPinCode.length === 4) {
    oldPinBlock.style.display = 'none'
    newPinBlock.style.display = 'block'
    backIcon.style.display = 'block'
  }
  if(oldPinCode.length < 4) {
    nextIcon.style.display = 'none'
  }
}

function updateNewPinCode() {
  newPinCode = Array.from(newPinInputs).map(input => input.value).join('');
  console.log(newPinCode);
  if(newPinCode.length === 8) {
    showLoader()
    setTimeout(() => {
      hideLoader()
      successBlock.style.display = 'none'
      successMessageBlock.style.display = 'flex'
    }, 1000)
  }
}
function appendToOldPin(number) {
  const emptyInput = Array.from(oldPinInputs).find(input => input.value === '');
  if (emptyInput) {
    emptyInput.value = number;
    updateOldPinCode()
  }
}

function removeLastDigitFromOldPin() {
  const lastInput = Array.from(oldPinInputs).reverse().find(input => input.value !== '');
  if (lastInput) {
    lastInput.value = '';
    updateOldPinCode()
  }
}

function appendToNewPin(number) {
  const emptyInput = Array.from(newPinInputs).find(input => input.value === '');
  if (emptyInput) {
    emptyInput.value = number;
    updateNewPinCode()
  }
}

function removeLastDigitFromNewPin() {
  const lastInput = Array.from(newPinInputs).reverse().find(input => input.value !== '');
  if (lastInput) {
    lastInput.value = '';
    updateNewPinCode()
  }
}

// function validateSingleDigitInput(event) {
//   var inputElement = event.target;
//   var inputValue = inputElement.value;
//
//   // Faqat bitta raqam qabul qilish
//   var numericValue = inputValue.replace(/\D/g, '');
//
//   // Raqam uzunligini tekshirish va boshqa belgilarni o'chirish
//   if (numericValue.length > 1) {
//     numericValue = numericValue.substring(0, 1);
//   }
//
//   // O'zgarmagan qiymatni inputga tiklash
//   inputElement.value = numericValue;
// }

function shuffleOldArray() {
  const resultArray = []
  const numbers = document.getElementById('old-pin-keyboard')
  do {
    const number = Math.floor(Math.random() * 10)
    if (!resultArray.includes(number)) resultArray.push(number)
  } while (resultArray.length < 10)

  resultArray.splice(9, 0, null)
  resultArray.push('delete')

  for (let i = 0; i < resultArray.length; i++) {
    if (resultArray[i] === null) {
      numbers.innerHTML += `<button></button>`
    }
    if (resultArray[i] === 'delete') {
      numbers.innerHTML += `<button onclick="removeLastDigitFromOldPin()" class="button">
                               <img src="./assets/img/delete.svg">
                            </button>`
    } else if (resultArray[i] !== null && resultArray[i] !== 'delete') {
      numbers.innerHTML += `<button onclick="appendToOldPin(${resultArray[i]})">${resultArray[i]}</button>`
    }
  }
}

function shuffleNewArray() {
  const resultArray = []
  const numbers = document.getElementById('new-pin-keyboard')
  do {
    const number = Math.floor(Math.random() * 10)
    if (!resultArray.includes(number)) resultArray.push(number)
  } while (resultArray.length < 10)

  resultArray.splice(9, 0, null)
  resultArray.push('delete')
  for (let i = 0; i < resultArray.length; i++) {
    if (resultArray[i] === null) {
      numbers.innerHTML += `<button class="button"></button>`
    }
    if (resultArray[i] === 'delete') {
      numbers.innerHTML += `<button onclick="removeLastDigitFromNewPin()" class="button">
                               <img src="./assets/img/delete.svg">
                            </button>`
    } else if (resultArray[i] !== null && resultArray[i] !== 'delete') {
      numbers.innerHTML += `<button onclick="appendToNewPin(${resultArray[i]})" class="button">${resultArray[i]}</button>`
    }
  }
}

shuffleOldArray()
shuffleNewArray()

function backOldPin() {
  newPinCode = ''
  oldPinBlock.style.display = 'block'
  newPinBlock.style.display = 'none'
  backIcon.style.display = 'none'
  nextIcon.style.display = 'block'
}

function toNewPin() {
  if(oldPinCode.length === 4) {
    oldPinBlock.style.display = 'none'
    newPinBlock.style.display = 'block'
    backIcon.style.display = 'block'
    nextIcon.style.display = 'none'
  }
}

function validateSingleDigitInput(event) {
  if (areAllInputsFilled()) {
    showLoader();

    disableInputFields();

    setTimeout(function () {
      hideLoader();

      enableInputFields();
    }, 2000);
  }
}

function areAllInputsFilled() {
  var inputFields = document.querySelectorAll(".pin-inputs__input");
  for (var i = 0; i < inputFields.length; i++) {
    if (inputFields[i].value.trim() === "") {
      return false;
    }
  }
  return true;
}

function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function disableInputFields() {
  var inputFields = document.querySelectorAll(".pin-digit");
  inputFields.forEach(function (input) {
    input.disabled = true;
  });
}

function enableInputFields() {
  var inputFields = document.querySelectorAll(".pin-digit");
  inputFields.forEach(function (input) {
    input.disabled = false;
  });
}


//updateLogoImage
function updateLogoImage() {
  // URL manzilidan ilovani nomini olish
  const searchParams = new URLSearchParams(window.location.search);
  let appName = searchParams.get("app") || PARTNERS.UZCARD;
  let queryId = searchParams.get('id')

  successMessageBlock.style.display = 'none'

  if(!queryId) {
    successBlock.style.display = 'none'
    errorBlock.style.display = 'flex'
  } else {
    successBlock.style.display = 'block'
    errorBlock.style.display = 'none'
  }


  // Ilovani nomiga asosan rasm manzilini aniqlash

  const imagePath = `./assets/img/${PARTNERS[appName.toUpperCase()]}_Logo.png`;
  // Logotip rasmining src atributini yangilash
  const logoImage = document.getElementById("logoImage");
  if (logoImage) {
    logoImage.src = imagePath;
  }
  // Fon rangini yangilash
  document.body.className = `light ${appName}`;
}

// Sahifani yuklashda funksiyani chaqirish
window.onload = updateLogoImage;

// URL manzilidagi o'zgarishlarni tinglash
window.onpopstate = function () {
  updateLogoImage();
};
