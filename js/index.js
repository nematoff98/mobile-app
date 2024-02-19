const oldPinInputs = document.querySelectorAll('.old-pin-digit');
const newPinInputs = document.querySelectorAll('.new-pin-digit');
let oldPinCode = ''
let newPinCode = ''
const oldPinBlock = document.getElementById('oldPin')
const newPinBlock = document.getElementById('newPin')
const backIcon = document.getElementById('backIcon')
const nextIcon = document.getElementById('nextIcon')
const placeholderOldPin = document.getElementById('placeholderOldPin')
const placeholderNewPin = document.getElementById('placeholderNewPin')
const placeholderNewRepeatPin = document.getElementById('placeholderNewRepeatPin')
const confirmInput = document.getElementsByClassName('new-pin-digit-confirm')
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
  placeholderOldPin.innerText = PLACEHOLDERS[`ENTER_EXISTING_PING_${lang}`]
  placeholderNewPin.innerText = PLACEHOLDERS[`NEW_PIN_${lang}`]
  placeholderNewRepeatPin.innerText = PLACEHOLDERS[`REPEAT_NEW_PIN_${lang}`]
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

function validateSingleDigitInput(event) {
  var inputElement = event.target;
  var inputValue = inputElement.value;

  // Faqat bitta raqam qabul qilish
  var numericValue = inputValue.replace(/\D/g, '');

  // Raqam uzunligini tekshirish va boshqa belgilarni o'chirish
  if (numericValue.length > 1) {
    numericValue = numericValue.substring(0, 1);
  }

  // O'zgarmagan qiymatni inputga tiklash
  inputElement.value = numericValue;
}

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
