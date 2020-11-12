import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SelectElement(props) {
    const classes = useStyles();
    const [city, setCity] = React.useState(props.cityId || '');

    const handleChange = (event) => {
        setCity(event.target.value);
        props.onChange(event.target.value);
    };

    const menuItemList = () => {
        if (props.arrItems.length) {
            return props.arrItems.map((city) => {
                return (<MenuItem key={`city${city.id}`} value={city.id}>{city.name}</MenuItem>)
            })
        } else  {
            return []
        }
    };

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="select-city-label">Выберите город</InputLabel>
                <Select
                    error={props.noValidCity}
                    labelId="select-city-label"
                    id="select-city-outlined"
                    value={city}
                    onChange={handleChange}
                    label="Выберите город"
                >
                    {menuItemList()}
                </Select>
            </FormControl>
        </div>
    );
}