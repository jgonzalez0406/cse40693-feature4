import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { ThemeContext } from '../../App';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Stateless child component for displaying the graph
function DashboardGraph({ expenses, loading }) {
  const { theme } = useContext(ThemeContext);

  if (loading) {
    return (
      <div className={`p-4 rounded shadow h-100 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
        Loading chart...
      </div>
    );
  }

  // Prepare chart data
  const grouped = {};

  // Group expenses by date and calculate total amount and descriptions
  expenses.forEach(exp => {
    const date = new Date(exp.get('date')).toLocaleDateString();
    if (!grouped[date]) {
      grouped[date] = { total: 0, descriptions: [] };
    }
    grouped[date].total += Number(exp.get('amount'));
    grouped[date].descriptions.push(exp.get('name'));
  });

  // Sort dates and prepare data for the chart
  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));
  const data = sortedDates.map(date => ({
    x: date,
    y: grouped[date].total,
    description: grouped[date].descriptions.join(', ')
  }));

  const chartData = {
    labels: sortedDates,
    datasets: [{
      label: 'Expenses Over Time',
      data,
      parsing: { xAxisKey: 'x', yAxisKey: 'y' },
      fill: false,
      // If the theme is dark, set the background color to a darker shade
      // If the theme is light, set the background color to a lighter shade
      backgroundColor: theme === 'dark' ? 'rgba(248, 0, 0, 0.7)' : 'rgba(17, 101, 242, 0.7)',
      borderColor: theme === 'dark' ? 'rgba(248, 0, 0, 1)' : 'rgba(17, 101, 242, 1)',
    }]
  };

  const containerClass = theme === 'dark'
    ? 'p-4 bg-dark text-white rounded shadow h-100'
    : 'p-4 bg-light text-dark rounded shadow h-100';

  const gridColor = theme === 'dark' ? '#495057' : '#dee2e6';
  const tickColor = theme === 'dark' ? '#f8f9fa' : '#212529';

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = context.raw;
            return [`Amount: $${point.y}`, `Description: ${point.description || 'N/A'}`];
          }
        }
      },
      legend: { labels: { color: tickColor } }
    },
    scales: {
      x: {
        ticks: { color: tickColor },
        grid: { color: gridColor },
        title: {
          display: true,
          text: 'Date (mm/dd/yyyy)',
          color: tickColor
        }
      },
      y: {
        ticks: { color: tickColor },
        grid: { color: gridColor },
        title: {
          display: true,
          text: 'Amount ($)',
          color: tickColor
        }
      }
    }
  };

  return (
    <div className={containerClass}>
      <h4>Expenses Graph</h4>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default DashboardGraph;
