const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const AuthRoute = require('./Routes/Auth');
const NoteRoute = require('./Routes/Notes')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { requireAuth } = require('./Middleware/AuthMiddleware');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser : true,
  useUnifiedTopology : true,
}).then(console.log('Connected to DB successfully!!')).catch((err)=>{console.log(err)});



app.use('/api/auth', AuthRoute);
app.use('/api', NoteRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})