import React, {useEffect, useMemo} from 'react';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { CityForListType, MasterForListType } from "../../containers/Admin/AdminDashboard";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

const useStyles = makeStyles((theme) => ({
    twoBlocks: {
        marginTop: theme.spacing(2),
        display: 'flex',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    formControl: {
        margin: theme.spacing(1),
        width: 200,

    },
}));

interface ICityMasterCheckbox {
    cities: string[]
    cityList: CityForListType[]
    masterList: MasterForListType[]
    checkCityList(list: CityForListType[]): void;
    checkMaster(id: number): void;
}

const CityMasterSelects: React.FC<ICityMasterCheckbox> = (props) => {
    const classes = useStyles();

    const { cityList, cities, masterList, checkCityList, checkMaster } = props;

    console.log('cities', cities);
    // const [cityName, setCityName] = React.useState<string[]>([]);
    const [cityName, setCityName] = React.useState<string[]>(cities);
    const [masterName, setMasterName] = React.useState<string[]>([]);

    useEffect(() => {
        setCityName(cities)
    }, [cities]);

    // const handleCheckCity = (event: React.ChangeEvent<HTMLInputElement>) => checkCity(+event.target.id);
    // const handleCheckMaster = (event: React.ChangeEvent<HTMLInputElement>) => checkMaster(+event.target.id);

    const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selected = event.target.value as string[];
        setCityName(selected);
        console.log('cityListNew', cityList.map(city => {
            return selected.includes(city.name)
                ? { ...city, active: true }
                : { ...city, active: false }
        }));
        checkCityList(cityList.map(city => {
            return selected.includes(city.name)
                ? { ...city, active: true }
                : { ...city, active: false }
        }))
        // console.log(event.target.value)
    };


    const handleMasterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setMasterName(event.target.value as string[])
    };

    return (
        <div className={classes.twoBlocks}>

            <FormControl className={classes.formControl}>
                <Select
                    labelId="mutiple-checkbox"
                    id="mutiple-checkbox"
                    multiple
                    value={cityName}
                    onChange={handleCityChange}
                    input={<Input />}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    // MenuProps={MenuProps}
                >
                    {cityList.map((city) => (
                        <MenuItem key={city.id + city.name} value={city.name}>
                            <Checkbox checked={cityName.indexOf(city.name) > -1} />
                            {/*<Checkbox checked={city.active} />*/}
                            <ListItemText primary={city.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <Select
                    labelId="mutiple-checkbox"
                    id="mutiple-checkbox"
                    multiple
                    value={masterName} // список в поле отображения
                    onChange={handleMasterChange}
                    input={<Input />}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    // MenuProps={MenuProps}
                >
                    {masterList.map((master) => (
                        <MenuItem
                            key={master.id + master.name}
                            value={master.id}
                        >
                            <Checkbox checked={masterName.indexOf(master.name) > -1} />
                            <ListItemText primary={master.name} /> {/*// имя в списке*/}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>
    );
};

export default CityMasterSelects;