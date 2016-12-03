'use strict';
const express = require('express');
const app = express();
const settings = require('./settings');
const remoteData = require('./webapp/static/assets/list.json');


app.get('/api/list', function (req, res, next) {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;
    let result = remoteData.filter((item) => {
        return item.id > skip;
    });

    result = result.slice(0, limit);
    res.json({success: true, result: result});
});


let env = process.env.NODE_ENV;
if (!env) {
    env = process.env.NODE_ENV = 'production';
}

try {
    if (env === 'development') {
        // static
        app.use('/static', express.static(__dirname + '/webapp/static', {maxAge: 0})); // 86400000 * 7
        // webpack dev
        const dev = require('./webapp/build/dev');
        dev.use(app);
    } else {
        // static
        app.use(express.static(__dirname + '/webapp/dist', {maxAge: 86400000 * 7}));
        app.use(function (req, res) {
            // html5 push state
            res.sendFile(__dirname + '/webapp/dist/index.html');
        });
    }

    // start webserver
    app.listen(settings.port);
    console.log(settings.appname + ' runnng port:' + settings.port);
} catch (err) {
    console.error(err);
    process.exit(1);
}
