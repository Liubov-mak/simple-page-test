"use strict";

//Simple validation
var form = document.querySelector('.form');
if (form) {
  var userName = form.querySelector(".user-name");
  var sendForm = function sendForm() {
    var successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';
    var statusMessage = document.createElement('div');
    statusMessage.style.color = '#43ABF0';
    statusMessage.style.marginTop = '25px';
    statusMessage.style.textAlign = 'center';
    var clear = function clear() {
      setTimeout(function () {
        userName.value = '';
        form.querySelectorAll('.form__wrapper').forEach(function (el) {
          return el.classList.remove('success');
        });
        statusMessage.textContent = '';
      }, 3000);
    };
    function showError(input, message) {
      var formField = input.parentElement;
      formField.className = "form__wrapper error";
      if (formField.className = "form__wrapper error") {
        var alert_message = formField.querySelector(".alert-message");
        alert_message.classList.add('active');
        alert_message.innerText = message;
      }
    }
    function showSuccess(input) {
      var formField = input.parentElement;
      formField.className = "form__wrapper success";
      if (formField.className = "form__wrapper success") {
        var alert_message = formField.querySelector(".alert-message");
        alert_message.classList.remove('active');
      }
    }
    if (userName.value === "" || userName.value.length < 3) {
      showError(userName, "Поле не может быть пустым");
    } else {
      showSuccess(userName);
      form.appendChild(statusMessage);
      statusMessage.textContent = successMessage;
      clear();
    }
    userName.addEventListener('input', function () {
      showSuccess(userName);
    });
    if (userName.value !== "") {
      showSuccess(userName);
    }
  };
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    sendForm();
  });
}
var toggleSelect = function toggleSelect() {
  var select = document.querySelector('.form__select');
  var links = document.querySelectorAll('.form__select-list a');
  var span = select.querySelector('span');
  select.addEventListener('click', function () {
    this.classList.toggle('active');
  });
  links.forEach(function (element) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      span.innerHTML = evt.currentTarget.textContent;
    });
  });
};
toggleSelect();
var changeRange = function changeRange() {
  var slider = document.getElementById('sliderRange'),
    output = document.getElementById('count');
  output.innerHTML = slider.value + ' %';
  slider.oninput = function () {
    output.innerHTML = this.value + ' %';
  };
};
changeRange();
function addFile() {
  var fileInput = document.querySelector('#file-input'),
    textSelector = document.querySelector('.form__file-span'),
    remove = document.querySelector('.remove');
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      var fileList = [];
      for (var i = 0; i < fileInput.files.length; i++) {
        fileList.push(fileInput.files[i]);
      }
      fileList.forEach(function (file) {
        uploadFile(file);
      });
    });
    var uploadFile = function uploadFile(file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Файл должен быть не более 5 МБ.");
        return;
      }
      textSelector.textContent = file.name;
      remove.style.display = 'block';
    };
    remove.addEventListener('click', function () {
      remove.style.display = 'none';
      textSelector.textContent = 'Прикрепите файл';
      textSelector.style.textTransform = 'uppercase';
    });
  }
}
addFile();
var openMenu = function openMenu() {
  var burger = document.querySelector('.js-burger'),
    menu = document.querySelector('.header__nav');
  burger.addEventListener("click", function () {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
  });
};
openMenu();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(function (registration) {
    console.log(registration);
  })["catch"](function (error) {
    console.log(error);
  });
}