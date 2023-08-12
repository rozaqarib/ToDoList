
//const jsonData = JSON.stringify(data)


const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const situ = false;
const file = `data.json`;


const tasks = [];

const users = [
    {
        username : 'roza qaribi' , password : '2037'
    }
];

const loggedIn = {username : '' , verify : false} ;

function logIN(){
    rl.question('Enter username: ', (username) => {
        rl.question('Enter password: ', (password) => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                loggedIn.username = user.username;
                loggedIn.verify = true;
                console.log(`Logged in as ${user.username}`);
                showOptions();
            } else {
                console.log('\nInvalid username or password.\n' +
                    'enter [1] to try again\n');
                rl.prompt();
            }
        });
    });


}
function verify(){
    if(loggedIn.verify){
        showOptions()
    }
    else
        logIN();
}

function saveTasks(tasks){
    const jsonData = JSON.stringify(tasks , null , 2);
    fs.writeFileSync(file , jsonData);
}

function printTasks() {
    console.log('Tasks:');
    for (let i = 0; i < tasks.length; i++) {
        console.log(`${i + 1}. ${tasks[i].task} [${tasks[i].checked ? 'checked' : ''}]`);
    }
}

function addTask() {
    rl.question('Enter the task\n: ', (task) => {
        tasks.push({task : task , checked : false});
        console.log('Task added successfully.');
        saveTasks(tasks);
        printTasks();
        rl.prompt();
        showOptions();
    });
}

function showOptions() {
    if(loggedIn.verify) {
        console.log('\nOptions:');
        console.log('1. Add A New Task');
        console.log('2. Edit Task');
        console.log('3. Delete Task');
        console.log('4. Mark Task As Completed');
        console.log('5. The Most Important Task');
        console.log('6. Exit');

    }
    else{
        logIN();
    }
    rl.prompt();
}

rl.on('line', (input) => {
    switch (input.trim()) {
        case '1':
            verify();
            addTask();
            break;
        case '2':
            verify();
            Edit();
            break;
        case '3':
            verify();
            Delete();
            break;
        case '4':
            verify();
            Markchecked();
            break;
        case '5':
            verify();
            MostImportant();
            break;
        case '6':
            rl.close();
            break;
        default:
            console.log('Invalid option. Try again.');
            showOptions();
            break;
    }
});
function Edit(){
    printTasks();
    rl.question('Enter the task number you want to edit: ', (indexStr) => {
        const index = parseInt(indexStr) - 1;
        if (index >= 0 && index < tasks.length) {
            rl.question('\nenter the new task: ', (newTask) => {
                tasks[index] . task = newTask;
                saveTasks(tasks);
                printTasks();
                rl.prompt();
                console.log('press enter to go back to menu...');
            });
        }
        else {
            console.log('Invalid task number.');
            rl.prompt();
        }

    });
}
function Delete() {
    printTasks();
    rl.question('Enter the task number you want to delete: ', (indexStr) => {
        const index = parseInt(indexStr) - 1;
        if (index >= 0 && index < tasks.length) {
            tasks.splice(index, 1);
            console.log('Task deleted successfully.');
            saveTasks(tasks);
            printTasks();
            rl.prompt();
            console.log('press enter to go back to menu...');
        } else {
            console.log('Invalid task number.');
            rl.prompt();
        }
    });
}

function Markchecked(){
    printTasks();
    rl.question('Enter the task number you done: ', (indexStr) => {
        const index = parseInt(indexStr) - 1;
        if (index >= 0 && index < tasks.length){
            tasks[index].checked = !tasks[index].checked;
            saveTasks(tasks);
            printTasks();
            rl.prompt();
            console.log('press enter to go back to menu...');
        }
        else {
            console.log('Invalid task number.');
            rl.prompt();
        }

    });
}

function MostImportant(){
    printTasks();
    rl.question('Enter the most important task : ', (indexStr) =>{
        const index = parseInt(indexStr) - 1;
        if (index >= 0 && index < tasks.length){
            tasks[index].MostImportant = !tasks[index].MostImportant;
            saveTasks(tasks);
            printTasks();
            rl.prompt();
            console.log('press enter to go back to menu...');
        }
        else{
            console.log('invalid number \ntry again...');
            MostImportant();
        }
    });
}


console.log('\n\t\t\t\t\t\tWelcome to the To-Do List App!');
showOptions();