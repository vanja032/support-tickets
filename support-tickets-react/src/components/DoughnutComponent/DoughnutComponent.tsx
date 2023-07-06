import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import { Doughnut } from "react-chartjs-2";

interface DoughnutData {
  labels: string[];
  data: number[];
  colors: string[];
}

const DoughnutComponent = ({ dn_data }: { dn_data: DoughnutData }) => {
  // Prepare data
  const data = {
    labels: dn_data.labels,
    datasets: [
      {
        data: dn_data.data,
        backgroundColor: dn_data.colors, // Colors for the segments
        borderColor: "transparent", // Set the border color to transparent
      },
    ],
  };
  // Optional configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutComponent;
