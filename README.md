# Interview Scheduler
### **Interview Scheduler** is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. ***When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted.*** The front end of this project is built with **React** and makes requests to an API to fetch and store appointment data from a database.

# Table of Contents
1. [Setup](#setup)
2. [Final Product](#final-product)
3. [Instructions](#instructions)
4. [Dependencies](#dependencies)

# Final Product

## Home Page
!["home-page"](/docs/scheduler-1.png)

## Create New Appointment
[![Image from Gyazo](https://i.gyazo.com/21bc186c713e86a9fe101e767bebe920.gif)](https://gyazo.com/21bc186c713e86a9fe101e767bebe920)

## Edit Existing Appointment
[![Image from Gyazo](https://i.gyazo.com/7d847a77144e10d813802123aa63f27c.gif)](https://gyazo.com/7d847a77144e10d813802123aa63f27c)

## Delete Existing Appointment
[![Image from Gyazo](https://i.gyazo.com/3986aaf5267069150a720bc398a3d876.gif)](https://gyazo.com/3986aaf5267069150a720bc398a3d876)



# Setup

Install dependencies with `npm install`.

To access the api server, fork this repository and follow the README: [LHL scheduler-api](https://github.com/lighthouse-labs/scheduler-api+)

# Instructions
## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

# Dependencies
- Axios
- Classnames
- React
- React-dom
- React-scripts
- Storybook
- Jest
- Cypress