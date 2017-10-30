'use strict';

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const postmarkTransport = require('nodemailer-postmark-transport');
const config = require('../config');
const Handlebars = require('handlebars');
const logging = require('./logging');
const inlineCSS = require('inline-css');

const transport = nodemailer.createTransport(postmarkTransport({
    auth: {
        apiKey: config.env.postmarkApiKey
    }
}));

const templateCache = new Map();

function getStyles(filename) {
    switch(filename) {
        case 'test.hbs':
            return 'meal-plan.css';
        default:
            return 'meal-plan.css';
    }
}

function getTemplate(filename) {
    return new Promise((resolve, reject) => {
        let cachedTemplate = templateCache.get(filename);
        if(!cachedTemplate) {
            let filepath = path.join(config.env.ROOT, 'templates/' + filename);
            fs.readFile(filepath, (err, data) => {
                if(err) reject();
                data = data.toString();
                let compiled = Handlebars.compile(data);
                templateCache.set(filename, compiled);
                resolve(compiled);
            });
        } else {
            resolve(cachedTemplate);
        }
    });
}

function getRenderedHTML(filename, data) {
    return new Promise((resolve, reject) => {
        getTemplate(filename).then(template => {
            data.stylefile = getStyles(filename);
            let rendered = template(data);
            inlineTheCSS(rendered, data.stylefile).then(inlined => {
                resolve(inlined);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        })
    })
}

function inlineTheCSS(renderedHTML, stylefile) {
    return new Promise((resolve, reject) => {
        inlineCSS(renderedHTML, {
            url: 'file://' + path.resolve(__dirname, '../styles/' + stylefile + '/') 
        }).then((inlinedHTML) => {
            resolve(inlinedHTML);
        }).catch(err => {
            console.log('err', err);
            reject(err);
        });
    });
}

function sendMail(templateFile, data, emailAddress) {
    return new Promise((resolve, reject) => {
        getRenderedHTML(templateFile, data).then(renderedHTML => {
            const mail = {
                from: 'dane@skillitcooking.com',
                to: emailAddress,
                subject: 'Test, son',
                text: 'balls',
                html: renderedHTML
            };
            
            transport.sendMail(mail, (err, info) => {
                if(err) {
                    logging.error(err, "ERROR: SEND MAIL:")
                    resolve(err);
                } else {
                    logging.info(info, 'MAIL SENT:');
                    resolve(info);
                }
            });  
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    sendMail
};