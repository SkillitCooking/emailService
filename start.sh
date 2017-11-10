#!/bin/bash
# gets npm path, goes into emailService's home dir
# uses stored npm to run the email node script
NPM=/home/dane/.nvm/versions/node/v8.9.0/bin/npm
cd /home/dane/emailService
$NPM run start >> /home/dane/emailService/logs/cron.log