const express = require('express');
const helmet = require('helmet');

const userRouter = require('./users/userRouter');

const server = express();

// server.use(morgan('dev')); //3rd party middleware
server.use(helmet());
server.use(logger);
server.use(express.json()); //built-in middleware

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  const messageOfTheDay = process.env.MOTD;
  res.status(200).json({ motd: messageOfTheDay });
});



//custom middleware
server.use(function(req, res, next){
  res.status(404).json({ message: "Opps!  This isnt the enpoint you are looking for" })
})

function logger(req, res, next) {
  // log info about the request to the console
  const method = req.method;
  const endpoint = req.originalUrl;
  const timeStamp = Date();
  console.log(`${method} to ${endpoint} at ${timeStamp}`);
  next();
}

module.exports = server;
