const render = require('./lib/htmlRenderer');
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const path = require("path");
const inquirer = require("inquirer")
const fs = require("fs");


const outputPath = path.resolve(__dirname, "output", "main.html");

const teamMember = [];

function mainApp() {
    // create a manager
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the managers name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the managers id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the managers email?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is the your phone number?"
            }
        ])
        .then(answers => {
            var { name, id, email, officeNumber } = answers;
            var manager = new Manager(name, id, email, officeNumber);
            
            //Adds the managert to the team array
            teamMember.push(manager);

            //Initiates teh prompt to ask for more team members
            createTeam();
        })

}
// this function create a list to add teammembers
function createTeam() {

    inquirer
        .prompt([
        {
            type: "list",
            name: "command",
            message:"Would you like to add more team members?",
            choices:["Add an Engineer", "Add an Intern", "Make team"]
        }
        ])
        .then(answers => {
            // create a switch statement to choose between engineer, intern, or build team
            statement = answers.command;

            switch(statement){
                case "Add an Engineer":
                    getEngineer();
                    break;

                case "Add an Intern":
                    getIntern();
                    break;

                case "Make team":
                    buildTeam();
                    break;
            }
        })
}

// a function that create an engineer
function getEngineer() {

    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the engineers name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the engineers id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the engineers email?"
            },
            {
                type: "input",
                name: "github",
                message: "What is the engineers github username?"
            }

        ])
        .then(answers => {
            var {name, id, email, github} = answers;
            var engineer = new Engineer(name, id, email, github);
            teamMember.push(engineer);
        })

}
// a function that create an intern
function getIntern() {

    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the Interns name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the Interns id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the Interns email?"
            },
            {
                type: "input",
                name: "school",
                message: "What is the school name?"
            }

        ])
        .then(answers => {
            var {name, id, email, school} = answers;
            var intern = new Intern(name, id, email, school);

        })
        

}

function buildTeam() {
    fs.writeFileSync(outputPath, render (teamMember), "utf-8");
}

mainApp()

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile(".\templates\main.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}