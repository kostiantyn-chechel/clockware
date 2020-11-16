import React from 'react';
import Typography from '@material-ui/core/Typography';

interface IWarning {
    valid: boolean
}

const Warning: React.FC<IWarning> = ({valid, children}) => {
    return (
        <React.Fragment>
            {!valid
                ?
                <Typography component="h4" variant="h5" align="center" color="secondary">
                    {children}
                </Typography>
                :
                null
            }
        </React.Fragment>
    );
};

export default Warning;