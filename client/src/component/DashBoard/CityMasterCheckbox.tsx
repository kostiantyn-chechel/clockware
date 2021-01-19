import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { CityForListType, MasterForListType } from "../../containers/Admin/AdminDashboard";

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
}));

interface ICityMasterCheckbox {
    cityList: CityForListType[]
    masterList: MasterForListType[]
    checkCity(id: number): void;
    checkMaster(id: number): void;
}

const CityMasterCheckbox: React.FC<ICityMasterCheckbox> = (props) => {
    const classes = useStyles();
    const { cityList, masterList, checkCity, checkMaster } = props;

    const handleCheckCity = (event: React.ChangeEvent<HTMLInputElement>) => checkCity(+event.target.id);
    const handleCheckMaster = (event: React.ChangeEvent<HTMLInputElement>) => checkMaster(+event.target.id);

    const cityCheckbox = () => {
        return cityList.map((city) => {
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
        return masterList.map((master) => {
            return(
                <FormControlLabel key={master.id + master.name}
                    control={<Checkbox
                                color="primary"
                                checked={master.active}
                                name={master.name}
                                onChange={handleCheckMaster}
                                id={`${master.id}`}
                    />}
                    label={master.name}
                />
            )
        })
    };


    return (
        <div className={classes.twoBlocks}>

            <FormControl className={classes.formControl}>
                <FormLabel component="legend">Города</FormLabel>
                <FormGroup>
                    {cityCheckbox()}
                </FormGroup>
            </FormControl>

            <FormControl className={classes.formControl}>
                <FormLabel component="legend">Мастера</FormLabel>
                <FormGroup>
                    {masterCheckbox()}
                </FormGroup>
            </FormControl>

        </div>
    );
};

export default CityMasterCheckbox;