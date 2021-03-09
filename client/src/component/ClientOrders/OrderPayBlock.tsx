import React from 'react';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

interface IProps {
    cost: number
    costStatus: number
    orderId: number
}

const OrderPayBlock = ({cost, costStatus, orderId}: IProps) => {
    return (
        <Grid item xs container direction="column" spacing={2} alignItems={'flex-end'}>
            <Typography gutterBottom variant="subtitle1">
                {`# ${orderId}`}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
                {`ЦЕНА: ${cost}`}
            </Typography>
            {costStatus ?
                <Typography gutterBottom variant="subtitle1" color={"secondary"} >
                    {'ОПЛАЧЕНО'}
                </Typography>
                :
                <Button
                    color='primary'
                    variant='contained'
                    component={Link}
                    to={`/pay/${orderId}`}
                >
                    ОПЛАТИТЬ
                </Button>
            }
        </Grid>
    );
};

export default OrderPayBlock;