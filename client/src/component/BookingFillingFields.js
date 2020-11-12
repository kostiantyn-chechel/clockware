import React, { useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import SelectElement from './SelectElement';
import DatePickers from './DatePickers';
import TimePickers from './TimePickers';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { isEmail } from '../helpers/validation';
import UploadPhoto from './UploadPhoto';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    radio: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    time: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    label: {
        margin: theme.spacing(1, 0, 0, 2),
    },
}));

function BookingFillingFields(props) {
    const classes = useStyles();
    const [noValidName, setNoValidName] = useState(false);
    const [noValidEmail, setNoValidEmail] = useState(false);
    const [noValidCity, setNoValidCity] = useState(false);

    useEffect(() => {
        if (props.cityId) setNoValidCity(false)
    },[props.cityId]);

    const changeNameText = event => {
        const name = event.target.value;
        props.changeName(name);
        if (name.trim().length > 2) {
            setNoValidName(false)
        } else  {
            setNoValidName(true)
        }
    };

    const changeEmailText = event => {
        const email = event.target.value;
        props.changeEmail(email);
        if (isEmail(email)) {
            setNoValidEmail(false);
        } else {
            setNoValidEmail(true);
        }
    };

    const isNoEmpty = () => {
        if (!props.name) setNoValidName(true);
        if (!props.email) setNoValidEmail(true);
        if (!props.cityId) setNoValidCity(true);
        return props.name && props.email && props.cityId
    };

    const   handleFindMaster = event => {
        event.preventDefault();
        const isValid = isNoEmpty() && !noValidName && !noValidEmail ;
        if (isValid) props.findMaster(props.cityId, props.date, props.time, props.size);

    };

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                Заполните Ваши данные
            </Typography>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            error={noValidName}
                            helperText={noValidName ? 'Имя не менее 3 знаков' : null}
                            onChange={changeNameText}
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="Ваше имя"
                            autoFocus
                            value={props.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={noValidEmail}
                            helperText={noValidEmail ? 'Некорректный email' : null}
                            onChange={changeEmailText}
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Ваш email"
                            name="email"
                            autoComplete="email"
                            value={props.email}
                        />
                    </Grid>

                    <FormLabel className={classes.label} component="legend">Укажите размер часов:</FormLabel>
                    <Grid item xs={12}>
                        <RadioGroup row aria-label="position"
                                    className={classes.radio}
                                    name="position"
                                    defaultValue="1"
                                    onChange={props.handleSizeChange}
                        >
                            <FormControlLabel
                                value="1"
                                control={<Radio color="primary" />}
                                label="Маленькие"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio color="primary" />}
                                label="Средние"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="3"
                                control={<Radio color="primary" />}
                                label="Большие"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>

                    </Grid>

                    <Grid className={classes.time} item xs={12} >
                        <UploadPhoto
                            photoURL={props.photoURL}
                            handlePhotoURL={props.handlePhotoURL}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SelectElement
                            arrItems={props.cities}
                            onChange={props.handleSelectCity}
                            noValidCity={noValidCity}
                        />
                    </Grid>

                    <FormLabel className={classes.label} component="legend">Укажите дату и время:</FormLabel>
                    <Grid className={classes.time} item xs={12}>
                        <Grid item xs={12} sm={6}>
                            <DatePickers
                                onChange={props.handleSelectDate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TimePickers
                                onChange={props.handleSelectTime}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    size="large"
                    onClick={handleFindMaster}
                >
                    Подобрать мастера
                </Button>
            </form>
        </div>
    );
}

export default BookingFillingFields;