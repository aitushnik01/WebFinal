
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Book routes
app.use('/books', bookRoutes);

// User routes
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

