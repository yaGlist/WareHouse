require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { connectDataBase } = require('../backend/database/connectDataBase');

const userApiRoutes = require('./routes/api-user-routes')
const categoryApiRoutes = require('./routes/api-category-routes')
const producerApiRoutes = require('./routes/api-producer-routes')
const storageApiRoutes = require('./routes/api-storage-routes')
const subcategoryApiRoutes = require('./routes/api-subcategory-routes')
const productApiRoutes = require('./routes/api-product-routes')
const productAmountApiRoutes = require('./routes/api-productAmount-routes')

connectDataBase();

app.use(express.json());
app.use(cors());

app.use(userApiRoutes)
app.use(categoryApiRoutes)
app.use(producerApiRoutes)
app.use(storageApiRoutes)
app.use(subcategoryApiRoutes)
app.use(productApiRoutes)
app.use(productAmountApiRoutes)

app.listen(process.env.PORT, (error) => {
    error
        ? console.log(error)
        : console.log(`Listening port ${process.env.PORT}`);
});
