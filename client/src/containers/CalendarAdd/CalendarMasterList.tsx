import React from 'react';
import { ICalendarMaster } from '../../interfaces';
import RadioGroup from '@material-ui/core/RadioGroup';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import makeStyles from '@material-ui/core/styles/makeStyles';


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

interface IProps {
    masterList: ICalendarMaster[]
    handleSelectMaster(event: React.ChangeEvent<HTMLInputElement>, value: string): void,
}

const CalendarMasterList: React.FC<IProps> = ({masterList, handleSelectMaster}:IProps) => {
    const classes = useStyles();

    console.log('masterList', masterList);

    const itemList = () => {
        return masterList.map((master, index) => {
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
                    onChange={handleSelectMaster}
        >
            {itemList()}
        </RadioGroup>
    );
};

export default CalendarMasterList;