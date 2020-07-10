var keys = require('../config/keys');
var twilio = require('twilio')(keys.twilio.accountSID, keys.twilio.authToken)

var mongoose = require('mongoose');
// model
var User = mongoose.model('User');
const {ObjectId} = require('mongodb');

module.exports = app => {
    //twilio request
    app.get('/phoneNo/:data', (req, res) => {
        if (req.params.data) {
            twilio
            .verify
            .services(keys.twilio.serviceID)
            .verifications
            .create({
                to: `+91${req.params.data}`,
                channel: 'sms'
            })
            .then((data) => {
                res.status(200).send({
                    message: 'Verification code has been sent to given number',
                    data
                })
            })
        } else {
            res.status(400).send({
                message: "Wrong phone number :(",
                data
            })
        }
    });

    app.get('/verify', (req, res) => {
        if (req.query.phoneNo && (req.query.code).length === 4) {
            twilio
                .verify
                .services(keys.twilio.serviceID)
                .verificationChecks
                .create({
                    to: `+91${req.query.phoneNo}`,
                    code: req.query.code
                })
                .then((data) => {
                    if (data.valid) {
                        User.updateOne({_id: ObjectId(req.query.userId)}, {$set: {userPhoneNo: {value: req.query.phoneNo, verified: true}}}, function(err, user) {
                        if (err) {
                            res.status(500).send({error: "Could not add item to cart"});
                        } else {
                            res.status(200).send({
                                status: 'user phoneNo saved',
                                message: 'Verification Successful',
                                data
                            });
                        }
                        });
                    } else {

                        res.status(200).send({
                            message: 'Wrong otp',
                            data
                        })

                    }

                })
        } else {
            res.status(400).send({
                message: "Wrong phone number or code :(",
                data
            })
        }
    });
    
};