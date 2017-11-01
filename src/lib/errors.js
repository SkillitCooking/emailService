'use strict';

const config = require('../config');
const logging = require('./logging');

function reportError(e) {
    //process e in some way?
    //This is where sorting and parsing of
    //particular errors worth highlighting would be done
    logging.error(e, 'ERROR: ');
}

module.exports = {
    reportError
};