import mongoose from 'mongoose';
 
 const tiktokSchema = new mongoose.Schema({
        PrixProduct: { type: String,  required: true,},
        id: { type: String,  },
        imgItem: { type: String, required:true },
        titleProduct: { type: String,  },
 

}, { timestamps: true });
 
export default mongoose.model('Lunette', tiktokSchema);
 






