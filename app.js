  // Initialize expenses array from local storage
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Function to add an expense
  function addExpense() {
      const amount = document.getElementById('amount').value;
      const description = document.getElementById('description').value;
      const category = document.getElementById('category').value;

      if (amount && description && category) {
          const expense = {
              amount: amount,
              description: description,
              category: category
          };

          expenses.push(expense);
          updateExpenseList();
          clearInputFields();
          updateLocalStorage();
      } else {
          alert('Please fill in all fields.');
      }
  }

  // Function to update the expense list in the HTML
  function updateExpenseList() {
      const expenseList = document.getElementById('expenseList');
      expenseList.innerHTML = '';

      for (let i = 0; i < expenses.length; i++) {
          const expense = expenses[i];
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${expense.amount}</td>
              <td>${expense.description}</td>
              <td>${expense.category}</td>
              <td>
                  <button class="btn btn-warning btn-sm" onclick="editExpense(${i})">Edit</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteExpense(${i})">Delete</button>
              </td>
          `;
          expenseList.appendChild(row);
      }
  }

  // Function to clear input fields
  function clearInputFields() {
      document.getElementById('amount').value = '';
      document.getElementById('description').value = '';
      document.getElementById('category').value = '';
  }

  // Function to edit an expense
  function editExpense(index) {
      const updatedAmount = prompt('Update amount:', expenses[index].amount);
      const updatedDescription = prompt('Update description:', expenses[index].description);
      const updatedCategory = prompt('Update category:', expenses[index].category);

      if (updatedAmount !== null && updatedDescription !== null && updatedCategory !== null) {
          expenses[index].amount = updatedAmount;
          expenses[index].description = updatedDescription;
          expenses[index].category = updatedCategory;
          updateExpenseList();
          updateLocalStorage();
      }
  }

  // Function to delete an expense
  function deleteExpense(index) {
      const confirmDelete = confirm('Are you sure you want to delete this expense?');

      if (confirmDelete) {
          expenses.splice(index, 1);
          updateExpenseList();
          updateLocalStorage();
      }
  }

  // Function to update local storage
  function updateLocalStorage() {
      localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  // Attach event listener to the "Add Expense" button
  document.getElementById('addExpense').addEventListener('click', addExpense);

  // Initialize the expense list
  updateExpenseList();