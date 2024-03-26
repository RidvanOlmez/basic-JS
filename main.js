const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

let editElement;
let editFlag = false;
let editID = "";

form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);


function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();

    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");

        element.innerHTML = `
        <p class="title">${value}</p>
         <div class="btn-container">
        <button type="button" class="edit-btn">
         <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button type="button" class="delete-btn">
        <i class="fa-solid fa-trash"></i>
        </button>
        </div>
        `;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);



        list.appendChild(element);
        displayAlert("successful", "success");
        container.classList.add("show-container");
        grocery.value = "";
    }else if(value !== "" && editFlag){
        editElement.innerHTML = value;
        displayAlert("Changed", "success");
    }else {

    }
}

function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);

    displayAlert("removed", "danger");
}

function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;


    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent="Edit";

}

function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    console.log(items);
    if (items.length > 0) {
      items.forEach((item) => list.removeChild(item));
    }
    container.classList.remove("show-container"); 
    displayAlert("Empty Lists", "danger");
  }
