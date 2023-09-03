import { APP_STATE } from './app-state.js';
import { Loader } from './components/loader.js';
import { TodoItemTemplate } from './components/todo-item.js';
import ZPage from './z/z.js';

// get all elements you want to work with in your Js
const homePage = document.querySelector('#homePage');
const addTodoButton = document.querySelector('#addTodoButton');
const resetTodoButton = document.querySelector('#resetTodoButton');
const UsernameElement = document.querySelector('.username');
const todosList = document.querySelector('.todos-list');

// initialize Z instance with parent element and app state or initialState
const Z = new ZPage(homePage, APP_STATE);

// get state methods
const { state, setState, getState, eventManager } = Z.stateManager();
console.log('Initial App State:', state);

// supposed to add a todo but well changes username
addTodoButton.addEventListener('click', (e) => {
  setState((prevState) => ({ ...prevState, $user: 'Javascript' }));
  let currentState = getState();
  console.log('app state after change:', currentState);
});

// listen for cliek event and remove all todos by setting state
resetTodoButton.addEventListener('click', (e) => {
  setState((prevState) => ({
    ...prevState,
    $todos: [
      {
        id: 3,
        task: 'write some code!',
        completed: false,
      },
    ],
  }));
  let currentState = getState();
  console.log('app state after change:', currentState);
});

let count = 0;

// react to username changes
Z.useEvent('todosChanged', (data) => {
  console.log('todos change event detected, new todos 1:', data);
  count++;
  console.log('Thats called', count, 'times!');
});

// react to todo state change
Z.useEvent('todosChanged', (data) => {
  console.log('todos change event detected, new todos 2:', data);
  Z.replace('myTodos', TodoItemTemplate);
  count++;
  console.log('Thats called', count, 'times!');
});

Z.useEvent('todosChanged', (data) => {
  console.log('todos change event detected, new todos 3:', data);
  Z.replace('myTodos', TodoItemTemplate);
  count++;
  console.log('Thats called', count, 'times!');
});

// Z.replace(myAppId, Header({ username: 'Kizz' }));
// Z.append('after', myAppId, Footer);

// show a splash screen loader for 2 milli seconds
// Z.showLoader(Loader, 2000);

// optional, logs whatever Z rendered in broswer to the console
// Z.log();

// Todo: make a z load into method and z use template for loop method
// Todo: remove need for spreading state while updating it
// Todo: add in custom effects to gracefully handle effects when state changes
