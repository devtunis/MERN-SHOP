"# ShopProject" 


clean update request 

app.put('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const newComments = req.body.commentsFromAdmin;

        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Push new comments into the commentsFromAdmin array
        user.commentsFromAdmin.push(...newComments); // i love this 

        // Save the updated user document
        await user.save();

        res.send('Comments added successfully');
    } catch (error) {
        res.status(400).send(error);
    }
});
