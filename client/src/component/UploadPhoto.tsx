import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { postPhotoCloudinary } from '../helpers/axios/axiosCloudinary';

const START_PHOTO = `${process.env.PUBLIC_URL + '/photo.png'}`;
const FILE_SIZE_LIMIT = 2097152;

const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    image: {
        maxWidth: '452px',
        maxHeight: '340px',
        borderRadius: '10px',
    },
    label: {
        cursor: 'pointer',
    },
    warning: {
        margin: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '452px',
        height: '180px',
        boxSizing: 'border-box',
        borderRadius: '10px',
        backgroundColor: 'rgba(215,192,192,0.82)',
        border: '5px solid #bf090a',
        color: '#bf090a',
    },
}));

interface IUploadPhoto {
    photoURL: string,
    handlePhotoURL(url: string): void;
}

const UploadPhoto:React.FC<IUploadPhoto> = (props) => {
    const classes = useStyles();
    const { photoURL } = props;

    const [imgURL, setImgURL] = useState(START_PHOTO);
    const [errorSize, setErrorSize] = useState(false);

    /* eslint-disable */
    useEffect(() => {
        if (photoURL) {
            setImgURL(photoURL);
        } else {
            setImgURL(START_PHOTO);
        }
    }, [photoURL]);
    /* eslint-enable */

    useEffect(() => {
        setTimeout(() => {
            setErrorSize(false)
        }, 2500)
    },[errorSize]);

    const loadPhoto =  () => {
        // @ts-ignore
        let file = document.getElementById('load-file').files[0];

        if (file) {
            if (file.size > FILE_SIZE_LIMIT) {
                setErrorSize(true);
            } else {
                postPhotoCloudinary(file)
                    .then(url =>{
                        setImgURL(url);
                        props.handlePhotoURL(url);
                    })
                    .catch(() => {
                        setImgURL(START_PHOTO);
                        props.handlePhotoURL('');
                    });
            }
        }
    };

    const placePhoto = () => {
        if (errorSize) {
            return (
                <div className={classes.warning}>
                    <h2>Размер фото не более 2Мб</h2>
                </div>)
        } else {
            return (
                <label htmlFor="load-file" className={classes.label}>
                    <img src={imgURL} className={classes.image} alt=''/>
                </label>
            )
        }
    };

    return (
        <>
            <input accept="image/*"  id="load-file" type="file"
                   className={classes.input}
                   onChange={loadPhoto}
            />
            {placePhoto()}
        </>
    );
};

export default UploadPhoto;