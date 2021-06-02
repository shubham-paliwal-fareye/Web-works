let inputText = document.getElementById("input-text");
let todoBtn = document.getElementById("todo-btn");
let list = document.getElementById("list");


let todoItems = [];

function addTodoItems(text,id) {                   //To keep record of all TODO
    const todo = {
	text,
	id: id
  };
  todoItems.push(todo);
  console.log(todoItems);
}




function addTodo(text) {
   let todo = {
	userId: 1111,
	title:text,
	completed:false
  };


  fetch("https://jsonplaceholder.typicode.com/todos",{
	method: 'POST',
	body: todo,
	headers: new Headers()
  })
  .then(response => response.json())
  .then(json => console.log(json));
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
  addTodo(value);                                           // POST this to server
  addTodoItems(value,Date.now());                           // Add to list of TODO Items
  inputText.innerHTML = "";

}

fetch("https://jsonplaceholder.typicode.com/todos?results=10")      //Run on-startup
	.then((response) => response.json())
	.then(function(data) {
	let tempData = data;
	return tempData.map(function(entry) {
		if(todoItems.length < 10 && entry.completed==false){        //only 10 items on start-up with status "Complete=false"
            let li = document.createElement("li");
            let btn = document.createElement("button");
            btn.textContent = "Delete";
            btn.addEventListener("click", (ele) => {
              console.log(ele, li);
              list.removeChild(li);
            });
            let span = document.createElement("span");
            span.innerHTML = `${entry.title}`;              //assigned title
            li.className = "list-item";
            li.appendChild(span);
            li.appendChild(btn);
            list.appendChild(li);
            addTodoItems(entry.title,entry.id);             //Add to list of TODO Items
            inputText.innerHTML = "";

        }
    })
    });

addListeners();
