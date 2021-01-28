import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getAuthServerRequest} from "../../helpers/axios/axiosClockwareAPI";
import {IFilterData} from "../../interfaces";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    searchBlock: {
        // marginLeft: theme.spacing(2),
        padding: '2px 2px',
        // width: '100%',
        width: 300,
    }
}));

export type TSearchComboBox = 'masters' | 'clients'

interface ISearchComboBox {
    filterName: TSearchComboBox
    setFilter: (name: string | null) => void
}

const SearchComboBox: React.FC<ISearchComboBox> = (props) => {
    const { filterName } = props;
    const classes = useStyles();

    const [value, setValue] = useState<string | null>('');
    const [inputValue, setInputValue] = useState<string | null>('');
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<IFilterData[]>([]);
    const loading = open && options.length === 0;

    /* eslint-disable */
    useEffect(() => {
        let active = true;

        if (!loading) return undefined;

        (async () => {
            getAuthServerRequest(`${filterName}/list`)
                .then(response => {
                    if (active) setOptions(response as IFilterData[]);
                });
        })();

        return () => { active = false }

    }, [loading]);

    useEffect(() => {
        props.setFilter(value)
    },[value]);
    /* eslint-enable */

    useEffect(() => {
        if (!open) setOptions([]);
    }, [open]);

    const changeValue = (event: any, newValue: IFilterData | string | null ) => {
        if (newValue) {
            if ((newValue as IFilterData).name) {
                setValue((newValue as IFilterData).name)
            } else {
                setValue(newValue as string)
            }
        } else {
            setValue(null)
        }
    };

    return (
        <div className={classes.searchBlock}>
            <Autocomplete
                id='search-combo-box'
                freeSolo
                clearOnEscape
                style={{ width: 300, height: 68}}
                open={open}
                onChange={changeValue}
                // @ts-ignore
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                getOptionSelected={(option, value) => {
                    return option.name === value.name
                }
                }
                getOptionLabel={(option) => {
                    if (typeof option === 'object') {
                        return option.name
                    }
                    return option
                }}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label='Поиск'
                        variant='outlined'
                        style={{ height: 30 }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </div>
    );
};

export default SearchComboBox;