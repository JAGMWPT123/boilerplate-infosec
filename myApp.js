const express = require('express');
const helmet = require("helmet");
const app = express();
bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.disable("x-powered-by");

const ninetyDaysInSeconds = 90*24*60*60;
console.log(ninetyDaysInSeconds);
// Use Helmet!
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.ieNoOpen())
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noCache());
app.use(helmet.contentSecurityPolicy(
  {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        'trusted-cdn.com'
      ]
  }
}));

//We introduced each middleware separately
//  for teaching purposes and for ease 
//  of testing. Using the ‘parent’ helmet()
// //   middleware is easy to implement in a real project.
// app.use(helmet({
//   frameguard: {         // configure
//     action: 'deny'
//   },
//   contentSecurityPolicy: {    // enable and configure
//     directives: {
//       defaultSrc: ["'self'"],
//       styleSrc: ['style.com'],
//     }
//   },
//   dnsPrefetchControl: false     // disable
// }))





































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  console.log(request.body);
  //console.log(ninetyDaysInSeconds);
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
