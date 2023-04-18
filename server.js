const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const ApiError = require('./utils/ApiError');

dotenv.config({path: 'config.env'})
const dbConneection = require('./config/database')
const globalError = require('./middlewares/errorMiddleware');
// Route
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const brandRoute = require('./routes/brandRoute')
const productRoute = require('./routes/productRoute')
// Connect  with database
dbConneection();
// express app
 const app = express();
 // Middlewares
 app.use(express.json()) // CONVERT JSON TO STRING
 if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'));
   console.log(`mode:${process.env.NODE_ENV}`)
 }
 //Mount Routes
app.use('/api/v1/categories',categoryRoute);
app.use('/api/v1/subcategories',subCategoryRoute);
app.use('/api/v1/brands',brandRoute);
app.use('/api/v1/products',productRoute);
app.use('*',(req,res,next)=>{
  // // Create error and send it tp error handling middleware
  // const err = new Error(`Can't find this route ${req.originalUrl}`)
  // // send error
  //   next(err.message);
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400))
});
// Global error handling middleware for express
app.use(globalError);
 const PORT = process.env.PORT || 8000;
 const server = app.listen(PORT, ()=>{
    console.log(`App running ON PORT ${PORT}`);
 });
 // Handle rejection outside express
 process.on("unhandledRejection",(err)=>{
  console.error(`UnhandledRejection Errors ${err.name} | ${err.message}`);
  server.close(()=>{
    console.error(`shutting down...`);
    process.exit(1);
  }) ;   
 
 })