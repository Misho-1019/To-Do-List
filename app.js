window.addEventListener('load', solve)

function solve() {

    function createElement(tag, properties, container) {
        const element = document.createElement(tag)

        Object.keys(properties).forEach(key => {
            element[key] = properties[key]
        })

        if (container) container.appendChild(element);

        return element
    }

    const inputs = [...document.querySelectorAll('#task, #date')];

    const addBtnEl = document.querySelector('.add')

    const listTasksEl = document.querySelector('.tasks');

    function createEntry({ task, date }) {
        const entryEl = createElement('li', { className: 'task d-flex direction-row' }, listTasksEl)

        entryEl.setAttribute('data-task', task)
        entryEl.setAttribute('data-date', date)

        const articleEl = createElement('article', { className: 'd-flex direction-row' }, entryEl)
        createElement('input', { type: 'checkbox', id: 'checkbox1' }, articleEl)

        const divInfoEl = createElement('div', {className: 'info d-flex direction-row'}, articleEl)
        createElement('p', { textContent: task }, divInfoEl)
        createElement('p', { textContent: date }, divInfoEl)

        const divBtnEl = createElement('div', { className: 'buttons d-flex gap-2' }, entryEl)

        const editBtnEl = createElement('button', { className: 'edit-btn', textContent: 'Edit' }, divBtnEl)
        const deleteBtnEl = createElement('button', { className: 'delete-btn', textContent: 'Delete' }, divBtnEl)

        editBtnEl.addEventListener('click', editHandler)
        deleteBtnEl.addEventListener('click', deleteHandler)
    }

    function addHandler(e) {
        e.preventDefault();

        const [task, date] = inputs.map(field => field.value)

        if (!task || !date) return;

        createEntry({ task, date })

        inputs.forEach(field => field.value = '')
    }

    function editHandler(e) {
        e.preventDefault();

        const entryEl = e.currentTarget.parentElement.parentElement;

        const values = [
            entryEl.getAttribute('data-task'),
            entryEl.getAttribute('data-date')
        ]

        inputs.forEach((field, index) => field.value = values[index])

        entryEl.remove();
    }

    function deleteHandler(e) {
        e.preventDefault();

        const entryEl = e.currentTarget.parentElement.parentElement;

        entryEl.remove();
    }

    addBtnEl.addEventListener('click', addHandler)
}