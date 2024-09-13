import React, { useState } from 'react';
import axios from './axios';
import "./BASEADDDATA.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASEADDDATA = () => {
    // State for each input field
    const [prixProduct, setPrixProduct] = useState('');
    const [id, setId] = useState(''); // This state can be removed if you generate the ID automatically
    const [imgItem, setImgItem] = useState(null);
    const [titleProduct, setTitleProduct] = useState('');
    const [imgPreview, setImgPreview] = useState(''); // State for image preview URL

    // Function to generate a unique ID
    const generateId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    // Handler for form submission
    const HandelRequest = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('PrixProduct', prixProduct);  
        formData.append('id', generateId()); // Generate and append a unique ID
        if (imgItem) {
            formData.append('imgItem', imgItem); // Append file object
            toast.success("Added with success");
        }
        formData.append('titleProduct', titleProduct);

        try {
            await axios.post("/postCasquette", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Data sent successfully');
            window.location.reload();
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
            {imgPreview && <img src={imgPreview} alt="Preview" style={{ width: '100px', height: '100px' }} />}
            <input
                className='prixProudctSection'
                type="number"
                value={prixProduct}
                onChange={(e) => setPrixProduct(e.target.value)}
                placeholder="PrixProduct"
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
            <ToastContainer position='top-left'/>
        </div>
    );
};

export default BASEADDDATA;
