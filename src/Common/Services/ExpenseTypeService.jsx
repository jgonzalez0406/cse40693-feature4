import Parse from "parse";

export const createExpense = ({ name, category, amount, date }) => {
  const Expense = Parse.Object.extend("Expense");
  const expense = new Expense();

  // Fetch or create the category
  const Category = Parse.Object.extend("ExpenseCategory");
  const categoryQuery = new Parse.Query(Category);
  categoryQuery.equalTo("name", category);

  return categoryQuery.first().then((categoryObject) => {
    if (categoryObject) {
      // If category exists, set the pointer to Expense
      expense.set("category", categoryObject);
    } else {
      // If category doesn't exist, create a new one
      const newCategory = new Category();
      newCategory.set("name", category);
      return newCategory.save().then((createdCategory) => {
        expense.set("category", createdCategory);
      }).catch((error) => {
        console.error('Error creating category:', error);
        throw new Error('Category creation failed');
      });
    }

    // Set other fields on the Expense object
    // Assuming name, amount, and date are passed as strings
    expense.set("name", name);
    expense.set("amount", parseFloat(amount));
    expense.set("date", new Date(date));

    return expense.save()
      .then((result) => result) // Return the saved Expense object
      .catch((error) => {
        console.error("Error saving expense:", error);
        throw new Error("Expense creation failed");
      });
  }).catch((error) => {
    console.error("Error fetching category:", error);
    throw new Error("Error fetching category");
  });
};

// Initializing the Expenses object
export let Expenses = {};
// Initializing the collection for storing expenses
Expenses.collection = [];

// Function to fetch all expenses
export const getAllExpenses = () => {
  const Expense = Parse.Object.extend("Expense");
  const query = new Parse.Query(Expense);
  return query
    .find()
    .then((results) => {
      console.log("results: ", results);
      // returns array of Expense objects
      return results;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

