<!--Loader-->
<div id="loader" class="loader"></div>

//Loader

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
  console.log("inputFields", inputFields);
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
  const appName = searchParams.get("app") || PARTNERS.DEFAULT;

  // Ilovani nomiga asosan rasm manzilini aniqlash
  const imagePath = `./assets/img/${
    PARTNERS[appName].charAt(0).toUpperCase() + PARTNERS[appName].slice(1)
  }_Logo.png`;

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