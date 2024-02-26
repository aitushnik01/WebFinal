
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const passport = require('passport'); // Add Passport.js for authentication
const VKontakteStrategy = require('passport-vkontakte').Strategy; // Add VKontakte strategy
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const vkRoutes = require('./routes/vkRoutes'); // Add VK routes

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./Swagger/swagger.json')
const bookRoutes = require('./routes/bookRoutes')

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())


// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(passport.initialize());

// VK routes
app.use('/vk', vkRoutes);

// Book routes
app.use('/books', bookRoutes);

// User routes
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Book routes
app.use('/books', bookRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

