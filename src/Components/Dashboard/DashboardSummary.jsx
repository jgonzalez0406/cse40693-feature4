import { getAllExpenses } from '../../Common/Services/ExpenseTypeService'; // Import the function to get expenses
import React, { useState, useEffect } from 'react';

function Summary() {
    const [thisMonthExpenses, setThisMonthExpenses] = useState([]);
    const [lastMonthExpenses, setLastMonthExpenses] = useState([]);
    const [totalSpentEver, setTotalSpentEver] = useState(0);
    const [summaryText, setSummaryText] = useState("");
    const [categorySummary, setCategorySummary] = useState({});
    const [lifetimeCategorySummary, setLifetimeCategorySummary] = useState({});

    // Get the current date and the last month
    // Use the current date to get the month and year
    const currentDate = new Date();
    const thisMonth = currentDate.getMonth(); 
    const thisYear = currentDate.getFullYear();

    // Create a new date object for the last month
    // Set the month to the last month and get the month and year
    const lastMonthDate = new Date(currentDate);
    lastMonthDate.setMonth(thisMonth - 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastYear = lastMonthDate.getFullYear();

    // Format the month and year for display
    // ex. "January 2025"
    const formattedThisMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const formattedLastMonth = lastMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all expenses from the backend
                const expenses = await getAllExpenses();

                // Add the total spent ever to the state
                const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.get('amount')), 0);
                setTotalSpentEver(totalSpent);

                // Build lifetime category summary
                const lifetimeSummary = {};
                expenses.forEach(exp => {
                    const category = exp.get('category');
                    const categoryName = category ? category.get('name') : 'Unknown';
                    const amount = Number(exp.get('amount'));
                    if (!lifetimeSummary[categoryName]) {
                        lifetimeSummary[categoryName] = 0;
                    }
                    lifetimeSummary[categoryName] += amount;
                });
                setLifetimeCategorySummary(lifetimeSummary);


                // Filter expenses for this month and last month
                // Create arrays to hold the filtered expenses
                const thisMonthFiltered = [];
                const lastMonthFiltered = [];

                expenses.forEach(exp => {
                    const date = new Date(exp.get('date'));
                    if (date.getMonth() === thisMonth && date.getFullYear() === thisYear) {
                        thisMonthFiltered.push(exp);
                    } else if (date.getMonth() === lastMonth && date.getFullYear() === lastYear) {
                        lastMonthFiltered.push(exp);
                    }
                });

                // Build category summary for this month
                const summary = {};
                thisMonthFiltered.forEach(exp => {
                    const category = exp.get('category');
                    const categoryName = category ? category.get('name') : 'Unknown';
                    const amount = Number(exp.get('amount'));
                    if (!summary[categoryName]) {
                        summary[categoryName] = 0;
                    }
                    summary[categoryName] += amount;
                });
                setCategorySummary(summary);

                // Set the state with the filtered expenses
                setThisMonthExpenses(thisMonthFiltered);
                setLastMonthExpenses(lastMonthFiltered);
                
                // Calculate the total expenses for this month and last month
                // Use reduce to sum the amounts
                // Use Number() to convert the amount to a number
                const thisTotal = thisMonthFiltered.reduce((sum, exp) => sum + Number(exp.get('amount')), 0);
                const lastTotal = lastMonthFiltered.reduce((sum, exp) => sum + Number(exp.get('amount')), 0);

                // Set the summary text based on the comparison of the totals
                // If diff is greater than or equal to 0, set the text to "more", otherwise set it to "less"
                const diff = thisTotal - lastTotal;
                const moreOrLess = diff >= 0 ? "more" : "less";
                const diffAmount = Math.abs(diff).toFixed(2);

                setSummaryText(`You spent $${diffAmount} ${moreOrLess} than ${formattedLastMonth}.`);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h4>Lifetime Spending</h4>
            <p>Total spent: ${totalSpentEver.toFixed(2)}</p>
            <p>Category breakdown:</p>
            <ul>
                {Object.entries(lifetimeCategorySummary).map(([category, amount]) => (
                    <li key={category}>{category}: ${amount.toFixed(2)}</li>
                ))}
            </ul>
            <h4>Summary for {formattedThisMonth}</h4>
            <p>Total spent: ${thisMonthExpenses.reduce((sum, exp) => sum + Number(exp.get('amount')), 0).toFixed(2)}</p>
            <p>{summaryText}</p>
            <p>Category breakdown:</p>
            <ul>
                {Object.entries(categorySummary).map(([category, amount]) => (
                    <li key={category}>{category}: ${amount.toFixed(2)}</li>
                ))}
            </ul>
            <h6>List of Expenses</h6>
            <ul>
                {thisMonthExpenses.map((expense, index) => (
                    <li key={index}>{expense.get('name')} - ${expense.get('amount')}</li>
                ))}
            </ul>
        </div>
    );
}

export default Summary;
