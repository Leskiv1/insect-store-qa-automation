import {deleteInsect, updateInsect} from "./api.js";
import {render} from "./index.js";

const nameInput = document.getElementById('name_create');
const speedInput = document.getElementById('speed_create');
const massInput = document.getElementById('mass_create');
const cardsContainer = document.getElementById('cards_container');
const nameFind = document.getElementById('name_find');
const speedSort = document.getElementById('speed_sort');
const popup = document.getElementById('popup');

export function getCardProperties () {
    if (speedInput.value <= 0) {
        openModalMessage('Speed cant be negative!');
        return;
    }

    if (massInput.value <= 0) {
        openModalMessage('Mass cant be negative!');
        return;
    }

    if (!/^[A-Za-zА-Яа-яІіЇїЄє\s]+$/.test(nameInput.value)) {
        openModalMessage('Name can contain only letters!');
        return;
    }

    return {
        name : nameInput.value,
        speed: speedInput.value,
        mass: massInput.value,
    };
}

export function getFindProperties () {
    const name = nameFind.value.trim();
    const sort = speedSort.value;
    return {
        name,
        sort
    }
}

const cardTemplate = ({id, name, speed, mass}) => `
          <li class="card" id=${id}>
            <img src="./images/Insects.jpg" alt="">
            <div class="card_text">
              <h3 class="name">${name}</h3>
              <span class="speed">${speed} m/s</span>
              <span class="mass">${mass} kg</span>
            </div>
            <div class="buttons">
              <button class="delete">Delete</button>
              <button class="update">Update</button>
            </div>
          </li>
`

export function addCard ({id, name, speed, mass}) {
    cardsContainer.insertAdjacentHTML("afterbegin", cardTemplate({id, name, speed, mass}));

    const deleteButton = cardsContainer.querySelector(`li[id="${id}"] .delete`);
    deleteButton.addEventListener('click', async () => {
        await deleteInsect(id);
        await render();
    });

    const updateButton = cardsContainer.querySelector(`li[id="${id}"] .update`);
    updateButton.addEventListener('click', async () => {
        let name = null;
        let speed = null;
        let mass = null;

        if (nameInput.value.trim().length > 0) {
            if (!/^[A-Za-zА-Яа-яІіЇїЄє\s]+$/.test(nameInput.value)) {
                openModalMessage('Name can contain only letters!');
                return;
            } else {
                name = nameInput.value;
            }
        }

        if (speedInput.value.length > 0) {
            if (speedInput.value <= 0) {
                openModalMessage('Speed cant be negative!');
                return;
            } else {
                speed = speedInput.value;
            }
        }

        if (massInput.value.length > 0) {
            if (massInput.value <= 0) {
                openModalMessage('Mass cant be negative!');
                return;
            } else {
                mass = massInput.value;
            }
        }

        const propertiesToUpdate = {
            name,
            speed,
            mass,
        }

        await updateInsect(propertiesToUpdate, id);
        clearCreateInputs();
        await render();
    });
}

export function clearCreateInputs () {
    nameInput.value = '';
    speedInput.value = '';
    massInput.value = '';
}

export function clearFindInputs () {
    nameFind.value = '';
    speedSort.value = 'not_sort';
}

export function renderAllCards (cards) {
    cardsContainer.innerHTML = '';
    cards.forEach(card => {
        addCard(card);
    });
}

export function openModalMessage (text) {
    const p = popup.querySelector('p');
    p.innerText = text;
    popup.classList.add('open');
}

// export function countMass() {
//     const items = cardsContainer.querySelectorAll('li .mass');
//     let mass = 0;
//     items.forEach(item => mass += +item.innerText.slice(0, -2))
//     openModalMessage(`Total mass is ${mass.toFixed(2)}`);
// }