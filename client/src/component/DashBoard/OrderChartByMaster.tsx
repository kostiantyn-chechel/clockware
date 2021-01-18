import React from 'react';
import { Pie } from 'react-chartjs-2';
import Typography from "@material-ui/core/Typography";

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(191,9,10,0.9)',
        },
    ],
};

const options = {
    scales: {

    },
};


const OrderChartByMaster: React.FC = (props) => {

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                Диаграмма заказов по мастерам
            </Typography>
            <Pie data={data} options={options} />
        </React.Fragment>
    );
};

export default OrderChartByMaster;