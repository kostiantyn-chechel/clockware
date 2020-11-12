import axios from 'axios';

const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

export const postPhotoCloudinary = async (file) => {

    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", 'clockware');

    return await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`,formData)
        .then((res) => {
            return res.data.secure_url
        })
};