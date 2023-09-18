



<!-- PROJECT LOGO -->
<br />
<div>


  <h1>Applicare</h1>

  <p>
Welcome to Applicare, a web application built with Next.js 13 that aims to simplify and streamline the job application process. Whether you're a seasoned professional or just starting your career journey, Applicare provides you with a comprehensive dashboard to keep track of all your job applications in one place.    <br />
    
  </p>
</div>






<!-- ABOUT THE PROJECT -->

## Overview

Searching for a new job can be a daunting and time-consuming task, especially when you have multiple applications in progress. Applicare is designed to alleviate the stress by offering an intuitive and organized environment where you can manage your job applications efficiently.




### Built With

This section lists the major frameworks/libraries used in this project.


* [![Next][Next.js]][Next-url]
* [![Prisma][Prisma]][Prisma-url]
* [![Vercel][Vercel]][Vercel-url]
* [![MongoDB][MongoDB]][MongoDB-url]






<!-- GETTING STARTED -->

## Getting Started


### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Follow this steps to get your application running._

1. Register at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register) and follow their instruction.
2. Setup a free Clerk account and get their connection string at [https://clerk.com/](https://clerk.com/)
3. Clone the repo
   ```sh
   git clone https://github.com/federicogdev/applicare.git
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
6. Create a `.env` in the root folder of the project
   ```
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= ************* Replace with your Clerk Publishable Key
   CLERK_SECRET_KEY=************* Replace with your Clerk Secret Key
   DATABASE_URL= ************* Replace with your MongoDB Connection String
   ```

### Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **actions**      | Server actions
| **app**      | Next.js 13 App Directory containing Routes and API
| **components**           | Contains all components grouped by subfolders|
| **hooks**           | Custom hooks |
| **lib**         | Utility and miscellaneous                                                                |
| **prisma**         | Prisma default folder for schema                                                              |
| **types**         | Typescript folder for types and interfaces                                                              |
| package.json             | Contains npm dependencies as well as build scripts   |





<!-- ROADMAP -->

### Roadmap

- [x] Add README
- [x] Add support for theming
- [ ] Add table responsiveness
- [ ] Add "components" document to easily copy & paste sections of the readme






<!-- CONTRIBUTING -->

### Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request




<!-- LICENSE -->

### License

Distributed under the MIT License. See `LICENSE.txt` for more information.




[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com





