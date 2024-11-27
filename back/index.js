import express from "express";
import cors from "cors";
import insectRoute from "./routes/insect.route.js";
import cartRoute from "./routes/cart.route.js";

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

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});