import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ICity } from "../interfaces";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

interface ISelectElement {
    noValidCity?: boolean,
    arrItems: ICity[],
    onChange(value: number): void,
    cityId?: number
}

const SelectElement:React.FC<ISelectElement> = (props) => {
    const classes = useStyles();
    const [city, setCity] = React.useState<any>(props.cityId || '');
    // const [city, setCity] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        const selectValue = event.target.value as number;
        setCity(selectValue);
        props.onChange(selectValue);
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
};

export default SelectElement;