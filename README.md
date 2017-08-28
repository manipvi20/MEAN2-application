# MEAN2-application

MEAN 2 stack application with webpack.

To work on this project:

Run `npm install` inside the project folder to download all the dependencies.
Run `npm run serve` to start a local development web server. You can now access the application at [localhost:8080](http://localhost:8080/).
Run `npm run build` to bundle everything into the `views` folder for deployment.

If you are decided to use mongo db locally, follow the below steps

Install mongo db in you machine
Install `MongoDB Compass` Mongo db tool
Create Db `admin`
Create Collection `info`
Collection Structure would be

_id: 598db141c5dd9f33830bfd65 ---- It will be created automatically
name:"Manikandan"
email:"manipvi20@gmail.com"
age:27
company:"HCLTECH"
username:"manipvi20"
password:"admin"
secret_ques:"what is your first pet name?"
seceret_ans:"tiger"


If you are decided to use `mlab` mongo db, follow the below steps,

Create account in `mlab`
Create DB and Collections
Uncomment line no 5 in routes/tasks.js and mention your db username and password 
Finally Comment the 4th line.



