import React from 'react';
import PhotoIcon from '@material-ui/icons/Photo';
import IconButton from '@material-ui/core/IconButton';

function PhotoButton(props) {
    const { photoURL, handleToggle } = props;

    if (photoURL) {
        return (
            <>
                <IconButton color='primary' onClick={() => handleToggle(photoURL)}>
                    <PhotoIcon />
                </IconButton>
            </>
        )
    } else {
        return (
            <>
                {null}
            </>
        )
    }
}

export default PhotoButton;