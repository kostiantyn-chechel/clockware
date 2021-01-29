import React from 'react';
import { Bar } from 'react-chartjs-2';
import Typography from "@material-ui/core/Typography";
import {IChartDateOrder} from "../../containers/Admin/AdminDashboard";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

const useStyles = makeStyles((theme) => ({
    noData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 100,
    },
}));

interface IChartNumberOrders {
    listData: IChartDateOrder[]
}

const ChartNumberOrders: React.FC<IChartNumberOrders> = (props) => {
    const classes = useStyles();
    const { listData } = props;

    data.labels = listData.map(item => item.date);
    data.datasets[0].data = listData.map(item => item.count);

    return (
        <div>
            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                График количества заказов
            </Typography>
            {listData.length
            ?   <Bar data={data} options={options} />
            :   <div className={classes.noData}>
                    <Typography component="h1" variant="h3" align="center" color="textPrimary">
                        НЕТ ДАННЫХ
                    </Typography>
                </div>
            }

        </div>
    );
};

export default ChartNumberOrders;