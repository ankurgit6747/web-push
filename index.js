const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

const publicVapidKey = 'BNl0lBObcPPCtvMaSk-x6VblBtRmSz3xmFOiZ0sGDF2SPpJQv6n6Dj-8vbNFmy30wJndf6nK7xUXQ2hEjj_H-oo';
const privaateVapidKey = 'e1un11fYlhzdmPjxjQ1MGFgtMfUj93toaJFCr32qGyA';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privaateVapidKey);

// subscribe route
app.post('/subscribe', (req, res) => {
  // get pushSubscribe object
  const subscription = req.body;

  // send 201 res
  res.status(201).json({});

  const payload = JSON.stringify({ 'title': 'Push test', 'body': 'Push notification from server', 'icon': 'http://image.ibb.co/frYOFd/tmlogo.png' });

  webpush.sendNotification(subscription, payload).catch(err => console.error(err));

})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))