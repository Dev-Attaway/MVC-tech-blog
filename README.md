## MVC/HBS powered Blog

<h1 align="center">

  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
  [![Node.js Badge](https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat)](https://nodejs.org/en) 
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)
  ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=Sequelize&logoColor=white)
</h1>

  ## Description
  MVC-tech-blog operates as a functional skeleton of a blog site and as an educational model. Modeling the MVC paradigm and utilizing technologies such as 
  Sequalize and Handlebars: MVC-tech-blog seeks to establish an accessible skeleton for future projects. As well as educate Junior devs on the mechanics
  of both Back-end and Front-end operations. Furthermore, this project demonstrates how Sequalized Objects are related to each other (hasOne, hasMany, ...).
  
    
  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Technology Used](#technology-used)
  * [License](#license)
  * [Contributing](#contributing)
  * [Questions](#questions)
  *  [Heroku](#heroku)


## Installation

  To install the required dependencies, run the following command:
  > npm i

  To initiate Tailwind run the following command:
  > npm run tailwind

 ## Usage
### Features
- Login/Logout Components
- Personal Profile
- Blog creation
- Leave comments on created blogs 
- Update past blogs
- Delete past blogs
- View portal to all blogs created by other users


### Functionality

- WHEN a user visits the site for the first time
- THEN the homepage presents itself, including existing blogs if any have been created, navigation links for the homepage and the dashboard, and the option to log in
- WHEN a user clicks on the homepage option
- THEN they are taken to the homepage
- WHEN a user clicks on any other links in the navigation
- THEN they are prompted to either sign up or sign in
- WHEN a user chooses to sign up
- THEN they are prompted to create a username and password
- WHEN a user clicks on the sign-up button
- THEN their user credentials are saved, and they are logged into the site
- WHEN a user revisits the site at a later time and chooses to sign in
- THEN they are prompted to enter their username and password
- WHEN a user is signed in to the site
- THEN they see navigation links for the homepage, the dashboard, and the option to log out
- WHEN a user clicks on the homepage option in the navigation
- THEN they are taken to the homepage and presented with existing blogs that include the blog title and the date created
- WHEN a user clicks on an existing blog blog
- THEN they are presented with the blog title, contents, blog creator’s username, and date created for that blog and have the option to leave a comment
- WHEN a user enters a comment and clicks on the submit button while signed in
- THEN the comment is saved, and the blog is updated to display the comment, the comment creator’s username, and the date created
- WHEN a user clicks on the dashboard option in the navigation
- THEN they are taken to the dashboard and presented with any blogs they have already created and the option to add a new blog blog
- WHEN a user clicks on the button to add a new blog blog
- THEN they are prompted to enter both a title and content for their blog blog
- WHEN a user clicks on the button to create a new blog blog
- THEN the title and contents of their blog are saved, and they are taken back to an updated dashboard with their new blog blog
- WHEN a user clicks on one of their existing in the dashboard
- THEN they can delete or update their blog and be taken back to an updated dashboard
- WHEN a user clicks on the logout option in the navigation
- THEN they are signed out of the site


## Technology Used
- [Bcrypt](https://jquery.com/)
- [Express](https://expressjs.com/)
- [Mysql2](https://www.npmjs.com/package/mysql2)
- [Sequalize](https://sequelize.org/)
- [Nodemon](https://nodemon.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## License
- [MIT](https://opensource.org/license/mit/)

## Contributing
  Please follow this link for best practices for contributing to an open-source project:
  https://opensource.guide/how-to-contribute/

  ## Questions
 If you have any questions or issues, please get in touch with me at attaway.code@gmail.com. You can also find more of my work at https://github.com/Dev-attaway.
 
  ## Heroku
  https://glacial-shore-27204-fee7a2f643f4.herokuapp.com/
