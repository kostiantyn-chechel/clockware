import React from 'react';
import { Pie } from 'react-chartjs-2';
import Typography from "@material-ui/core/Typography";

const data = {
    labels: ['Мастер 1', 'Мастер 2', 'Мастер 3', 'Остальные'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5],
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75,192,192,0.9)',
                'rgba(153, 102, 255, 0.9)',
                'rgba(255, 159, 64, 0.9)'
            ],
            borderColor: 'rgba(55, 99, 232, 0.5)',
            borderWidth: 2,
        },
    ],
};

const options = {
    scales: {
        legend: {
            display: false,
        },
    },
};


const OrderChartByCity: React.FC = (props) => {

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                Диаграмма заказов по городам
            </Typography>
            <Pie data={data} options={options} />
        </React.Fragment>
    );
};

export default OrderChartByCity;