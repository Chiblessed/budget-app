// Get all necessary elements from the HTML
const inputBudget = document.querySelector('.budgetamount');
const budgetBtn = document.querySelector('.budgetbtn');
const currency = document.querySelector('.amountsign');
const selectCurrency = document.querySelector('select');
const inputItem = document.querySelector('.itemname');
const inputCost = document.querySelector('.cost');
const costBtn = document.querySelector('.costbtn');
const totalBudget = document.querySelector('.totalbudget');
const costAmount = document.querySelector('.totalcostamount');
const balance = document.querySelector('.totalbalance');
const result = document.querySelector('.outside');
const errorMessage = document.querySelector('.errormsg');
// Function to update local storage with budget, costs, and balance
function saveToLocalStorage() {
  localStorage.setItem('budget', totalBudget.innerText);
  localStorage.setItem('costs', result.innerHTML);
  localStorage.setItem('balance', balance.innerText);
}

// Function to load data from local storage when the page loads
function loadFromLocalStorage() {
  const savedBudget = localStorage.getItem('budget');
  const savedCosts = localStorage.getItem('costs');
  const savedBalance = localStorage.getItem('balance');

  if (savedBudget) {
      totalBudget.innerText = savedBudget;
  }
  if (savedCosts) {
      result.innerHTML = savedCosts;
  }
  if (savedBalance) {
      balance.innerText = savedBalance;
  }
}

// Load data from local storage when the page loads
window.addEventListener('load', loadFromLocalStorage);

selectCurrency.addEventListener('change', () => {
  currency.innerText = selectCurrency.value;
});

// Function to set the budget
budgetBtn.addEventListener('click', () => {
  const inputBudgetAmount = parseFloat(inputBudget.value);
  if (isNaN(inputBudgetAmount) || inputBudgetAmount <= 0) {
      errorMessage.innerText = 'Please enter a valid budget amount.';
      errorMessage.style.display = 'block';
  } else {
      errorMessage.style.display = 'none';
      totalBudget.innerText = inputBudgetAmount;
      saveToLocalStorage(); // Save to local storage
  }
});

// Function to add a new item with its cost
costBtn.addEventListener('click', () => {
  const itemName = inputItem.value.trim();
  const itemCost = parseFloat(inputCost.value);
  if (itemName === '' || isNaN(itemCost) || itemCost <= 0) {
      errorMessage.innerText = 'Please enter valid item name and cost.';
      errorMessage.style.display = 'block';
      return;
  }

  errorMessage.style.display = 'none';
  
  // Create a new list item element
  const listItem = document.createElement('li');
  listItem.innerHTML = `
      ${itemName} <span class="balanceamount">${itemCost}</span>
      <button class="deletebtn">Delete</button>
  `;
  result.appendChild(listItem);

  // Update total cost and balance
  const currentCost = parseFloat(costAmount.innerText);
  costAmount.innerText = currentCost + itemCost;
  balance.innerText = parseFloat(totalBudget.innerText) - parseFloat(costAmount.innerText);

  saveToLocalStorage(); // Save to local storage
});

// Event delegation to handle delete button click
result.addEventListener('click', (event) => {
  if (event.target.classList.contains('deletebtn')) {
      const item = event.target.parentElement;
      const itemCost = parseFloat(item.querySelector('.balanceamount').innerText);
      const currentCost = parseFloat(costAmount.innerText);
      
      // Update total cost and balance
      costAmount.innerText = currentCost - itemCost;
      balance.innerText = parseFloat(totalBudget.innerText) - parseFloat(costAmount.innerText);

      // Remove the item from the list
      item.remove();

      saveToLocalStorage(); // Save to local storage
  }
});
