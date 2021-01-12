import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    warningBlock: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
}));

interface IWarning {
    valid: boolean
}

const Warning: React.FC<IWarning> = ({valid, children}) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            {!valid
                ?
                <div className={classes.warningBlock}>
                    <Typography variant="subtitle2" align="center" color="secondary">
                        {children}
                    </Typography>
                </div>
                :
                null
            }
        </React.Fragment>
    );
};

export default Warning;