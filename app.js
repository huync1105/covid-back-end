const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const dbUrl = 'mongodb://localhost:27017/covid';
// const dbUrl = 'mongodb+srv://huync1105:64719199%40huy@cluster0.t2ebu.mongodb.net/covid-news?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

// import routes
const userRouter = require('./Routes/users');
app.use('/users', userRouter);

const postRouter = require('./Routes/posts');
app.use('/posts', postRouter);

const mainCategoryRouter = require('./Routes/main-category');
app.use('/maincategories', mainCategoryRouter);

const subCategoryRouter = require('./Routes/sub-category');
app.use('/subcategories', subCategoryRouter);

const commentRouter = require('./Routes/comments');
app.use('/comments', commentRouter);

const emailRouter = require('./Routes/send-mail');
app.use('/sendemail', emailRouter)

app.use('/admin', express.static(path.join(__dirname, 'public/Login/login.html')));

app.use(express.static(path.join(__dirname, 'public')));

// connect to db
mongoose.connect(
  dbUrl,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connected to db')
  }
)

// listening port
app.listen(3000);