import mongoose from 'mongoose';
 
// Define the schema
// const tiktokSchema = new mongoose.Schema({
//     username: { type: String, required: true ,unique:true   },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     img: { type: String },
//     testAdmin : {type:String},
//     basket: [{
//         PrixProudct: { type: String, required: true },
//         id: { type: String, required: true },
//         imgItem: { type: String, required: true },
//         titleProudct: { type: String},
//         userId : {type:String,required: true}
//     }]
// }, { timestamps: true });

// // Export the model
// export default mongoose.model('Users', tiktokSchema);
 


const userSchema = new mongoose.Schema({
    username: { type: String, required: true ,unique:true   },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    testAdmin : {type:String},
    basket: [
      {
        PrixProduct: String,
        id: String,
        imgItem: String,
        titleProduct: String,
        userId: String,
      },
    ],
  }, { timestamps: true });
  
  export default mongoose.model('Users', userSchema);
  