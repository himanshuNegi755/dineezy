# Digital Menu and QR based Restaurant Management System

## Dineezy is made using these awesome tools
| [ReactJS](https://reactjs.org/) - [NodeJS]() - [ExpressJS]() - [Socket*io*]()	|
|--|
## Basic setup requirements
* Nodejs Version 12 Setup
* Nginx installation
* Get Oauth Keys from google Developers Portal
* Create a MongoDB Atlas Account


* * *

### Install on VPS ( [Digital Ocean](https://www.digitalocean.com/), Linode, Vultr etc.)
* .env of Nodejs
	
	
	
* .env of Reactjs (client/)
	
	

* * *

### Install using Docker






* * *

### Development Setup
* .env of Nodejs

```
NODE_ENV=production
PORT=8000
CLIENT_URI=http://localhost:3000
CLIENT_ID=""
CLIENT_SECRET=""
COOKIE_KEY=""
MONGO_URI=""
SERVICE_ID=""
ACCOUNT_SID=""
AUTH_TOKEN=""
```	
	
* .env of Reactjs (client/)
```
REACT_APP_BACKEND_API=http://localhost:8001/api
REACT_APP_FRONTEND=http://localhost:3000
```
