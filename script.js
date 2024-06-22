var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var bookmarks = [];

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  bookmarks.forEach(function (bookmark, index) {
    displayBookmark(index);
  });
}

function displayBookmark(index) {
  var bookmark = bookmarks[index];
  var newBookmark = `
    <tr>
      <td>${index + 1}</td>
      <td>${bookmark.siteName}</td>
      <td><button class="btn btn-visit btn-success" data-index="${index}">Visit</button></td>
      <td><button class="btn btn-delete btn-danger" data-index="${index}">Delete</button></td>
    </tr>`;
  tableContent.innerHTML += newBookmark;
}

function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}

submitBtn.addEventListener("click", function () {
  if (siteName.value && siteURL.value) {
    var bookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
  } else {
    boxModal.classList.remove("d-none");
  }
});

function deleteBookmark(e) {
  var index = e.target.dataset.index;
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  tableContent.innerHTML = "";
  bookmarks.forEach(function (bookmark, index) {
    displayBookmark(index);
  });
}

tableContent.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-visit")) {
    var index = e.target.dataset.index;
    var url = bookmarks[index].siteURL;
    window.open(url, "_blank");
  }
});

tableContent.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-delete")) {
    deleteBookmark(e);
  }
});

siteName.addEventListener("input", function () {
  validate(siteName, /^\w{3,}(\s+\w+)*$/);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*/);
});

function validate(element, regex) {
  var isValid = regex.test(element.value);
  if (isValid) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

closeBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});

function closeModal() {
  boxModal.classList.add("d-none");
}