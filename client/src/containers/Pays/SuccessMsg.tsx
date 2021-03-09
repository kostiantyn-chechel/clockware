import React from 'react';
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    warningBlock: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(5),
    },
}));

const SuccessMsg: React.FC = ({children}) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            {children
                ?
                <div className={classes.warningBlock}>
                    <Typography variant="h4" align="center" color="secondary">
                        {children}
                    </Typography>
                </div>
                :
                null
            }
        </React.Fragment>
    );
};

export default SuccessMsg;