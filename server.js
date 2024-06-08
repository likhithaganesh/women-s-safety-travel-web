const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myAuthApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/main1.html'));
       
});


app.get('/helpline', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/helpline.html'));
  });
  
  // Login endpoint
  app.post('/api/users/login', (req, res) => {
    // Example logic for login authentication
    const { email, password } = req.body;
  
    // Authenticate user (replace with your authentication logic)
    if (email === 'user@example.com' && password === 'password') {
      // Redirect to /helpline upon successful login
      res.redirect('/helpline');
    } else {
      res.status(401).json({ msg: 'Invalid credentials' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});