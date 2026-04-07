// 1. Select the DOM elements
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');

// Get transactions from local storage, or start with an empty array if none exist
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// 3. Function to add transactions to the DOM list
function addTransactionDOM(transaction) {
  // Get sign (is it plus or minus?)
  const sign = transaction.amount < 0 ? '-' : '+';

  // Create a new list item (li)
  const item = document.createElement('li');

  // Add class based on value (for the red/green border)
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  // Insert the HTML inside the li
  // Locate this line inside addTransactionDOM and change it to:
item.innerHTML = `
  ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
`;

  // Actually attach the li to our <ul> in the HTML
  list.appendChild(item);
}

// 5. Update the balance, income and expense
function updateValues() {
  // Create an array of just the amounts: [-20, 300, -10, 150]
  const amounts = transactions.map(transaction => transaction.amount);

  // Calculate Total Balance
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  // Calculate Income
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  // Calculate Expense
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  // Update the DOM (The Screen)
  balance.innerText = `$${total}`;
  money_plus.innerText = `+$${income}`;
  money_minus.innerText = `-$${expense}`;
}

function addTransaction(e) {
  e.preventDefault(); // This stops the page from refreshing (the default browser behavior)

  // Validation: Check if inputs are empty
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a description and an amount');
  } else {
    // Create a new transaction object
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value // The plus sign converts the string "50" into the number 50
    };

    // Add new transaction to our array (the State)
    transactions.push(transaction);

    // Update the UI
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    // Clear the input fields
    text.value = '';
    amount.value = '';
  }
}

function removeTransaction(id) {
  // Filter out the transaction with the ID we clicked
  transactions = transactions.filter(transaction => transaction.id !== id);

  // Re-run the init function to refresh the whole list and math
  init();
  updateLocalStorage();
}

// Simple helper function to create a random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

form.addEventListener('submit', addTransaction);

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// 4. Initialize the app (Run the logic)
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues(); // Add this line!
}

init();