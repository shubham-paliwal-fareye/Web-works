let inputText = document.getElementById("input-text");
let todoBtn = document.getElementById("todo-btn");
let list = document.getElementById("list");


let todoItems = [];

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  console.log(todoItems);
}



function addListeners() {
  todoBtn.addEventListener("click", submitTODO);
}

function submitTODO() {
  let textValue = inputText.value;
  renderListWithNewItems(textValue);
}

function renderListWithNewItems(value) {
  let li = document.createElement("li");
  let btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.addEventListener("click", (ele) => {
    console.log(ele, li);
    list.removeChild(li);
  });
  let span = document.createElement("span");
  span.innerHTML = value;
  li.className = "list-item";
  li.appendChild(span);
  li.appendChild(btn);
  list.appendChild(li);
  inputText.innerHTML = "";

}

fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then(function(data) {
    let tempData = data;
            return tempData.map(function(entry) {
                if(todoItems.length < 10 && entry.completed==false){
                let li = document.createElement("li");
                let btn = document.createElement("button");
                btn.textContent = "Delete";
                btn.addEventListener("click", (ele) => {
                  console.log(ele, li);
                  list.removeChild(li);
                });
                let span = document.createElement("span");
                span.innerHTML = `${entry.title}`;
                addTodo(entry.title);
                li.className = "list-item";
                li.appendChild(span);
                li.appendChild(btn);
                list.appendChild(li);
                inputText.innerHTML = "";

            }
            })
    });

addListeners();
