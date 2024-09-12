    import Users from "./dbMode.js"
    import Casquette from "./dbModel2.js"
    import express from "express"
    import mongoose  from "mongoose";
    import cors from "cors"
    import multer from "multer";
    import path from "path";
import { error } from "console";
    const app = express();
    const port = 5000;

    // MongoDB connection string (ensure <db_password> is replaced or use environment variables)
    const connection_url ='mongodb+srv://admin:kpO9SDWy7bCBV7gC@cluster0.ftnr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

    // Connect to MongoDB using Mongoose
    mongoose.connect(connection_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
    app.use(express.json());

    // Middleware setup
    app.use(cors({
        origin: "http://localhost:3000",                  
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
            const { username, email, password ,testAdmin } = req.body;
            
            if (!username || !email || !password)  {
                return res.status(400).json({ error: 'Username, email, and password are required' });
            }
            
            // Create a new user
            const newUser = new Users({ username, email, password,testAdmin});
            await newUser.save();
            
            res.status(201).json({ message: 'User registered successfully!',data__user:newUser  });
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

  try {
    // Fetch the user based on username
    const users = await Users.findOne({ username: username});

    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    

     
    const isMatch = password==users.password 

    if (isMatch) {
      // Authentication successful
      res.status(200).json({users});
    } 
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: "An error occurred" });
  }
});




    // Start the server
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });

    