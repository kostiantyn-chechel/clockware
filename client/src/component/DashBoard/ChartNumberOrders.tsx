import React from 'react';
import { Bar } from 'react-chartjs-2';
import Typography from "@material-ui/core/Typography";
import {IChartDateOrder} from "../../containers/Admin/AdminDashboard";

const data = {
    labels: ['0'],
    datasets: [
        {
            label: 'Количество заказов',
            data: [1],
            fill: false,
            backgroundColor: 'rgb(61,107,255)',
            borderColor: 'rgba(255,23,45,0.5)',
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
    legend: {
        display: false,
    },
};

interface IChartNumberOrders {
    listData: IChartDateOrder[]
}

const ChartNumberOrders: React.FC<IChartNumberOrders> = (props) => {
    const { listData } = props;

    data.labels = listData.map(item => item.date);
    data.datasets[0].data = listData.map(item => item.count);

    return (
        <div>
            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                График количества заказов
            </Typography>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ChartNumberOrders;