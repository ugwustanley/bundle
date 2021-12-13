import { useState, useEffect } from "react";
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
  const [trans, setTrans] = useState();
  const [withdrawal, setWithdrawal] = useState();
  const [deposit, setDeposit] = useState();
  const [labels, setLabels] = useState([
    "21/6",
    "21/7",
    "21/8",
    "21/9",
    "21/10",
    "21/11",
    "21/12",
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

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    setTrans(transactions);
    setTimeout(() => {
      console.log(transactions, withdrawal);
    }, 3000);
  }, []);

  useEffect(() => {
    if (trans) {
      console.log(trans, "ppp");
      const x = trans.map((unit, index) => trans[index].amount);
      const x2 = trans.map((unit, index) => trans[index].balance);
      setWithdrawal(x.slice(0,7));
      setDeposit(x2.slice(0,7))
      console.log(x,x2, withdrawal, "imm");
    }
  }, [trans]);

  useEffect(() => {
    setChartData([
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
  }, [withdrawal, deposit]);

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
        {trans ? (
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
        ) : null}
      </div>
    </div>
  );
}
