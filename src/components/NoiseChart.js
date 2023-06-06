import React, { useEffect, useState , useRef} from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)


const NoiseChart = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/all")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(Data)
  const dataLastthirty = Data.slice(-10);
  const noiselevels = dataLastthirty.map((item) => item.value);
  const counts = Array.from({ length: 10 }, (_, index) => 20 - 2 *index);
  console.log(noiselevels)
  console.log(counts)

   const data = {
    labels: counts,
    datasets: [
      {
        type: "line",
        label: "noiselevels",
        data: noiselevels,
        backgroundColor: 'yellow',
        borderColor: 'white',
        pointBorderColor: 'yellow',
        pointColor: 'yellow',
        pointOpacity: 0.5,
        pointBackgroundColor: "rgba(255, 0, 0, 0.2)",
        pointHoverBackgroundColor: "red",
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.2,
      }
    ]
  }

  const options = {
    animations: {
      
    },
    plugins: {
      legend:true
    },
    scales: {
        x: {
            title: {
              display: true,
              text: 'minutes ago',
              fontSize: 100,
              color: 'white',
            },
            ticks: { color: 'white',},
            grid: {
              color: 'rgb(71,85,105,0.5)',
            }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'decibles',
            fontSize: 100,
            color: 'white',
          },
          ticks: { color: 'white',},
          grid: {
              color: 'rgb(71,85,105,0.5)',
          },
          min: 0,
          max: Math.max(...counts) + 97,
        }
      },
  }

  return (
    <div className = "flex flex-col justify-center items-center mt-4 w-full" >
    <div className="text-3xl my-4  text-[#ffffff]" >Noise-Line-Graph</div>
    <div className="text-lg mb-3 text-blue-500">@Provides a concise overview of the noise levels of previous 20 mins.</div>
    <div className="h-[50vh] w-[85vw] text-[#475569] rounded-md flex justify-center items-center px-5 ">
      <Line data={data} options={options} ></Line>
    </div>
  </div>
  )
}

export default NoiseChart
