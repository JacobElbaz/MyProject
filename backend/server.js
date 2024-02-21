import express from 'express';
import routes from './routes/userRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(cors({
  credentials: true,
}));

// Use the defined routes
app.use('/api', routes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});