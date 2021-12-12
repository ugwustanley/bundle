import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export default function Chart() {
  const [withdrawal, setWithdrawal] = useState([
    20000, 40000, 23000, 16272, 29928, 23892,
  ]);
  const [deposit, setDeposit] = useState([
    43000, 12000, 40000, 27998, 2989, 23987, 37893,
  ]);
  const [labels, setLabels] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
  ]);
  const [chartData, setChartData] = useState([
    {
      data: deposit,
      label: "Deposits",
      borderColor: "rgba(230, 234, 63, 1)        ",
      strokeWidth: 10,
      pointBackgroundColor: "#fff",
      fill: false,
      borderWidth: 2.5,
      lineTension: 0,
    },
    {
      data: withdrawal,
      label: "Withdrawals",
      borderColor: "#132EBA",
      pointBackgroundColor: "#fff",
      fill: false,
      borderWidth: 2.5,
      lineTension: 0,
    },
  ]);

  const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 2,
    responsive: true,
    beizerCurve: false,
    pointHitDetectionRadius: 100,
    datasetStrokeWidth: 10,
    scaleShowGridLines: false,
    scaleLineColor: "rgba(0,0,0,0)",
  };
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  return (
    <div className="chart">
      <div className="chart__box">
        <Line
          style={{ height: "900px" }}
          width={800}
          height={320}
          options={chartOptions}
          data={{
            labels,
            datasets: chartData,
          }}
        />
      </div>
    </div>
  );
}
