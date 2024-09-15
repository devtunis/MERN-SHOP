    import Users from "./dbMode.js"
    import Casquette from "./dbModel2.js"
    import Lunette from "./dbModel3.js"
    import SectionSac from "./dbModel4.js"
    import express from "express"
    import mongoose  from "mongoose";
    import cors from "cors"
    import multer from "multer";
    import path from "path";
    import { error } from "console";
    import dotenv from 'dotenv';
    import bcrypt from 'bcryptjs'; // Add this import statement
    import stripe from 'stripe';
    import bodyParser from 'body-parser';

    // this new Thing in server.js
    dotenv.config(); // Load environment variables

    const app = express();
    const port = process.env.PORT  

    // MongoDB connection string (ensure <db_password> is replaced or use environment variables)
    const connection_url =process.env.BASEURL

    // Connect to MongoDB using Mongoose
    mongoose.connect(connection_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
    app.use(express.json());
    app.use(bodyParser.json());
    // Middleware setup
    app.use(cors({
        origin: process.env.ORIGINDOMAIN,                  
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
        credentials:true,
    }));
    
app.use(express.json({ limit: '10mb' })); // Adjust the limit according to your needs
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static('uploads'));


    // Middleware for parsing JSON bodies
    // app.use(express.json({ limit: '1000mb' }));                              
    // app.use(express.urlencoded({ limit: '1000mb', extended: true }));

    // Define your routes
    app.get('/', (req, res) => {
        res.send('Hello World papai !');
    });


    


app.get("/ADMIN",async(req,res)=>{
    try{ 
        const reponse = await Users.find()
        res.status(200).json(reponse)

    }  
    catch(error){
        console.log(`this eror by ${error}`)
    }
})


app.post('/register', async (req, res) => {
  try {
      const { username, email, password, testAdmin } = req.body;
      
      if (!username || !email || !password) {
          return res.status(400).json({ error: 'Username, email, and password are required' });
      }
      
      // Hash the password
      const salt = await bcrypt.genSalt(10); // Generate a salt
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

      // Create a new user
      const newUser = new Users({
          username,
          email,
          password: hashedPassword, // Save the hashed password
          testAdmin
      });

      await newUser.save();
      
      res.status(201).json({ message: 'User registered successfully!', data__user: newUser });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});
    
    
    app.get("/findoneUser/:id",async(req,res)=>{
        try{

            const user__response = await Users.findById(req.params.id)
            if(!user__response){
                return res.status(404).json({ message: "User not found" });
            } else{
                res.status(200).json(user__response.basket)
            }

        }

        catch(error){
            console.log(`this eror facing by ${error}`)
        }
    })
    
    

    app.put("/x/:id", async (req, res) => {
        try {
          const { PrixProduct, id, imgItem, titleProduct, userId } = req.body;
      
          // Find the user by ID
          const user__response = await Users.findById(req.params.id);
          console.log(user__response);
      
          if (!user__response) {
            return res.status(404).json({ message: "User not found" });
          }
      
          // Ensure that the basket array exists in the user's schema
          const UpdateData = await Users.updateOne(
            { _id: req.params.id },
            {
              $push: {
                basket: { PrixProduct, id, imgItem, titleProduct, userId }, // Corrected typo
              },
            }
          );
      
          // Check if the document was modified
          if (UpdateData.modifiedCount === 0) {
            return res.status(404).json({ message: "No changes were made" });
          }
      
          res.status(200).json({ message: "Basket updated successfully" });
        } catch (error) {
          console.log(`Error encountered: ${error}`);
          res.status(500).json({ message: "Server error", error });
        }
      });
      

      app.delete("/removeItem/:id", async (req, res) => {
        const { id1 } = req.query; // Get id1 from the query parameters
      
        try {
          const user = await Users.findById(req.params.id);
          console.log(user, "current request");
      
          if (!user) {
            return res.status(404).send('User not found');
          }
      
          // Filter out the item with the given id1
          const updatedBasket = user.basket.filter((item) => item.id !== id1);
      
          if (user.basket.length === updatedBasket.length) {
            return res.status(404).send('Item not found in basket');
          }
      
          console.log(updatedBasket, "<===>");
          user.basket = updatedBasket; // Update the user's basket
          await user.save();
      
          res.status(200).send({ message: "Item removed successfully", basket: user.basket });
        } catch (error) {
          console.log(`Error removing item: ${error}`);
          res.status(500).send('Error removing item');
        }
      });
      

    app.get("/Udata/:id",async(req,res)=>{

        try{
        const response = await  Users.findById(req.params.id)
        res.status(200).json(response.basket)
        }
        catch(eroor){
            console.log(`this eroor ${eroor}`)
        }
    })











    
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/'); // Folder to save uploaded files
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname); // Keep original file name
        }
      });
      
      const upload = multer({ storage: storage });
     
      // Endpoint to handle file upload and other form data
      app.post('/postCasquette', multer({ dest: 'uploads/' }).single('imgItem'), async (req, res) => {
        const { PrixProduct, id, titleProduct } = req.body;
        const imgItem = req.file ? req.file.path : null; // Get file path if uploaded
    
        try {
            // Check if a Casquette with the same ID already exists
            const existingCasquette = await Casquette.findOne({ id });
    
            if (existingCasquette) {
                return res.status(400).json({ message: "Casquette with this ID already exists." });
            }
    
            // Create a new Casquette
            const newCasquette = new Casquette({ PrixProduct, id, imgItem, titleProduct });
    
            // Save the new Casquette to the database
            await newCasquette.save();
    
            // Respond with the created Casquette
            res.status(200).json(newCasquette);
    
        } catch (error) {
            console.error(`This error occurred: ${error.message}`); // Log more detailed error message
            res.status(500).json({ message: "An error occurred while processing your request." });
        }
    });

 
