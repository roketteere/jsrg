const inquirer = require("inquirer");
const fs = require("fs");
const Badge = require("./Badge.js");
const { makeBadge, ValidationError } = require("badge-maker");

// Holds all licenses available to choose from
async function getReadmeItems() {
  const licenses = [
    "MIT",
    "Apache2",
    "GPL3",
    "BSD3",
    "MPL2",
    "LGPL3",
    "EPL2",
    "AGPL3",
    "Unlicense",
    "GPL2",
    "BSD2",
    "CC01",
    "LGPL21",
    "MPL11",
    "MsPL",
    "AGPL1",
    "Apache11",
    "GPL1",
    "LGPL2",
    "OSL3",
    "CDDL1",
    "CPAL1",
    "EUPL11",
  ];
  // prompt questions
  const readmeQuestions = [
    // question one
    {
      // type of input etc
      type: "input",
      name: "title",
      message: "Project Title?",
    },
    // question two
    {
      type: "input",
      name: "description",
      message: "What is the description of this project?",
    },
    {
      // type of input etc
      type: "input",
      name: "installation",
      message: "How do you install this?",
    },
    {
      // type of input etc
      type: "input",
      name: "usage",
      message: "How do you use this?",
    },
    {
      type: "list",
      name: "license",
      choices: licenses,
    },
    {
      // type of input etc
      type: "input",
      name: "contributing",
      message: "Contributing Guidelines?",
    },
    {
      // tests,
      type: "input",
      name: "tests",
      message: "Please enter any test information that you have?",
    },
    {
      // github,
      type: "input",
      name: "github",
      message: "Enter GitHub Username?",
    },
    {
      // email
      type: "input",
      name: "email",
      message: "Please enter your email you wish for contact?",
    },
  ];
  //prompt answers returned here
  const answers = await inquirer.prompt(readmeQuestions);
  return answers;
}

// generate readme with combined items
function generateReadme(answers) {
  const licenses = {
    MIT: "MIT License",
    Apache2: "Apache License 2.0",
    GPL3: "GNU General Public License v3.0",
    BSD3: "BSD 3-Clause License",
    MPL2: "Mozilla Public License 2.0",
    LGPL3: "GNU Lesser General Public License v3.0",
    EPL2: "Eclipse Public License 2.0",
    AGPL3: "GNU Affero General Public License v3.0",
    Unlicense: "Unlicense",
    GPL2: "GNU General Public License v2.0",
    BSD2: "BSD 2-Clause License",
    CC01: "Creative Commons Zero v1.0 Universal",
    LGPL21: "GNU Lesser General Public License v2.1",
    MPL11: "Mozilla Public License 1.1",
    MsPL: "Microsoft Public License",
    AGPL1: "GNU Affero General Public License v1.0",
    Apache11: "Apache License 1.1",
    GPL1: "GNU General Public License v1.0",
    LGPL2: "GNU Lesser General Public License v2.0",
    OSL3: "Open Software License 3.0",
    CDDL1: "Common Development and Distribution License 1.0",
    CPAL1: "Common Public Attribution License 1.0",
    EUPL11: "European Union Public License 1.1",
  };
  const licenseBadge = new Badge("License", answers.license, "grey", "blue");
  const badge = licenseBadge.spitBadgeOut();
  const README = `
# ${answers.title}
${badge[1]}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Badges](#badges)
- [Tests](#tests)
- [Questions](#Questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${licenses[answers.license]}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
${"https://github.com/" + answers.github}

${answers.email}

`;
  fs.writeFile("README.md", README, (error) => {
    error
      ? console.log("Oops it failed:\n", error)
      : console.log("Successfully Created README.md");
  });
  return README;
}

const readme = getReadmeItems().then((answers) => {
  generateReadme(answers);
  console.log("Answers\n", answers);
});
