const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const userRouter = require("./src/routes/user.route");
const movieRouter=require("./src/routes/movie.route");
const db = require("./src/models");
const { auth } = require("./src/utility/auth");
const cors = require('cors');
const path=require('path')
const userMovieRoutes = require("./src/routes/user-movie.route.js");
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use("/users", userRouter);
// Middleware for authentication
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(auth) 
app.use('/user-movies', userMovieRoutes);
app.use("/movies", movieRouter);

// app.use(auth); 
// Sync Sequelize models with the database and start the server


app.listen(3000, () => {
    console.log("Server is running on port 3000");
    (async () => {
        try {
            await db.sequelize.sync({alter:false});
            console.log("Database synced successfully");
        } catch (error) {
            console.error("Error syncing database:", error);
        }
    })();
});
