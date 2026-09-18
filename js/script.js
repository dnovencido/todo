// Get the Add Task button
const btnAdd = document.getElementById("add-task");

// Get the task input field
const task = document.getElementById("todo-val");

// Get the <ul> element where tasks will be displayed
const todoList = document.getElementById("todo-list");

// Get the category dropdown
const category = document.getElementById("category");

// Run these functions when the page finishes loading
window.addEventListener("load", function() {

    // Check if the task list is empty
    checkEmpty();

    // Attach remove events to existing Remove buttons
    removeTaskList();
});


// Add a task when the Add Task button is clicked
btnAdd.addEventListener("click", addTask);


// Function for adding a new task
function addTask() {

    // Check if the task input is not empty
    if(task.value != "") {

        // Create a new <li> element for the task
        var todoListItem = document.createElement("li");

        // Add the todo-item class to the <li>
        todoListItem.setAttribute("class", "todo-item");


        // -----------------------------
        // CREATE TASK DESCRIPTION
        // -----------------------------

        // Create a <span> that will contain
        // the checkbox and task description
        var todoDesc = document.createElement("span");

        todoDesc.setAttribute(
            "class",
            "todo-description"
        );


        // -----------------------------
        // CREATE CHECKBOX
        // -----------------------------

        // Create a checkbox for marking
        // the task as completed
        var todoCheckBox = document.createElement("input");

        todoCheckBox.setAttribute(
            "type",
            "checkbox"
        );

        todoCheckBox.setAttribute(
            "class",
            "todo-checkbox"
        );


        // -----------------------------
        // CREATE TASK TEXT
        // -----------------------------

        // Create a text node using the value
        // entered by the user
        var todoText = document.createTextNode(task.value);


        // Add the checkbox to the description span
        todoDesc.appendChild(todoCheckBox);

        // Add the task text after the checkbox
        todoDesc.appendChild(todoText);


        // -----------------------------
        // CREATE TASK ACTION AREA
        // -----------------------------

        // Create a <span> that will contain
        // the Remove button
        var todoAction = document.createElement("span");

        todoAction.setAttribute(
            "class",
            "todo-action"
        );


        // -----------------------------
        // CREATE REMOVE BUTTON
        // -----------------------------

        // Create the Remove button
        var todoActionBtn = document.createElement("button");

        // Add Bootstrap and custom classes
        todoActionBtn.setAttribute(
            "class",
            "btn btn-sm btn-secondary btn-remove"
        );

        // Create the text displayed inside the button
        var todoBtnText = document.createTextNode("Remove");

        // Add the text to the button
        todoActionBtn.appendChild(todoBtnText);

        // Add the Remove button to the action span
        todoAction.appendChild(todoActionBtn);


        // -----------------------------
        // BUILD THE TASK ITEM
        // -----------------------------

        // Add the task description to the <li>
        todoListItem.appendChild(todoDesc);

        // Add the action section to the <li>
        todoListItem.appendChild(todoAction);


        // -----------------------------
        // REMOVE EMPTY MESSAGE
        // -----------------------------

        // Check if the placeholder
        // "Tasks will be placed here..." exists
        var todoItemEmpty = document.getElementById("todo-empty");

        // If the placeholder exists,
        // remove it before adding the first task
        if(todoItemEmpty)
            todoList.innerHTML = "";


        // -----------------------------
        // DETERMINE TASK CATEGORY
        // -----------------------------

        // Variable that will store the selected category
        var task_category = "";

        // Determine the selected category
        switch (category.value) {

            case 'important':
                task_category = 'important';
                break;

            case 'urgent':
                task_category = 'urgent';
                break;

            case 'later':
                task_category = 'later';
                break;

            default:
                break;
        }


        // If a category was selected,
        // add it as a CSS class to the task
        if(task_category != "")
            todoListItem.classList.add(task_category);


        // -----------------------------
        // ADD TASK TO THE LIST
        // -----------------------------

        // Add the newly created <li> to the <ul>
        todoList.appendChild(todoListItem);


        // Clear the task input after adding
        task.value = "";


        // -----------------------------
        // ADD BUTTON EVENTS
        // -----------------------------

        // Attach remove functionality
        // to the newly created Remove button
        remove(todoActionBtn);

        // Attach completed-task functionality
        // to the newly created checkbox
        markAsDone(todoCheckBox);

    } else {

        // Display an alert if no task was entered
        alert("Please enter a task");
    }
}


// ------------------------------------------------
// ATTACH REMOVE EVENT TO EXISTING REMOVE BUTTONS
// ------------------------------------------------

function removeTaskList() {

    // Get all elements with the btn-remove class
    var btnRemove = document.getElementsByClassName("btn-remove");

    // Loop through all Remove buttons
    for (let index = 0; index < btnRemove.length; index++) {

        // Attach the remove functionality
        remove(btnRemove[index]);
    }
}


// ------------------------------------------------
// REMOVE A TASK
// ------------------------------------------------

function remove(element) {

    // Listen for a click on the Remove button
    element.addEventListener("click", function() {

        // Ask the user to confirm deletion
        var confirm_res = confirm(
            "Do you want to remove the item"
        );

        // If the user confirms,
        // find the nearest <li> and remove it
        if(confirm_res)
            this.closest('li').remove();

        // Check if the list became empty
        checkEmpty();
    });
}


// ------------------------------------------------
// CHECK IF TASK LIST IS EMPTY
// ------------------------------------------------

function checkEmpty() {

    // Get all existing task items
    var todoEmpty = document.getElementsByClassName("todo-item");

    // If there are no tasks
    if(todoEmpty.length == 0) {

        // Create a placeholder <li>
        var todoItemEmpty = document.createElement("li");

        // Give the placeholder an ID
        todoItemEmpty.setAttribute(
            "id",
            "todo-empty"
        );

        // Create the placeholder message
        var todoItemEmptyText =
            document.createTextNode(
                "Tasks will be placed here..."
            );

        // Add the message to the <li>
        todoItemEmpty.appendChild(todoItemEmptyText);

        // Add the placeholder to the task list
        todoList.appendChild(todoItemEmpty);
    }
}


// ------------------------------------------------
// MARK TASK AS COMPLETED
// ------------------------------------------------

function markAsDone(element) {

    // Listen for checkbox clicks
    element.addEventListener("click", function() {

        // Get the parent <span> containing
        // the checkbox and task text
        var item = element.parentElement;

        // If the checkbox is checked,
        // add the "done" CSS class
        if(this.checked)
            item.classList.add("done");

        // Otherwise remove the "done" class
        else
            item.classList.remove("done");
    });
}