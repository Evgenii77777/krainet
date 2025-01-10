const menuBtn = document.querySelector(".menu-btn");
const menuBtnClose = document.querySelector(".menu-close");
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu-nav__item");

menuBtn.addEventListener("click", function () {
  menu.classList.toggle("active");
});

menuBtnClose.addEventListener("click", function () {
  menu.classList.toggle("active");
});

menu.addEventListener("click", function (e) {
  if (e.target === menu) {
    menu.classList.remove("active");
  }
});

menuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", function () {
    menu.classList.remove("active");
  });
});

const regForm = document.forms.regForm;
const firstnameField = regForm.firstname;
const emailField = regForm.email;

const containsOnlyRussianLetters = (string) => /^[а-я]+$/i.test(string);
const isEmailValid = (email) => /^[a-z][a-z._0-9]+@[a-z]+\.[a-z]{2,3}$/i.test(email);

const toggleErrorMessage = ({ condition, errorMessages, errorType }) => {
  if (condition) {
    errorMessages.namedItem(errorType).style.display = "none";
  } else {
    errorMessages.namedItem(errorType).style.display = "block";
  }
};

const isFormValid = () => {
  const errorMessages = document.querySelectorAll(".error");
  return [...errorMessages].every(
    (errorMessage) => window.getComputedStyle(errorMessage).display === "none"
  );
};

const showNotification = (message) => {
  const notification = document.createElement("div");
  notification.className = "notification";

  const messageText = document.createElement("p");
  messageText.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.textContent = "×";

  closeButton.addEventListener("click", () => {
    notification.remove();
  });

  notification.appendChild(messageText);
  notification.appendChild(closeButton);
  document.body.appendChild(notification);
};

regForm.addEventListener("submit", async (e) => {
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

  if (!isFormValid()) {
    return;
  }

  const formData = new FormData(regForm);
  const firstname = formData.get("firstname");
  const email = formData.get("email");
  const content = formData.get("content");

  const postData = async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  };

  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const data = { name: firstname, email, content };

  await postData(url, data);

  regForm.reset();
  showNotification("Форма отправлена!");
});
