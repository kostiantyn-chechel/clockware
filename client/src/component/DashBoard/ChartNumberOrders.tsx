import React from 'react';
import { Bar } from 'react-chartjs-2';
import Typography from "@material-ui/core/Typography";

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: 'Количество заказов',
            data: [12, 19, 3, 5, 2, 3],
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
};


const ChartNumberOrders: React.FC = (props) => {

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