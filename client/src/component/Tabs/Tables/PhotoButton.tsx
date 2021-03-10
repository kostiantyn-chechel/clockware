import React from 'react';
import PhotoIcon from '@material-ui/icons/Photo';
import IconButton from '@material-ui/core/IconButton';

interface IPhotoButton {
    photoURL: string,
    handleToggle(url: string): void,
}

const PhotoButton: React.FC<IPhotoButton> = (props) => {
    const { photoURL, handleToggle } = props;

    return (
        photoURL ?
            <IconButton color='primary' onClick={() => handleToggle(photoURL)}>
                <PhotoIcon />
            </IconButton>
            : null
    )
};

export default PhotoButton;