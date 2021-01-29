import React from 'react';
import { Pie } from 'react-chartjs-2';
import Typography from "@material-ui/core/Typography";
import { IChartList } from "../../containers/Admin/AdminDashboard";
import makeStyles from "@material-ui/core/styles/makeStyles";

const data = {
    labels: ['1'],
    datasets: [
        {
            label: '# of Votes',
            data: [1],
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
            ],
            borderColor: 'rgba(37,38,150,0.82)',
            borderWidth: 2,
        },
    ],
};

const options = {
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

interface IOrderChartByCity {
    listData: IChartList[]
}

const OrderChartByCity: React.FC<IOrderChartByCity> = (props) => {
    const classes = useStyles();
    const { listData } = props;

    data.labels = listData.map(item => item.name);
    data.datasets[0].data = listData.map(item => item.count);

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                Заказы по городам
            </Typography>

            {listData.length
                ?   <Pie data={data} options={options} />
                :   <div className={classes.noData}>
                    <Typography component="h1" variant="h4" align="center" color="textPrimary">
                        НЕТ ДАННЫХ
                    </Typography>
                </div>
            }
        </React.Fragment>
    );
};

export default OrderChartByCity;