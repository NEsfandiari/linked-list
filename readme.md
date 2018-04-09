# Sup Dev Gui's.

If you've made it here you're a pretty cool guy and admitted to "the club". We meet monday's, Wednesday's and Friday's by the yellow firehydrate on 17th street at 7:17PM. See you there!

# Also

## I guess I should Include some code snippits

### But I am having _too_ **much** ~~fun~~ enjoyment testing out markdown :)

[Look at This!](https://www.whataboutwatermelon.com/wp-content/uploads/2017/06/square-watermellons_11.png)

[Or This!](https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2016/08/Sequence-01.00_11_36_19.Still012-770x434.jpg)

##### We live in a truly Amazing World!

###### back to the code :(

# Getting Started

fork the repository (https://github.com/badco37/linked-list)

```bash
$ git clone https://github.com/master/patterns-api.git
$ cd linked-list
$ npm install
$ touch .env
```

### Add to .env file

```
Password=[You Choose I... ϞϞ(๑⚈ ․̫ ⚈๑)∩]
```

### Starting the Backend Server

* open two terminals
  * in one terminal
    `$ mongod`
  * in second terminal
    `$ npm start`

# General Structure

The website consists of the following general components:

* Users
* Companies
* Jobs

## Routes

### `routes/auth.js`

Used to set up OAuth on `/:x/login`

### `routes/companies.js` (login required for all except create)

Used to CRUD companies

* GET all Companies `/companies` - TokenCheck
* POST add new Company `/companies`
* GET a Company `/companies/{companyID}`
* PATCH update a company `/companies/{companyID}` - ensureCorrectCompany
* Delete remove a company `/companies{companyID}`

### `routes/users.js` (login required for all except create)

Used to CRUD Users

* GET all Users `/users` - ensureCorrectUser
* POST add new User `/users`
* GET a User `/users/{userID}` - ensureCorrectUser
* PATCH update a user `/users/{userID}` - ensureCorrectUser
* Delete remove a user `/users{userID}` - ensureCorrectUser

### `routes/jobs.js` (login required for all)

Used to CRUD Jobs

* GET all Companies `/jobs` - ensureCorrectUser
* POST add new Company `/jobs` - ensureCorrectCompany
* GET a Company `/jobs/{jobID}` - ensureCorrectUser
* PATCH update a job `/jobs/{jobID}` - ensureCorrectCompany
* Delete remove a job `/jobs{jobID}` - ensureCorrectCompany
