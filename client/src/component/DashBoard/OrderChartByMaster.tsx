import React from 'react';
import { Pie } from 'react-chartjs-2';
import Typography from "@material-ui/core/Typography";
import { IChartList } from "../../containers/Admin/AdminDashboard";
import makeStyles from "@material-ui/core/styles/makeStyles";

const data = {
    labels: ['1'],
    datasets: [
        {
            // label: '# of Votes',
            data: [1],
            fill: false,
            backgroundColor:[
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(94,255,164,0.9)',
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

interface IOrderChartByMaster {
    listData: IChartList[]
}

const OrderChartByMaster: React.FC<IOrderChartByMaster> = (props) => {
    const classes = useStyles();
    const { listData } = props;

    const list = listData.map(item => item);

    list.sort((a, b) => {
        if (a.count > b.count) return -1;
        if (a.count < b.count) return 1;
        return  0;
    });

    const other = list.splice(3);
    list[3] = {name: 'Остальные', count: sumCount(other)};

    data.labels = list.map(item => item.name);
    data.datasets[0].data = list.map(item => item.count);

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                Заказы по мастерам
            </Typography>

            {listData.length
                ?   <Pie data={data} options={options} />
                :   <div className={classes.noData}>
                    <Typography component="h1" variant="h5" align="center" color="textPrimary">
                        НЕТ ДАННЫХ
                    </Typography>
                </div>
            }
        </React.Fragment>
    );
};

export default OrderChartByMaster;

const sumCount = (list: IChartList[]): number => {
    let sum = 0;
    list.forEach(item => sum += item.count);
    return sum
};