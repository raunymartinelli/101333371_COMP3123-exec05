const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Sample
router.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

/*
- Create a new HTML file named home.html
- Add an <h1> tag with the message "Welcome to ExpressJs Tutorial"
- Return home.html page to the client
*/
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

/*
- Return all details from user.json file to the client as JSON format
*/
router.get('/profile', (req, res) => {
  fs.readFile('user.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Server Error');
      return;
    }
    res.json(JSON.parse(data));
  });
});

/*
- Modify the /login route to accept username and password as query string parameters
- Read data from user.json file
- If username and password are valid, then send the response as below:
    {
        status: true,
        message: "User Is valid"
    }
- If the username is invalid, then send the response as below:
    {
        status: false,
        message: "User Name is invalid"
    }
- If the password is invalid, then send the response as below:
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  fs.readFile('user.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Server Error');
      return;
    }

    const userData = JSON.parse(data);

    if (userData.username === username && userData.password === password) {
      res.json({
        status: true,
        message: "User Is valid"
      });
    } else if (userData.username !== username) {
      res.json({
        status: false,
        message: "User Name is invalid"
      });
    } else if (userData.password !== password) {
      res.json({
        status: false,
        message: "Password is invalid"
      });
    }
  });
});

/*
- Modify the /logout route to accept username as a parameter and display a message
  in HTML format like `<b>${username} successfully logout.</b>`
*/
router.get('/logout/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logout.</b>`);
});

app.use('/', router);

app.listen(process.env.PORT || 8081);

console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
