import React,{useState,useEffect} from 'react'
import axios from './axios';
import "./LunetteForm.css"
import { toast } from 'react-toastify';
const SacForm = () => {
   
  const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};



    
    const [formData, setFormData] = useState({
        PrixProduct: '',
        id: '',
        titleProduct: '',
      });
      const [file, setFile] = useState(null);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('PrixProduct', formData.PrixProduct);
        data.append('id',generateId());
        data.append('titleProduct', formData.titleProduct);
        if (file) data.append('imgItem', file);
    
        try {
          const response = await axios.post('/PostSac', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
       
        
            
          });
          toast.success("add to your store")
          window.location.reload()
          console.log('Response:', response.data);
        } catch (error) {
          console.error('Error:', error.response ? error.response.data : error.message);
        }
      };


  return (
    <div className="form-container">
    <h1>Upload  Sac  <p style={{fontSize:"10px",color:"red"}}>Size pictuer 1 mb to 8mb max</p></h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="PrixProduct">Prix Product:</label>
        <input
          type="text"
          id="PrixProduct"
          name="PrixProduct"
          value={formData.PrixProduct}
          onChange={handleChange}
        />
      </div>
    
      <div>
        <label htmlFor="titleProduct">Title Product:</label>
        <input
          type="text"
          id="titleProduct"
          name="titleProduct"
          value={formData.titleProduct}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="imgItem">Image Item:</label>
        <input
          type="file"
          id="imgItem"
          name="imgItem"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
  )
}

export default SacForm