// -------------------------POST LUNETTE SECTION---------------------------------------
app.post('/postLunette', upload.single('imgItem'), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  const { PrixProduct, id, titleProduct } = req.body;
  const imgItem = req.file ? req.file.path : null;

  try {
      if (!PrixProduct || !id || !titleProduct) {
          return res.status(400).json({ message: "All fields (PrixProduct, id, titleProduct) are required." });
      }

      // Check if a Lunette with the same ID already exists
      const existingLunette = await Lunette.findOne({ id });

      if (existingLunette) {
          return res.status(400).json({ message: "Lunette with this ID already exists." });
      }

      // Create a new Lunette
      const newLunette = new Lunette({ PrixProduct, id, imgItem, titleProduct });

      // Save the new Lunette to the database
      await newLunette.save();

      // Respond with the created Lunette
      res.status(200).json(newLunette);

  } catch (error) {
      console.error(`Error: ${error.message}`, error);
      res.status(500).json({ message: "An error occurred while processing your request." });
  }
});












// -------------------------POST SAC SECTION---------------------------------------
app.post('/PostSac', upload.single('imgItem'), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  const { PrixProduct, id, titleProduct } = req.body;
  const imgItem = req.file ? req.file.path : null;
  

  try {
      if (!PrixProduct || !id || !titleProduct) {
          return res.status(400).json({ message: "All fields (PrixProduct, id, titleProduct) are required." });
      }

      // Check if a Lunette with the same ID already exists
      const existingLunette = await SectionSac.findOne({ id });

      if (existingLunette) {
          return res.status(400).json({ message: "Lunette with this ID already exists." });
      }

      // Create a new Lunette
      const newSac = new SectionSac({ PrixProduct, id, imgItem, titleProduct });

      // Save the new Lunette to the database
      await newSac.save();

      // Respond with the created Lunette
      res.status(200).json(newSac);

  } catch (error) {
      console.error(`Error: ${error.message}`, error);
      res.status(500).json({ message: "An error occurred while processing your request." });
  }
});

app.get("/SacImage",async(req,res)=>{
  try{
      const reponse = await SectionSac.find()
      res.status(200).json(reponse)
  }
  catch(eroor){
    console.log(`this error by ${eroor}`)
    res.status(404).json({message : eroor})
  }
})




// app.put("/lx/:id", async (req, res) => {
//   try {
//     const { PrixProduct, id, imgItem, titleProduct, userId } = req.body;

//     // Find the user by ID
//     const user__response = await Users.findById(req.params.id);
//     console.log(user__response);

//     if (!user__response) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Ensure that the basket array exists in the user's schema
//     const UpdateData = await Users.updateOne(
//       { _id: req.params.id },
//       {
//         $push: {
//           basket: { PrixProduct, id, imgItem, titleProduct, userId }, // Corrected typo
//         },
//       }
//     );

//     // Check if the document was modified
//     if (UpdateData.modifiedCount === 0) {
//       return res.status(404).json({ message: "No changes were made" });
//     }

//     res.status(200).json({ message: "Basket updated successfully" });
//   } catch (error) {
//     console.log(`Error encountered: ${error}`);
//     res.status(500).json({ message: "Server error", error });
//   }
// });






















app.get("/LunneteImage",async(req,res)=>{

  try{
    const reponse = await  Lunette.find()
    res.status(200).json(reponse)
  }
  catch(eroor){
    console.log(`this eroor by ${eroor}`)
    res.status(404).json({message : error})
  }
})





    // Add this to your existing Express setup
   app.get('/casquettes', async (req, res) => {
    try {
      const casquettes = await Casquette.find(); // Fetch all casquettes
      res.status(200).json(casquettes);
    } catch (error) {
      console.error(`Error fetching casquettes: ${error}`);
      res.status(500).json({ message: "An error occurred while fetching casquettes." });
    }
  });




  app.delete("/dlp/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    try {
        // Use deleteMany with a filter to specify which items to delete
        const response = await Casquette.deleteMany({ _id: id });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "No items found with the given ID" });
        }

        // Send a response with the result of the deletion
        res.status(200).json({ message: "Items deleted successfully", result: response });
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
});




    
app.post("/identify", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    // Fetch the user based on username
    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Authentication successful
      res.status(200).json({ user });
    } else {
      // Authentication failed
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "An error occurred" });
  }
});


const stripeClient = stripe(process.env.STRIPE_SECRET_KEY); // Use your Stripe Secret Key from environment variables
//NahdiGhaith
 
app.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'eur', // Currency
      payment_method: paymentMethodId,
      confirm: true,
      // Add return_url here
      return_url: 'http://localhost:5000/return-url'
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});


    // Start the server
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });

 