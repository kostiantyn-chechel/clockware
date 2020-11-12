import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FilledInput from '@material-ui/core/FilledInput';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function MastersReview(props) {
    const classes = useStyles();
    const { masterReviews, masterName} = props;

    const reviewList = () => {
        return masterReviews.map(review => {
            if (review) {
                return (
                    <FilledInput
                        fullWidth
                        variant="filled"
                        key={review}
                        id="standard-textarea"
                        multiline
                        defaultValue={review}
                        readOnly={true}
                    />
                )
            } else {
                return null
            }
        })
    };

    const reviewShow = () => {
        if (masterReviews.length > 0) {
            return (
                <>
                    <Typography component="h1" variant="h5" align="center" color="textPrimary">
                        Отзывы о мастере {masterName}
                    </Typography>
                    <List component="nav" className={classes.root} aria-label="mailbox folders">
                        {reviewList()}
                    </List>
                </>
            )
        } else {
            return null
        }
    };

    return (
        <>
            {reviewShow()}
        </>
    );
}

export default MastersReview;