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

interface IProps {
    message: string
}

const SuccessMsg: React.FC<IProps> = ({message}: IProps) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            {message &&
                <div className={classes.warningBlock}>
                    <Typography variant="h4" align="center" color="secondary">
                        {message}
                    </Typography>
                </div>
            }
        </React.Fragment>
    );
};

export default SuccessMsg;