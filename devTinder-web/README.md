# DevTinder

- Create a Vite + React application
- Remove unecessary code and create a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route = /Body > RouteChildren
- Create an Outlet in your Body Component
- Create a Footer Component
- Create a Login Page
- Install axios
- CORS - install cors in backend => add middleware to with configurations: origin, credientials: true
- When you're making API call so pass axios => {withCredientials: true}
- Install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start
- configureStore => Provider => createSlice => add redcucer to store
- Add redux devtools extensions in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder
- You should not be able to access other routes without login
- If token is not present, redirect user to login page
- Logout feature
- Get the feed and add the feed in the store
- build the user card on feed
- Edit Profile Feature
- Show Toast Message on save of profile
- New Page - See all my connections
- New Page - See all my Connection Requests
- Feature - Accept/Reject Connection Request
- Send/ignore the user card from feed
- Signup New User
- E2ETesting

Body
NavBar
Route=/ => Feed
Route=/login => Login
Route=/connections => Connections
Route=/profile => Profile

# Deployment

- Signup on AWS
- Launch Instance
- chmod 400 <secret>.pem
- Connected to the machine using ssh command ( ssh -i "devTinder-secret.pem" ubuntu@ec2-65-2-80-147.ap-south-1.compute.amazonaws.com )
- Installed Node version 24.0.2 (nvm install 24.0.2)
- Git clone
- Frontend project
  - npm install -> dependencies install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - Copy code from dist(build file) to /var/www/html/
  - sudo scp -r dist/\ identity\* /var/www/html/
  - Enable port :80 of your instance (AWS instance)
- Backend Project

  - allowed ec2 instance public IP on Mongodb server (8888)
  - installed npm install pm2 -g
  - pm2 start npm --name "devtinder-backend" -- start
  - pm2 logs
  - pm2 list, pm2 flush <name>, pm2 stop<name>, pm2 delete <name>
  - config nginx - sudo nano /etc/nginx/sites-available/default
  - restart nginx - sudo systemctl restart nginx
  - Modify the BASE_URL in frontend project to "/api"

# Nginx config:

    Frontend = http://54.159.6.65/
    Backend = http://54.159.6.65/:8888/

    Domain name = devTinder.com => 54.159.6.65

    Frontend = devTinder.com
    Backend = devTinder.com:8888 => devTinder.com/api

    nginx config :

    server_name 54.159.6.65;

    location /api/ {
      proxy_pass http://localhost:8888/;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }

# Adding a custom Domain name

    - Purchased Domain Name from godaddy
    - signup on cloudflare & add a new domain name
    - change the nameservers on godaddy and point it to cloudflare
    - wait for sometime till your nameservers are updated ~ 15 minutes
    - DNS record: A devtinder.in 54.159.6.65
    - Enable SSL for website

# Sending Emails via SES

    - Create a IAM user
    - Give Access to AmazonSESFullAccess
    - Amazon SES: Create a Identity
    - Verify your domain name
    - Verify an email address identity
    - Install AWS SDK - v3
    - Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
    - Setup sesClient
    - Access Credentials should be created on IAM under security credentials tab
    - Add the credentials to the env file
    - Write code for SESClient
    - Write code for Sending email address
    - Make the email dynamic by passing more params to the run function

# Scheduling cron jobs in NodsJS

    - Installing node-cron
    - Learning about cron expression syntax - crontab.guru
    - Schedule a job
    - date-fns
    - Find all the Unique email Id who have got connection request in previous day
    - Send Email
    - Explore queue mechanism to send bulk emails
    - Amazon SES Bulk Emails
    - Make sendEmail function dynamic
    - bee-queue & bull npm packages

# Razorpay Payment Gateway Integration

    - Signup on Razorpay & complete KYC
    - Created a UI for premium page
    - Creating an API for create order in backend
    - added my key and secret in env file
    - Initialized Razorpay in utils
    - Creating order on Razorpay
    - Create schema and model
    - saved the order detailes in payment collection
    - make the API dynamic
