let menuBtn = document.querySelector(".menu-btn");
let menuBtnClose = document.querySelector(".menu-close");
let menu = document.querySelector(".menu");
menuBtn.addEventListener("click", function () {
  menu.classList.toggle("active");
});

menuBtnClose.addEventListener("click", function () {
  menu.classList.toggle("active");
});

const regForm = document.forms.regForm;
const firstnameField = regForm.firstname;
const emailField = regForm.email;

const containsOnlyRussianLetters = (string) => {
  return /^[а-я]+$/i.test(string);
};
const isEmailValid = (email) => {
  return /^[a-z][a-z._0-9]+@[a-z]+\.[a-z]{2,3}$/i.test(email);
};
const containsPunctiationMark = (string) => {
  return /[.,?\/#!$%\^&\*;:{}=\-_`~()]/.test(string);
};

const isFormValid = () => {
  const errorFields = document.querySelectorAll(".error");

  return [...errorFields].every((errorField) => {
    return window.getComputedStyle(errorField).display === "none";
  });
};

const toggleErrorMessage = ({ condition, errorMessages, errorType }) => {
  if (condition) {
    errorMessages.namedItem(errorType).style.display = "none";
  } else {
    errorMessages.namedItem(errorType).style.display = "block";
  }
};

regForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstnameErrorMessages = firstnameField.parentElement.children;
  const firstnameFieldValue = firstnameField.value;

  toggleErrorMessage({
    condition: containsOnlyRussianLetters(firstnameFieldValue),
    errorMessages: firstnameErrorMessages,
    errorType: "alphabet",
  });

  const emailErrorMessages = emailField.parentElement.children;
  const emailFieldValue = emailField.value;

  toggleErrorMessage({
    condition: isEmailValid(emailFieldValue),
    errorMessages: emailErrorMessages,
    errorType: "emailError",
  });

  const formData = new FormData(regForm);
  const firstname = formData.get("firstname");
  const email = formData.get("email");
  const content = formData.get("content");

  const postData = async (
    url = "https://jsonplaceholder.typicode.com/todos/1",
    data = { name: firstname, email, content }
  ) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    return response.json();
  };

  if (regForm.checkValidity()) {
    postData();
    regForm.reset();
  }
});
