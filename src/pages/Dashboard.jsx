import { useEffect, useState } from "react"
import React from 'react';
import { Doughnut, Bar, Line, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  ArcElement,
  PointElement, 
  LineElement,
  Title,
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip, 
  Legend
)


import { toyService } from "../services/toy.service.js"


export function Dashboard() {

    const [dataForCharts, setDataForCharts] = useState([])
    const backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 128, 0, 0.2)',
        'rgba(128, 128, 0, 0.2)'
    ]
    const borderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 128, 0, 1)',
        'rgba(128, 128, 0, 1)'
    ]


    useEffect(() => {
        loadStats()
    }, [])

    async function loadStats() {
        try {
            const data = await toyService.getLabelsStats()
            setDataForCharts(data)
        } catch (err) {
            throw err
        }
    }

    //            return {  toysInStock 

    const toysPerLabel = {
        labels: dataForCharts.labels,
        datasets: [
            {
                data: dataForCharts.toysCount || [],
                backgroundColor,
                borderColor,
                borderWidth: 1,
            }
        ],
    }

    // const inStockToysPerLabels = {
    //     labels: dataForCharts.labels,
    //     datasets: [
    //         {
    //             label: 'Total toys',
    //             data: dataForCharts.toysCount || [],
    //             backgroundColor: backgroundColor[0],
    //             borderColor: borderColor[0],
    //         },
    //         {
    //             label: 'Toys in Stock',
    //             data: dataForCharts.toysInStock || [],
    //             backgroundColor: backgroundColor[1],
    //             borderColor: borderColor[1],
    //         }
    //     ],
    // }

    const AvgPricePerLabel = {
        labels: dataForCharts.labels,
        datasets: [
            {
                data: dataForCharts.prices || [],
                backgroundColor,
                borderColor,
                borderWidth: 1,
            }
        ],
    }

    const addedToysPerMonth = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Toys added per month",
                data: dataForCharts.date || [],
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    }

    const options = { plugins: { legend: { display: true, position: 'right' } } }
    const barOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked'
            },
        },
        responsive: true,
        scales: { 
            x: { stacked: true },
            y: { stacked: true } 
        }
    }
    if (!dataForCharts) return <h4> Loading ... </h4>

    return (
        
            <section className="dashboard">
            <h3>Toys Per Label:</h3>
            <Doughnut data={toysPerLabel}/>
            <h3>Average Price Per Label:</h3>
            <Pie data={AvgPricePerLabel} options={options}/>
            <h3>Added Toys Per Month:</h3>
            <Line data={addedToysPerMonth} options={options} />
            {/* <Bar data={inStockToysPerLabels} options={barOptions}/> */}
            </section>
    )
}