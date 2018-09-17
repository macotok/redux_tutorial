import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todo from './reducers';
import { addTodo } from './actions';
import App from './components/App';

const store = createStore(todo);

store.dispatch(addTodo('Hello React'));
store.dispatch(addTodo('Helllo Redux'));
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
