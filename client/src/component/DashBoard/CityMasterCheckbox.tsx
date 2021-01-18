import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { CityForListType, MasterForListType } from "../../containers/Admin/AdminDashboard";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";

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
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

interface ICityMasterCheckbox {
    cityList: CityForListType[]
    masterList: MasterForListType[]
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const CityMasterCheckbox: React.FC<ICityMasterCheckbox> = (props) => {
    const classes = useStyles();
    const [personName, setPersonName] = React.useState<string[]>([]);
    const { masterList, cityList } = props;

    const handleCheckCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name, event.target.checked, event.target.id);
    };

    const cityCheckbox = () => {
        return props.cityList.map((city) => {
            return(
                <FormControlLabel key={city.id + city.name}
                    control={<Checkbox
                                color="primary"
                                checked={city.active}
                                name={city.name}
                                onChange={handleCheckCity}
                                id={`${city.id}`}
                    />}
                    label={city.name}
                />
            )
        })
    };

    const masterCheckbox = () => {
        return props.masterList.map((master) => {
            return(
                <FormControlLabel key={master.id + master.name}
                    control={<Checkbox
                                color="primary"
                                checked={master.active}
                                name={master.name}
                                onChange={handleCheckCity}
                                id={`${master.id}`}
                    />}
                    label={master.name}
                />
            )
        })
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPersonName(event.target.value as string[]);
    };

    return (
        // <div className={classes.twoBlocks}>
        <div>

            <FormControl>
                <FormLabel component="legend">Города</FormLabel>
                <FormGroup>
                    {cityCheckbox()}
                </FormGroup>
            </FormControl>

            {/*<FormControl>*/}
            {/*    <FormLabel component="legend">Мастера</FormLabel>*/}
            {/*    <FormGroup>*/}
            {/*        {masterCheckbox()}*/}
            {/*    </FormGroup>*/}
            {/*</FormControl>*/}

            <FormControl className={classes.formControl}>
                <InputLabel id="chip-label">Chip</InputLabel>
                <Select
                    labelId="mutiple-chip-label"
                    id="mutiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {(selected as string[]).map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {masterList.map((master) => (
                        <MenuItem key={master.id+master.name} value={master.name}
                            // style={getStyles(master.active, personName, theme)}
                        >
                            {master.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>
    );
};

export default CityMasterCheckbox;