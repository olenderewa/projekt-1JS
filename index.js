import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const incomeForm = document.querySelector("#incomeForm");
const incomeName = document.querySelector("#incomeName");
const incomeAmount = document.querySelector("#incomeAmount");

const incomeData = [];

const calculateBalance = () => {
  const incomeSum = incomeData.reduce((acc, currentValue) => {
    return acc + Number(currentValue.amount);
  }, 0);
  const expensesSum = expensesData.reduce((acc, currentValue) => {
    return acc + Number(currentValue.amount);
  }, 0);
  const totalResult = incomeSum - expensesSum;

  const balance = document.querySelector("#balance");

  if (totalResult === 0) {
    balance.textContent = "Bilans wynosi zero";
  } else if (totalResult < 0) {
    balance.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(
      totalResult
    )} złotych`;
  } else {
    balance.textContent = `Możesz jeszcze wydać ${totalResult} złotych`;
  }
};

const addIncome = (event) => {
  event.preventDefault();
  const incomeNameValue = incomeName.value;
  const incomeAmountValue = incomeAmount.value;
  incomeData.push({
    name: incomeNameValue,
    amount: incomeAmountValue,
    id: uuidv4(),
  });
  renderIncomeList();
  incomeForm.reset();
};

incomeForm.addEventListener("submit", addIncome);

const calculateIncomeSum = () => {
  const sum = incomeData.reduce((acc, currentValue) => {
    return acc + Number(currentValue.amount);
  }, 0);
  const incomeSum = document.querySelector("#incomeSum");
  incomeSum.textContent = sum;
};

const renderIncomeList = () => {
  const list = document.querySelector("#incomeList");
  list.innerHTML = "";

  incomeData.map((item) => {
    const li = document.createElement("li");
    li.textContent = item.name + " - " + item.amount;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edytuj";
    editBtn.classList.add("editBtn");
    li.appendChild(editBtn);

    editBtn.addEventListener("click", () =>
      editIncome(item.id, item.name, item.amount, li)
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Usuń";
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => deleteIncome(item.id));

    list.appendChild(li);
  });
  calculateIncomeSum();
  calculateBalance();
};

const deleteIncome = (id) => {
  const indexToDelete = incomeData.findIndex((item) => item.id === id);
  incomeData.splice(indexToDelete, 1);
  renderIncomeList();
};
const editIncome = (id, name, amount, li) => {
  li.innerHTML = "";
  const editIncomeForm = document.createElement("form");

  const editInputName = document.createElement("input");
  editInputName.name = "incomeName";
  editInputName.required = true;
  editInputName.value = name;

  const editInputNumber = document.createElement("input");
  editInputNumber.type = "number";
  editInputNumber.name = "incomeAmount";
  editInputNumber.required = true;
  editInputNumber.min = "0.01";
  editInputNumber.step = "0.01";
  editInputNumber.value = amount;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Zapisz";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Anuluj";

  li.appendChild(editIncomeForm);
  editIncomeForm.appendChild(editInputName);
  editIncomeForm.appendChild(editInputNumber);
  editIncomeForm.appendChild(saveBtn);
  editIncomeForm.appendChild(cancelBtn);

  const saveIncome = (event) => {
    event.preventDefault();
    const editInputNameValue = editInputName.value;
    const editInputNumberValue = editInputNumber.value;
    const itemToEdit = incomeData.find((item) => item.id === id);
    itemToEdit.name = editInputNameValue;
    itemToEdit.amount = editInputNumberValue;
    renderIncomeList();
  };

  editIncomeForm.addEventListener("submit", saveIncome);
  const editCancel = () => {
    renderIncomeList();
  };
  cancelBtn.addEventListener("click", () => editCancel());
};

const expensesForm = document.querySelector("#expensesForm");
const expensesName = document.querySelector("#expensesName");
const expensesAmount = document.querySelector("#expensesAmount");

const expensesData = [];

const balance = document.querySelector("#balance");

const addExpenses = (event) => {
  event.preventDefault();
  const expensesNameValue = expensesName.value;
  const expensesAmountValue = expensesAmount.value;
  expensesData.push({
    name: expensesNameValue,
    amount: expensesAmountValue,
    id: uuidv4(),
  });
  renderExpensesList();
  expensesForm.reset();
};

expensesForm.addEventListener("submit", addExpenses);

const calculateExpensesSum = () => {
  const sum = expensesData.reduce((acc, currentValue) => {
    return acc + Number(currentValue.amount);
  }, 0);
  const expensesSum = document.querySelector("#expensesSum");
  expensesSum.textContent = sum;
};

const renderExpensesList = () => {
  const list = document.querySelector("#expensesList");
  list.innerHTML = "";

  expensesData.map((item) => {
    const li = document.createElement("li");
    li.textContent = item.name + " - " + item.amount;
    list.appendChild(li);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edytuj";
    editBtn.classList.add("editBtn");
    li.appendChild(editBtn);

    editBtn.addEventListener("click", () =>
      editExpenses(item.id, item.name, item.amount, li)
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Usuń";
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => deleteExpenses(item.id));

    list.appendChild(li);
  });
  calculateExpensesSum();
  calculateBalance();
};

const deleteExpenses = (id) => {
  const indexToDelete = expensesData.findIndex((item) => item.id === id);
  expensesData.splice(indexToDelete, 1);
  renderExpensesList();
};
const editExpenses = (id, name, amount, li) => {
  li.innerHTML = "";
  const editExpensesForm = document.createElement("form");

  const editInputName = document.createElement("input");
  editInputName.name = "incomeName";
  editInputName.required = true;
  editInputName.value = name;

  const editInputNumber = document.createElement("input");
  editInputNumber.type = "number";
  editInputNumber.name = "incomeAmount";
  editInputNumber.required = true;
  editInputNumber.min = "0.01";
  editInputNumber.step = "0.01";
  editInputNumber.value = amount;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Zapisz";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Anuluj";

  li.appendChild(editExpensesForm);
  editExpensesForm.appendChild(editInputName);
  editExpensesForm.appendChild(editInputNumber);
  editExpensesForm.appendChild(saveBtn);
  editExpensesForm.appendChild(cancelBtn);

  const saveExpenses = (event) => {
    event.preventDefault();
    const editInputNameValue = editInputName.value;
    const editInputNumberValue = editInputNumber.value;
    const itemToEdit = expensesData.find((item) => item.id === id);
    itemToEdit.name = editInputNameValue;
    itemToEdit.amount = editInputNumberValue;
    renderExpensesList();
  };

  editExpensesForm.addEventListener("submit", saveExpenses);
  const editCancel = () => {
    renderExpensesList();
  };
  cancelBtn.addEventListener("click", () => editCancel());
};
