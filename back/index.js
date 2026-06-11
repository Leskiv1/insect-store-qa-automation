import express from "express";
import cors from "cors";
import insectRoute from "./routes/insect.route.js";
import cartRoute from "./routes/cart.route.js";
import sequelize from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
	const start = Date.now();

	res.on('finish', () => {
		const duration = Date.now() - start;
		const logMessage = `${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${duration}ms`;

		console.log(logMessage);
	});
	next();
});

app.use('/api/insects', insectRoute);
app.use('/api/carts', cartRoute);

const startServer = async () => {
    try {
        // Test the connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        // Sync the models to the database (Creates the tables)
        await sequelize.sync({ alter: true }); 
        console.log('All database tables synced successfully.');

        // Start the server only after the DB is ready
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// 3. Run the function
startServer();