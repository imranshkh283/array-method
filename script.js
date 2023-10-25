const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
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
            money: Math.floor(Math.random() * 100000)
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
    return 'Rs.' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const doubleMoney = () => {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    })

    addData();
}

const showMillionaires = () => {
    data = data.filter(user => user.money > 100000);

    addData();
}

const sortByMoney = () => {
    data = data.sort((a, b) => b.money - a.money);

    addData()
    calculateWealth()
}

const calculateWealth = () => {
    let total = data.reduce((acc, user) => (acc + user.money), 0)

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${moneyFormat(
        total
    )}</strong></h3>`;
    main.appendChild(wealthEl);
}

addUserBtn.addEventListener('click', getUsers);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByMoney);
calculateWealthBtn.addEventListener('click', calculateWealth);