require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const {userRouter} = require('./route/user');
const {expenseRouter} = require('./route/expenseRoutes');
const {connect} = require('./DB/db')

app.use(express.json());
connect();
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/user', userRouter);
app.use('/expense', expenseRouter);

app.listen(port, () => { 
  console.log(`Example app listening at http://localhost:${port}`);
})