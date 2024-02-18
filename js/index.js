const oldPinInputs = document.querySelectorAll('.old-pin-digit');
const newPinInputs = document.querySelectorAll('.new-pin-digit');
let oldPinCode = ''
let newPinCode = ''


function updateOldPinCode() {
  oldPinCode = Array.from(oldPinInputs).map(input => input.value).join('');
  console.log(oldPinCode);
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
      numbers.innerHTML += `<button onclick="removeLastDigitFromOldPin()">${resultArray[i]}</button>`
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
      numbers.innerHTML += `<button></button>`
    }
    if (resultArray[i] === 'delete') {
      numbers.innerHTML += `<button onclick="removeLastDigitFromNewPin()">${resultArray[i]}</button>`
    } else if (resultArray[i] !== null && resultArray[i] !== 'delete') {
      numbers.innerHTML += `<button onclick="appendToNewPin(${resultArray[i]})">${resultArray[i]}</button>`
    }
  }
}

shuffleOldArray()
shuffleNewArray()

function changeOldPin(event) {
  console.log('logged');
}
