import React, { useState, useEffect, useContext } from 'react';
import { getAllExpenses } from '../../Common/Services/ExpenseTypeService'; // fetch expenses
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
import { ThemeContext } from '../../App'; // consume theme

// Register necessary Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Helper: fetch and structure data for the chart
const fetchChartData = async () => {
  try {
    const expenses = await getAllExpenses();
    const grouped = {};

    expenses.forEach(exp => {
      const date = new Date(exp.get('date')).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = { total: 0, descriptions: [] };
      }
      grouped[date].total += Number(exp.get('amount'));
      grouped[date].descriptions.push(exp.get('name'));
    });

    const sortedDates = Object.keys(grouped).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    const data = sortedDates.map(date => ({
      x: date,
      y: grouped[date].total,
      description: grouped[date].descriptions.join(', ')
    }));

    return {
      labels: sortedDates,
      datasets: [
        {
          label: 'Expenses Over Time',
          data,
          parsing: { xAxisKey: 'x', yAxisKey: 'y' },
          fill: false,
          // these colors will be overridden below based on theme
          backgroundColor: 'rgba(17, 101, 242, 0.7)',
          borderColor: 'rgba(17, 101, 242, 1)',
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return { labels: [], datasets: [] };
  }
};

export default function DashboardGraph() {
  const { theme } = useContext(ThemeContext);    // get current theme
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  // load data on mount (and re-load if theme changes to update colors)
  useEffect(() => {
    const load = async () => {
      const data = await fetchChartData();
      setChartData(data);
      setLoading(false);
    };
    load();
  }, [theme]);

  if (loading) {
    return (
      <div className={`p-4 rounded shadow h-100 ${
        theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'
      }`}>
        Loading chart...
      </div>
    );
  }

  // Determine container bg/text based on theme
  const containerClass = theme === 'dark'
    ? 'p-4 bg-dark text-white rounded shadow h-100'
    : 'p-4 bg-light text-dark rounded shadow h-100';

  // Choose line color based on theme
  const lineColor = theme === 'dark' ? 'rgba(248, 0, 0, 1)' : 'rgba(17, 101, 242, 1)';
  const pointBg = theme === 'dark' ? 'rgba(248, 0, 0, 0.7)' : 'rgba(17, 101, 242, 0.7)';
  const gridColor = theme === 'dark' ? '#495057' : '#dee2e6';
  const tickColor = theme === 'dark' ? '#f8f9fa' : '#212529';

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = context.raw;
            return [
              `Amount: $${point.y}`,
              `Description: ${point.description || 'N/A'}`
            ];
          }
        }
      },
      legend: {
        labels: { color: tickColor }
      }
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

  // Inject dynamic colors into the dataset
  const themedData = {
    ...chartData,
    datasets: chartData.datasets.map(ds => ({
      ...ds,
      borderColor: lineColor,
      backgroundColor: pointBg
    }))
  };

  return (
    <div className={containerClass}>
      <h4>Expenses Graph</h4>
      <Line data={themedData} options={options} />
    </div>
  );
}
