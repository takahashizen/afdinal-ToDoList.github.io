const sectionCenter = document.querySelector(".section-center");
const Form = document.querySelector(".to-do-list-form");
const formInput = document.querySelector(".form-input");
const formButton = document.querySelector(".form-btn");
const listContainer = document.querySelector(".list-container");
const listCenter = document.querySelector(".list-center");
const clearButton = document.querySelector(".clear-btn");
// const editButton = document.querySelectorAll(".edit-btn");
// const deleteButton = document.querySelectorAll(".delete-btn");

// Condition
let editFlag = false;
let editID;
let doneTask = new Array();
let ongoingTask = new Array();

Form.addEventListener("submit", function(event){

    event.preventDefault();
    const inputValue = formInput.value;
    const ID = new Date().getTime().toString()

    if(inputValue && editFlag == false){

        const articleElement = document.createElement("article");
        articleElement.setAttribute("class", "list-item");

        const elementAttribute = document.createAttribute("data-id");
        elementAttribute.value = ID;
        articleElement.setAttributeNode(elementAttribute);

        articleElement.innerHTML = `<div class="list-text">
                            <img src="images/unchecked.png" alt="" class="uncheck">
                            <h3 class="list">${inputValue}</h3>
                        </div>
                        <div class="btn-container">
                            <button class="edit-btn">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button class="delete-btn">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>`;
        
        listCenter.appendChild(articleElement);
        listContainer.classList.add("show-list");
        formInput.value = "";
        addToLocalStorage(ID, inputValue);
    }
    else if(inputValue && editFlag == true){

        const listItem = document.querySelectorAll(".list-item");
        listItem.forEach(function(list){

            if(list.dataset.id == editID){
                list.querySelector(".list").textContent = inputValue;
                addToLocalStorage(list.dataset.id, inputValue);
            }
        })
        editFlag = false;
        formInput.value = "";
        formButton.textContent = "Add";
    }
    else{

        alert("Input your task before submit!");
    }
})

// Edit, Delete, and Checklist Button
listCenter.addEventListener("click", function(element){

    const listItem = document.querySelectorAll(".list-item");
    const parentAttribute = element.target.parentElement.parentElement.dataset.id;

    if(element.target.classList.contains("edit-btn")){

        editFlag = true;
        editID = parentAttribute;
        formInput.value = element.target.parentElement.parentElement.querySelector(".list").textContent;
        formButton.textContent = "Edit";
    }
    else if(element.target.classList.contains("delete-btn")){

        listItem.forEach(list => {
            if(list.dataset.id == parentAttribute){
                listCenter.removeChild(list);
                removeFromLocalStorage(list.dataset.id);

                if(listCenter.childElementCount == 0){
                    listContainer.classList.remove("show-list");
                }
            }
        })
    }
    else if(element.target.classList.contains("uncheck")){

        listItem.forEach(list => {
            if(list.dataset.id == parentAttribute){

                let checkBtn = list.querySelector(".uncheck");
                list.querySelector(".list").classList.toggle("checked-list");

                if(list.querySelector(".list").classList.contains("checked-list")){

                    checkBtn.src = `images/checked.png`;
                }
                else{

                    checkBtn.src = `images/unchecked.png`;
                }
            }
        })
    }
})

// Clear All Items
clearButton.addEventListener("click", function(){

    while(listCenter.firstChild){
        listCenter.removeChild(listCenter.firstChild);
    }
    listContainer.classList.remove("show-list");
    localStorage.clear();
})

// Add to Local Storage
function addToLocalStorage(key, value){

    localStorage.setItem(key, value);
}

// Remove From Local Storage
function removeFromLocalStorage(key){

    localStorage.removeItem(key);
}
