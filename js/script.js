const btnAdd = document.getElementById("add-task");
const task = document.getElementById("todo-val");
const todoList = document.getElementById("todo-list");
const category = document.getElementById("category");

window.addEventListener("load", function(){
    checkEmpty();
    removeTaskList();
});

btnAdd.addEventListener("click", addTask);

function addTask() {
    if(task.value != "") {
        var todoListItem = document.createElement("li");
        todoListItem.setAttribute("class", "todo-item");

        //Todo description
        var todoDesc = document.createElement("span");
        todoDesc.setAttribute("class", "todo-description");

        //todo checkbox
        var todoCheckBox = document.createElement("input");
        todoCheckBox.setAttribute("type", "checkbox");
        todoCheckBox.setAttribute("class", "todo-checkbox");

        // todo text
        var todoText = document.createTextNode(task.value);

        // Add todo description
        todoDesc.appendChild(todoCheckBox);
        todoDesc.appendChild(todoText);

        //Todo action 
        var todoAction = document.createElement("span");
        todoAction.setAttribute("class", "todo-action");

        //Todo action button
        var todoActionBtn = document.createElement("button");
        todoActionBtn.setAttribute("class", "btn btn-sm btn-secondary btn-remove");
        var todoBtnText = document.createTextNode("Remove");
        
        todoActionBtn.appendChild(todoBtnText);
        todoAction.appendChild(todoActionBtn);

        // Add todo desc to list item
        todoListItem.appendChild(todoDesc);

        //Add todo action to list item
        todoListItem.appendChild(todoAction);

        // Check if there is a li with id todo empty
        var todoItemEmpty = document.getElementById("todo-empty");
        
        if(todoItemEmpty)
            todoList.innerHTML = "";

        var task_category = "";

        switch (category.value) {
            case 'important':
                task_category = 'important'
                break;
            case 'urgent':
                task_category = 'urgent'
                    break;
            case 'later':
                task_category = 'later'
                break;        
            default:
                break;
        }

        if(task_category != "")
            todoListItem.classList.add(task_category);

        //Add to ul
        todoList.appendChild(todoListItem);

        task.value = "";

        // Remove item
        remove(todoActionBtn);

        // Mark as done
        markAsDone(todoCheckBox);
    }
}

function removeTaskList() {
    var btnRemove = document.getElementsByClassName("btn-remove");
    for (let index = 0; index < btnRemove.length; index++) {
        remove(btnRemove[index])
    }
}

function remove(element) {
    element.addEventListener("click", function() {
        var confirm_res = confirm("Do you want to remove the item");

        if(confirm_res) 
            this.closest('li').remove();

        checkEmpty();
    })
}

function checkEmpty() {
    var todoEmpty = document.getElementsByClassName("todo-item");
    
    if(todoEmpty.length == 0) {
        var todoItemEmpty = document.createElement("li");
        todoItemEmpty.setAttribute("id", "todo-empty");

        var todoItemEmptyText = document.createTextNode("Tasks will be placed here...");
        todoItemEmpty.appendChild(todoItemEmptyText);

        todoList.appendChild(todoItemEmpty);
    }
}

function markAsDone(element) {
    element.addEventListener("click", function() {
        var item = element.parentElement;

        if(this.checked)
            item.classList.add("done");
        else
            item.classList.remove("done");
    })
}