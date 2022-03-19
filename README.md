# yourgaminggear

## Description

yourgaminggear is a client side of Your Gaming Gear mini-project from Dibimbing course in the form of an e-commerce website application. This project is built with [ReactJs](https://reactjs.org/) framework.
This project can be accessed online at [https://yourgaminggear.netlify.app](https://yourgaminggear.netlify.app) or you can follow this documentation to use locally on your computer.

## What's in this app?

- Product Catalog Page (Home Page)
- About Page
- Login Page
- Register Page
- Product Thumbnail Card View
- Product Page (By product id)
- Dashboard Admin Page
- Account Setting Page (Manage admin account)
- Authentication And Authorization
- Integrated With API Server
- Responsive Layout

## Library that used in this app

- ReactJs
- React Router Dom V6
- SASS
- Ant Design
- Formik
- Yup
- Axios
- Moment
- React Icons
- Currency Formater

## Installation

- To install this project you need to install [yourgaminggear-server](https://github.com/bhaktibuana/yourgaminggear-server) as the API server.
- In the root project directory run `npm install` on your terminal.
- Open *./src/api/apiURL.js* change the *apiBaseUrl* variable value to your API development server URL. For example: `http://localhost:3001`.

## Run the app

- In the root directory you can run `npm start` on your terminal.
- The app will be running on [http://localhost:3000](http://localhost:3000). Enjoy!

## Usage

- Anyone (any user) can access home page (product catalog page).
- Anyone (any user) can access product page (by id) by selecting one of the products in the catalog.
- Anyone (any user) can do a register account as an admin.
- Only users who already have an account can do login.
- Dashboard page require authorization to access (needs login as admin).
- Account setting page require authorization to access (needs login as admin).
- There are two kinds of about pages, one can be accessed by anyone (any user) and the other requires authorization (needs login as admin).
- Users who have logged in as admin can do log out.
- Logged in users will be automatically directed to the home page.
- To access dashboard after login, user can click profile icon at navbar and it will show a dropdown. And then user can click Dashboard button.
- To do log out after login, user can click profile icon at navbar and it will show a dropdown. And then user can click Dashboard button.
- Dashboard page contain a table that shows data of products.
- Admin can add, edit, and delete data (require auth).
- Account setting page contain admin data information.
- Admin can edit it's data and even change a profile picture (require auth).
- For display on mobile, menu icon will appear on the navbar. It is used to toggle show and hide sidebar.

I hope you guys like this project :grin: