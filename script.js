// script.js 
// Get form, expense list, and total amount elements 
const expenseForm = document.getElementById("expense-form"); 
const expenseList = document.getElementById("expense-list"); 
const totalAmountElement = document.getElementById("total-amount"); 

// Initialize expenses array from localStorage 
let expenses = JSON.parse(localStorage.getItem("expenses")) || []; 

// Function to render expenses in tabular form 
function renderExpenses() { 
    // Clear expense list 
    expenseList.innerHTML = ""; 

    // Initialize total amount 
    let totalAmount = 0; 

    // Loop through expenses array and create table rows 
    for (let i = 0; i < expenses.length; i++) { 
        const expense = expenses[i]; 
        const expenseRow = document.createElement("tr"); 
        expenseRow.innerHTML = ` 
        <td>${expense.person}</td> 
        <td>${expense.name}</td> 
        <td>$${expense.amount.toFixed(2)}</td> 
        <td>
            <span class="modify-btn" data-id="${i}">Modify</span>
            <span class="delete-btn" data-id="${i}">Delete</span>
        </td> 
        `; 
        expenseList.appendChild(expenseRow); 

        // Update total amount 
        totalAmount += expense.amount; 
    } 

    // Update total amount display 
    totalAmountElement.textContent = totalAmount.toFixed(2); 

    // Save expenses to localStorage 
    localStorage.setItem("expenses", JSON.stringify(expenses)); 
} 

// Function to add expense 
function addExpense(event) { 
    event.preventDefault(); 

    // Get expense details from form 
    const personNameInput = document.getElementById("person-name"); 
    const expenseNameInput = document.getElementById("expense-name"); 
    const expenseAmountInput = document.getElementById("expense-amount"); 
    const personName = personNameInput.value; 
    const expenseName = expenseNameInput.value; 
    const expenseAmount = parseFloat(expenseAmountInput.value); 

    // Clear form inputs 
    personNameInput.value = ""; 
    expenseNameInput.value = ""; 
    expenseAmountInput.value = ""; 

    // Validate inputs 
    if (personName === "" || expenseName === "" || isNaN(expenseAmount)) { 
        alert("Please enter valid expense details."); 
        return; 
    } 

    // Create new expense object 
    const expense = { 
        person: personName, 
        name: expenseName, 
        amount: expenseAmount, 
    }; 

    // Add expense to expenses array 
    expenses.push(expense); 

    // Render expenses 
    renderExpenses(); 
} 

// Function to delete expense 
function deleteExpense(event) { 
    if (event.target.classList.contains("delete-btn")) { 
        // Get expense index from data-id attribute 
        const expenseIndex = parseInt(event.target.getAttribute("data-id")); 

        // Remove expense from expenses array 
        expenses.splice(expenseIndex, 1); 

        // Render expenses 
        renderExpenses(); 
    } 
} 

// Function to modify expense 
function modifyExpense(event) { 
    if (event.target.classList.contains("modify-btn")) { 
        // Get expense index from data-id attribute 
        const expenseIndex = parseInt(event.target.getAttribute("data-id")); 

        // Get current expense details
        const currentExpense = expenses[expenseIndex];

        // Fill form with current details
        document.getElementById("person-name").value = currentExpense.person;
        document.getElementById("expense-name").value = currentExpense.name;
        document.getElementById("expense-amount").value = currentExpense.amount;

        // Remove current expense from array
        expenses.splice(expenseIndex, 1);

        // Render expenses
        renderExpenses();
    }
}

// Add event listeners 
expenseForm.addEventListener("submit", addExpense); 
expenseList.addEventListener("click", deleteExpense); 
expenseList.addEventListener("click", modifyExpense);

// Render initial expenses on page load 
renderExpenses();