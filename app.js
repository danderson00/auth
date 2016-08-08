var express = require('express'),
    app = express()

app.use('/lib', express.static(__dirname + '/node_modules/azure-mobile-apps-client/dist/'))
app.use(express.static(__dirname))
app.listen(3000)