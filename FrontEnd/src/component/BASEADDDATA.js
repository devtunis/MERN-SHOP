import React, { useState } from 'react';
import axios from './axios';
import "./BASEADDDATA.css"
const BASEADDDATA = () => {
    // State for each input field
    const [prixProduct, setPrixProduct] = useState('');
    const [id, setId] = useState('');
    const [imgItem, setImgItem] = useState(null);
    const [titleProduct, setTitleProduct] = useState('');
    const [imgPreview, setImgPreview] = useState(''); // State for image preview URL

    // Handler for form submission
    const HandelRequest = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('PrixProduct', prixProduct);  
        formData.append('id', id);
        if (imgItem) {
            formData.append('imgItem', imgItem); // Append file object
        }
        formData.append('titleProduct', titleProduct);

        try {
            await axios.post("/postCasquette", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Data sent successfully');
        } catch (error) {
            console.error(`This error occurred: ${error}`);
        }
    };

    // Handler for file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgItem(file); // Set the file object in state
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result); // Use base64 string for preview
            };
            reader.readAsDataURL(file); // Read the file as a data URL (base64)
        }
    };

    return (
        <div className='containerX'>
            {imgPreview && <img src={imgPreview} alt="Preview" style={{ width: '200px', height: 'auto' }} />}
            <input
                type="text"
                value={prixProduct}
                onChange={(e) => setPrixProduct(e.target.value)}
                placeholder="PrixProduct"
            />
            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="ID"
            />
            <input
                type="file"
                onChange={handleFileChange}
            />
            <input
                type="text"
                value={titleProduct}
                onChange={(e) => setTitleProduct(e.target.value)}
                placeholder="TitleProduct"
            />
            <button onClick={HandelRequest}>Add New Casquette</button>
        </div>
    );
};

export default BASEADDDATA;
