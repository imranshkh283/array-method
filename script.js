const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
let data = []

getUsers()
getUsers()
getUsers()

async function getUsers() {
    try {
        const res = await fetch('https://randomuser.me/api');
        const data = await res.json();

        const user = data.results[0];

        const newUer = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000)
        }

        addData(newUer);
    } catch (error) {
        console.error(error);
    }
}

const addData = (obj) => {
    if (obj !== undefined) {
        data.push(obj);
    }

    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    data.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${moneyFormat(item.money)}`;
        main.appendChild(element);
    });
}

const moneyFormat = (number) => {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const doubleMoney = () => {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    })

    addData();
}

addUserBtn.addEventListener('click', getUsers);
doubleMoneyBtn.addEventListener('click', doubleMoney);