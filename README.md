# MEAN2-application

MEAN 2 stack application with webpack.

To work on this project:

Run `npm install` inside the project folder to download all the dependencies.<br>
Run `npm run serve` to start a local development web server. You can now access the application at [localhost:8080](http://localhost:8080/).<br>
Run `npm run build` to bundle everything into the `views` folder for deployment.<br>

If you are decided to use mongo db locally, follow the below steps<br><br>

Install mongo db in you machine<br>
Install `MongoDB Compass` Mongo db tool<br>
Create Db `admin`<br>
Create Collection `info`<br>
Collection Structure would be<br><br>

_id: 598db141c5dd9f33830bfd65 ---- It will be created automatically<br>
name:"Manikandan"<br>
email:"manipvi20@gmail.com"<br>
age:27<br>
company:"HCLTECH"<br>
username:"manipvi20"<br>
password:"admin"<br>
secret_ques:"what is your first pet name?"<br>
seceret_ans:"tiger"<br>


If you are decided to use `mlab` mongo db, follow the below steps,<br><br>

Create account in `mlab`<br>
Create DB and Collections<br>
Uncomment line no 5 in routes/tasks.js and mention your db username and password <br>
Finally Comment the 4th line in routes/tasks.js.<br>



