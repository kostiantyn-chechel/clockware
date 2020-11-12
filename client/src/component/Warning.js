import React from 'react';
import Typography from '@material-ui/core/Typography';

function Warning(props) {
    return (
        <React.Fragment>
            {!props.valid
                ?
                <Typography component="h4" variant="h5" align="center" color="secondary">
                    {props.children}
                </Typography>
                :
                null
            }
        </React.Fragment>
    );
}

export default Warning;