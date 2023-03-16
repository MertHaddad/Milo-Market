const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('items.json')
const middlewares = jsonServer.defaults()
const https = require("https");
const fs = require("fs");

server.use(middlewares)
server.use(router)
/*
server.listen(7000,"0.0.0.0",() => {
  console.log('JSON Server is running')
})*/


    https
        .createServer({
                key: fs.readFileSync("./../../../../../../httpd-cert/merthaddad.dev_panel.key"),
                cert: fs.readFileSync("./../../../../../../httpd-cert/merthaddad.dev_panel.crt"),
            },
            server
        )
        .listen(7000, "0.0.0.0", () => {

            startAt = new Date();
            console.log("Jood CRM API LISTENING ON PORT " + 7000);
        });