import React, { useEffect } from 'react';
import FormControl from "@material-ui/core/FormControl";
import { Checkbox } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { CityForListType, MasterForListType } from "../../containers/Admin/AdminDashboard";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
    twoBlocks: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        width: 200,

    },
}));

interface ICityMasterCheckbox {
    cities: string[]
    cityList: CityForListType[]
    masters: string[]
    masterList: MasterForListType[]
    checkCityList(list: CityForListType[]): void;
    checkMasterList(id: MasterForListType[]): void;
}

const CityMasterSelects: React.FC<ICityMasterCheckbox> = (props) => {
    const classes = useStyles();
    const { cityList, cities, masterList, masters, checkCityList, checkMasterList } = props;

    const [cityName, setCityName] = React.useState<string[]>(cities);
    const [masterName, setMasterName] = React.useState<string[]>([]);

    useEffect(() => setCityName(cities) , [cities]);
    useEffect(() => setMasterName(masters),[masters]);

    const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selected = event.target.value as string[];
        setCityName(selected);

        checkCityList(cityList.map(city => {
            return selected.includes(city.name)
                ? { ...city, active: true }
                : { ...city, active: false }
        }))
    };

    const handleMasterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selected = event.target.value as string[];
        console.log('selected', selected);
        setMasterName(selected);

        checkMasterList(masterList.map(master => {
            return selected.includes(master.name)
                ? { ...master, active: true }
                : { ...master, active: false }
        }))
    };

    return (
        <div className={classes.twoBlocks}>

            <FormControl className={classes.formControl}>
                <Select
                    labelId="city-multiple-checkbox"
                    id="city-multiple-checkbox"
                    multiple
                    value={cityName}
                    onChange={handleCityChange}
                    input={<Input />}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                >
                    {cityList.map((city) => (
                        <MenuItem key={city.id + city.name} value={city.name}>
                            <Checkbox checked={cityName.indexOf(city.name) > -1} />
                            <ListItemText primary={city.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <Select
                    labelId="master-multiple-checkbox"
                    id="master-multiple-checkbox"
                    multiple
                    value={masterName}
                    onChange={handleMasterChange}
                    input={<Input />}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                >
                    {masterList.map((master) => (
                        <MenuItem
                            key={master.id + master.name} value={master.name}>
                            <Checkbox checked={masterName.indexOf(master.name) > -1} />
                            <ListItemText primary={master.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>
    );
};

export default CityMasterSelects;