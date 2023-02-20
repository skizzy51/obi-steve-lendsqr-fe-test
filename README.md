## This is my solution to the Lendsqr frontend engineering test

This is a react typescript web application which is responsive on all media types
It pulls the users' details from the API provided
Dependencies in this application include redux toolkit, react-router-dom, SCSS
Font awesome was also used for the icons displayed on the figma design

## Project website

https://obi-steve-lendsqr-fe-test.vercel.app/

## PAGES

## Login Page

To login and access the user dashboard, click on the log in button on the login page.

<img src="/public/login.jpg" alt="Login page" title="Login Page">

## User Dashboard Page

The dashboard page shows a list of all users fetched from the API.

As represented in the figma design, the user list is displayed using pagination and a dropdown to show the amount of users displayed by page.

To view the user details click on the 'view details' button on the menu allocated to each user.

<img src="/public/menu.jpg" alt="User menu" title="User Menu">

You can also use the filter dropdown to search for specific users. You can search for users by their Organisation, Username, Email, Date created, Phone number

<img src="/public/filter.jpg" alt="Filter dropdown" title="Filter dropdown">

## User Details Page

Like the assessment brief stated, the User details page uses local storage to store and retrieve user details.

This page displays the personal information, education and employment information, socials information and guarantor information as displayed in the API

<img src="/public/user.jpg" alt="User details page" title="User Details Page">
