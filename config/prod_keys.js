
module.exports = {
    google: {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    },
    session: {
        cookieKey: process.env.COOKIE_KEY
    },
    mongoURI: process.env.MONGO_URI
    ,
    twilio: {
    	serviceID: process.env.SERVICE_ID,
    	accountSID: process.env.ACCOUNT_SID,
    	authToken: process.env.AUTH_TOKEN
    }
};