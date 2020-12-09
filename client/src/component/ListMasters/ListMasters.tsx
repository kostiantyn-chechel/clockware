import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import {IMaster} from "../../interfaces";

const useStyles = makeStyles((theme) => ({
    masters: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    text: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    name: {
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        width: '200px'
    }
}));

interface IListMasters {
    arrMasters: IMaster[],
    onChange(event: React.ChangeEvent<HTMLInputElement>, value: string): void,
    handleMasterReview(id: number): void
}

const ListMasters: React.FC<IListMasters> = (props) => {
    const classes = useStyles();

    const itemList = () => {
        return props.arrMasters.map((master, index) => {
            const item = (name: string, rating: number) => {
                return (
                    <React.Fragment>
                        <Grid className={classes.masters} container spacing={1}>
                            <div className={classes.text}>
                                <div className={classes.name}>
                                    {name}
                                </div>
                                <Box component="fieldset" mb={0} borderColor="transparent">
                                    <Rating name="read-only" value={rating} readOnly />
                                </Box>

                                <IconButton
                                    color='primary'
                                    onClick={() => props.handleMasterReview(master.id)}
                                    title={'Отзывы'}
                                >
                                    <CommentIcon />
                                </IconButton>

                            </div>
                        </Grid>
                    </React.Fragment>
                    )

            };
            return (
                <FormControlLabel
                    key={`master${index}`}
                    value={`${master.id}`}
                    control={<Radio color="primary" />}
                    label={item(master.name, master.rating)}
                    labelPlacement="end"
                />
            )
        })
    };

    return (
            <RadioGroup row
                        aria-label="masters"
                        name="masters"
                        onChange={props.onChange}
            >
                {itemList()}
            </RadioGroup>
    );
};

export default ListMasters;