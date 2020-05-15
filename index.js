var inquirer = require("inquirer");
var fs = require('fs');

var readmeText;
var username;
var email;
var projectTitle;
var description;
var license;
var installation;
var usage;
var tests;
var contributionRules;

const questions = [
    {
        type: "input",
        message: "What your GitHub username?",
        name: "username"
    },
    {
        type: "input",
        message: "What your GitHub email address?",
        name: "email"
    },
    {
        type: "input",
        message: "What is the project called?",
        name: "title"
    },
    {
        type: "input",
        message: "Write a short description of the project.",
        name: "description"
    },
    {
        type: "input",
        message: "Write some instructions for how to use this project.",
        name: "usage"
    },
    {
        type: "input",
        message: "What rules would you like contributors to follow?",
        name: "rules"
    },
    {
        type: "input",
        message: "What command should be used to install this project?",
        name: "installation",
        default: "npm i"
    },
    {
        type: "input",
        message: "What command should be used to run tests?",
        name: "tests",
        default: "npm tests"
    },
    {
        type: "list",
        message: "What license do you want to use?",
        name: "license",
        choices: [
            "MIT License",
            "GNU AGPLv3",
            "GNU GPLv3",
            "GNU LGPLv3",
            "Mozilla Public License 2.0",
            "Apache License 2.0",
            "Boost Software License 1.0",
            "No License"
        ]
    }
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function(error){
        if(error) console.log("error");
    })
}

function init() {
    inquirer.prompt(questions)
        .then(function(response){
            console.log(response);
            username = response.username;
            email = response.email;
            projectTitle = response.title;
            description = response.description;
            installation = response.installation;
            usage = response.usage;
            tests = response.tests;
            license = response.license;
            contributionRules = response.rules;
            GenerateText();
            writeToFile("README.md", readmeText);
    })

}


// * At least one badge
// * Project title
// * Description
// * Table of Contents
// * Installation
// * Usage
// * License
// * Contributing
// * Tests
// * Questions
//   * User GitHub profile picture
//   * User GitHub email

function GenerateText(){

    var badgeURL;
    if (license == "MIT License") badgeURL = "https://img.shields.io/badge/license-MIT-green";
    if (license == "GNU AGPLv3") badgeURL = "https://img.shields.io/badge/license-GNU-blue";
    if (license == "GNU GPLv3") badgeURL = "https://img.shields.io/badge/license-GNU-blue";
    if (license == "GNU LGPLv3") badgeURL = "https://img.shields.io/badge/license-GNU-blue";
    if (license == "Mozilla Public License 2.0") badgeURL = "https://img.shields.io/badge/license-Mozilla-orange";
    if (license == "Apache License 2.0") badgeURL = "https://img.shields.io/badge/license-Apache-yellow";
    if (license == "Boost Software License 1.0") badgeURL = "https://img.shields.io/badge/license-Boost-purple";
    if (license == "No License") badgeURL = "https://img.shields.io/badge/license-None-grey";

readmeText = 
`
# ${projectTitle}

![badge](${badgeURL})


## Description 

${description}    


## Table of Contents 
    
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)


## Installation

${installation}


## Usage 

${usage}


## License

${license}


## Contributing

${contributionRules}


## Tests

${tests}


## Questions

If you have any questions, please reach out to:

${username} at ${email} ![Profile Picture](https://github.com/${username}.png?size=80)

`
}
    
init();