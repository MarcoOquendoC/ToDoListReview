/* import _ from 'lodash'; */
import './style.css';
import Method from './assets/scripts/methods.js';
import Status from './assets/scripts/status.js';

Method.setIndexes();
Method.render();

const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = e.target.firstChild.nextSibling.value;
  Method.add(description);
  e.target.firstChild.nextSibling.value = '';
});

const list = document.querySelector('#list');
list.addEventListener('click', (e) => {
  if (e.target.textContent === '🗑') {
    let { id } = e.target.parentElement.parentElement;
    id = Number(id.slice(1));
    Method.remove(id);
    return;
  }

  if (e.target.textContent === '🖊') {
    let { id } = e.target.parentElement.parentElement;
    id = Number(id.slice(1));
    Method.toggleEdit(id);
    e.target.classList.toggle('active');
    e.target.parentElement.previousSibling.previousSibling.toggleAttribute('disabled');
  }
});

list.addEventListener('input', (e) => {
  let { id } = e.target.parentElement;
  id = Number(id.slice(1));
  if (e.target.matches('.description')) {
    Status.changeDescription(e.target.value, id);
    return;
  }

  if (e.target.matches('.check')) {
    Status.toggleComplete(id);
  }
});

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
  Status.clearCompleted();
});