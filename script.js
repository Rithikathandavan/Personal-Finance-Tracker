let transactions = [];

function addTransaction() {
  const desc = document.getElementById('description').value;
  const amt = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  if (desc && !isNaN(amt) && amt > 0) {
    transactions.push({ desc, amt, type });
    updateTable();
    updateSummary();
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
  } else {
    alert("Please fill in all fields correctly!");
  }
}

function updateTable() {
  const table = document.getElementById('transactionTable');
  table.innerHTML = '';
  transactions.forEach((t, i) => {
    table.innerHTML += `
      <tr>
        <td>${t.desc}</td>
        <td>₹${t.amt}</td>
        <td>${t.type}</td>
        <td><button onclick="deleteTransaction(${i})">Delete ❌</button></td>
      </tr>`;
  });
}

function updateSummary() {
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amt, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amt, 0);
  document.getElementById('totalIncome').textContent = income.toFixed(2);
  document.getElementById('totalExpense').textContent = expense.toFixed(2);
  document.getElementById('balance').textContent = (income - expense).toFixed(2);
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateTable();
  updateSummary();
}

document.getElementById('modeToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark');
  document.getElementById('switchUI').classList.toggle('active');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

window.onload = () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    document.getElementById('modeToggle').checked = true;
    document.getElementById('switchUI').classList.add('active');
  }
  updateTable();
  updateSummary();
};
