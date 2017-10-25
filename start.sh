#!/bin/bash
# gets npm path, goes into emailService's home dir
# uses stored npm to run the email node script
NPM=$(which npm)
cd /home/dane/emailService
$NPM run start >> /home/dane/emailService/logs/dev.log