const item = document.getElementById("item");
const toDoBox = document.getElementById("to-do-box");


document.addEventListener("DOMContentLoaded", function() {
  const savedItems = JSON.parse(localStorage.getItem("toDoItems")) || [];
  savedItems.forEach(itemText => addToDo(itemText));
});

item.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addToDoAndSave(this.value);
    this.value = "";
  }
});

const addToDoAndSave = (itemText) => {
  addToDo(itemText);
  saveToLocalStorage();
};

const saveToLocalStorage = () => {
  const toDoItems = Array.from(toDoBox.children).map(item => item.firstChild.innerText);
  localStorage.setItem("toDoItems", JSON.stringify(toDoItems));
};

const addToDo = (itemText) => {
  const listItem = document.createElement("li");
  const todoText = document.createElement("span");
  todoText.className = "todo-text";
  todoText.innerText = itemText;
  todoText.contentEditable = true; 

  const editIcon = document.createElement("i");
  editIcon.className = "fa-regular fa-pen-to-square";
  editIcon.addEventListener("click", function (event) {
    event.stopPropagation(); 
    todoText.style.display = "none"; 
    const inputField = document.createElement("input");
    inputField.className = "edit-input"; 
    inputField.value = itemText;
    inputField.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        todoText.innerText = inputField.value;
        listItem.removeChild(inputField);
        todoText.style.display = ""; 
      }
    });
    listItem.insertBefore(inputField, editIcon.nextSibling); 
    inputField.focus();
  });

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-times";
  deleteIcon.addEventListener("click", function () {
    listItem.remove();
    saveToLocalStorage();
  });

  listItem.appendChild(todoText);
  listItem.appendChild(editIcon);
  listItem.appendChild(deleteIcon);

  listItem.addEventListener("click", function () {
    this.classList.toggle("done");
    saveToLocalStorage();
  });

  toDoBox.appendChild(listItem);
  
  
  todoText.addEventListener("input", function () {
    saveToLocalStorage();
  });
};

const nameInput = document.getElementById("name");


document.addEventListener("DOMContentLoaded", function() {
  const savedName = localStorage.getItem("userName");
  if (savedName) {
    nameInput.value = savedName;
  }
});


nameInput.addEventListener("input", function() {
  localStorage.setItem("userName", this.value);
});
