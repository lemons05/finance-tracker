// 1. Select the DOM elements
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');

// 2. Dummy Data (State)
const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

let transactions = dummyTransactions;

// 3. Function to add transactions to the DOM list
function addTransactionDOM(transaction) {
  // Get sign (is it plus or minus?)
  const sign = transaction.amount < 0 ? '-' : '+';

  // Create a new list item (li)
  const item = document.createElement('li');

  // Add class based on value (for the red/green border)
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  // Insert the HTML inside the li
  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn">x</button>
  `;

  // Actually attach the li to our <ul> in the HTML
  list.appendChild(item);
}

// 4. Initialize the app (Run the logic)
function init() {
  list.innerHTML = ''; // Clear the list first
  transactions.forEach(addTransactionDOM); // Loop through each transaction
}

init();