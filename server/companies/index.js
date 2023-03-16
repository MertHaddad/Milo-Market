const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('companies.json')
const middlewares = jsonServer.defaults()
const https = require("https");
const fs = require("fs");

server.use(middlewares)
server.use(router)
/*
server.listen(6001,"0.0.0.0", () => {
  console.log('JSON Server is running')
})
*/

    https
        .createServer({
                key: fs.readFileSync("./../../../../../../httpd-cert/merthaddad.dev_panel.key"),
                cert: fs.readFileSync("./../../../../../../httpd-cert/merthaddad.dev_panel.crt"),
            },
            server
        )
        .listen(6001, "0.0.0.0", () => {

            startAt = new Date();
            console.log("Jood CRM API LISTENING ON PORT " + 6001);
        });