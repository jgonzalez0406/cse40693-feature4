import { getAllExpenses } from '../../Common/Services/ExpenseTypeService'; // Import the function to get expenses
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Grab data from the backend and format it for the chart
const fetchChartData = async () => {
    try {
      // Fetch all expenses from the backend
      const expenses = await getAllExpenses();
  
      // Group by date
      const grouped = {};
  
      expenses.forEach(exp => {
        const date = new Date(exp.get('date')).toLocaleDateString();
  
        // Initialize the group if it doesn't exist
        if (!grouped[date]) {
          grouped[date] = {
            total: 0, // Initialize total amount for the date,
            descriptions: [] // Initialize descriptions array for the date
          };
        }
  
        // Sum the amounts and collect descriptions
        grouped[date].total += exp.get('amount');
        grouped[date].descriptions.push(exp.get('name'));
      });
  
      // Sort the dates since it is originally in random order
      const sortedDates = Object.keys(grouped).sort(
        (a, b) => new Date(a) - new Date(b)
      );
  
      // Create final data array
      const data = sortedDates.map(date => ({
        x: date,
        y: grouped[date].total,
        description: grouped[date].descriptions.join(', ') // If there are multiple descriptions, join them with a comma
      }));
  
      // Return the data in the format required by Chart.js
      return {
        labels: sortedDates,
        datasets: [
          {
            label: 'Expenses Over Time',
            data,
            parsing: {
              xAxisKey: 'x',
              yAxisKey: 'y',
            },
            fill: false,
            backgroundColor: 'rgba(17, 101, 242,0.7)',
            borderColor: 'rgba(17, 101, 242,1)',
          },
        ],
      };
    } catch (error) {
      console.error('Error fetching chart data:', error);
      return { labels: [], datasets: [] };
    }
  };
  
// Use the data to create a line chart
export default function DashboardGraph() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  // Fetch chart data when the component mounts
  // and set the loading state to false once data is fetched
  useEffect(() => {
    const loadChartData = async () => {
      const data = await fetchChartData();
      setChartData(data);
      setLoading(false);
    };

    loadChartData();
  }, []);

  if (loading) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="p-4 bg-light rounded shadow h-100">
      <h4>Expenses Graph</h4>
      <Line
        data={chartData}
        options={{
            plugins: {
            tooltip: {
                callbacks: {
                // Custom label for tooltip
                label: function (context) {
                    const point = context.raw;
                    return [
                    `Amount: $${point.y}`,
                    `Description: ${point.description || 'N/A'}`
                    ];
                }
                }
            }
            },
            responsive: true,
            scales: {
            x: {
                title: {
                display: true,
                text: 'Date (mm/dd/yyyy)'
                }
            },
            y: {
                title: {
                display: true,
                text: 'Amount ($)'
                }
            }
            }
        }}
        />

    </div>
  );
}