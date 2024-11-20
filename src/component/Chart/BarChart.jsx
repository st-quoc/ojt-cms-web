import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'], // Các nhãn cho trục X
    datasets: [
      {
        label: 'Sales Over Months',
        data: [65, 59, 80, 81, 56], // Dữ liệu cho trục Y
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Tùy chỉnh cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales',
      },
      tooltip: {
        callbacks: {
          label: tooltipItem => `Sales: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
