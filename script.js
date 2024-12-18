// HTML-Elemente holen
var form = document.getElementById('todo-form');
var input = document.getElementById('todo-input');
var todoList = document.getElementById('todo-list');

// Aufgabenliste
var todos = [];

// render todos
function showTodos() {
    todoList.innerHTML = '';

    for (var i = 0; i < todos.length; i++) {
        var task = todos[i];

        // Listenelement erstellen
        var listItem = document.createElement('li');

        // Checkbox erstellen
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.status;
        checkbox.onclick = (function(index) {
            return function() {
                todos[index].status = this.checked;
                showTodos();
            };
        })(i);

        // Text der Aufgabe
        var taskName = document.createElement('span');
        taskName.textContent = task.text;
        if (task.status) {
            taskName.style.textDecoration = 'line-through';
        }

        // Löschen-Button erstellen
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.onclick = (function(index) {
            return function() {
                todos.splice(index, 1);
                showTodos();
            };
        })(i);

        // Elemente zusammenfügen
        listItem.appendChild(checkbox);
        listItem.appendChild(taskName);
        listItem.appendChild(deleteButton);

        // Zur Liste hinzufügen
        todoList.appendChild(listItem);
    }
}

// Aufgabe hinzufügen, wenn das Formular abgeschickt wird
form.onsubmit = function(event) {
    event.preventDefault();
    var taskText = input.value.trim();

    if (taskText !== '') {
        todos.push({
            text: taskText,
            status: false
        });
        input.value = '';
        showTodos();
    }
};

// Initiales Anzeigen der Aufgaben
showTodos();
