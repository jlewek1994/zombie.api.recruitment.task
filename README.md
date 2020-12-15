# Expres.js Typescript Zombie API

## The content of the task

Language framework: TypeScript (NestJS is a preferred one, but please choose whatever you are comfortable with)

We would like to ask you to write us an API! We’ll be creating our zombie, which will have some valuable equipment. In order to do that we need a few endpoints.

### What do we want to achieve?

We are creating a showcase for our zombie, the front-end guy (Dan) has already coded everything and is waiting for the API with the documentation. Dan needs to talk only to our API.

### User stories:

- I want to display details about selected zombie (name and creation date);
- I want to display items that this zombie has;
- I want to see total value of zombie’s items in 3 currencies, PLN/EU/USD;
- I want to add and remove items from the zombie;
- I want to see a list of zombies (create/update/remove them also);

### Guidelines:

- The zombie can have a maximum of 5 items.
- We use an external item exchange for our zombie (we pay for every request), the prices of items on the exchange are updated daily at 00:00 UTC and are in Polish zlotys. https://zombie-items-api.herokuapp.com/api/items
- We use the NBP API to download daily exchange rates http://api.nbp.pl/api/exchangerates/tables/C/today/
- Please take the RESTful approach or GraphQL - whatever you feel more comfortable with.
- Nice to have: app placed on the hosting (heroku/zeit or anything else) or dockerized.
- Do as much as you are able to (zombies CRUD and tests are a must) - in case of lack of time, please create a .txt file and describe what you were planning to do. Please mention the tools that you would use and as many implementation details as you can.
- You can also include any concerns and questions that arose during the process and you would like to ask the PM. Or maybe you have any ideas on how to improve the app? Whatever comes to your mind - please put it also in the txt file and show us your way of thinking.

### What’s important?

- clean code,
- test coverage,
- optimization,
- good documentation.

## About project structure and run

- `src/index.ts`: entry file for the app that starts of express server
- `src/App.ts`: express app class where middleware is configured
- `src/routes/`: directory for all routes;
- `src/interfaces/`: directory for all interfaces;
- `src/services/`: directory for all services;
- `src/config/config.ts`: configuration file with app or environment specific properties
- `test/`: directory for all tests

### Build Setup

``` bash
# install dependencies
npm install

# serve locally with hot reload on localhost:3000 (adjustable in `src/config/config.ts` or with ENV variable `PORT`)
npm start

# build node.js version for production
npm run build

# start created production build
npm run prod

# run TypeScript linter
npm run lint

```

### Useful VSCode Extensions

- TSLint (enforces coding rules in `tslint.json`)
- EditorConfig (enforces code formatting in `.editorconfig`)

## API

### [POST] /add/:zombieName

Adding zombie

#### Parameters
- (url) `:zombieName` - string

#### Return
- 200 OK
- 300 Error

### [GET] /list/

List zombie

#### Return
- 200 JSON with zombies list
- 300 error

### [POST] /details/:id

Details zombie

#### Parameters
- (url) `:id` zombie id - number

#### Return
- 200 JSON with details about zobmie
- 300 Error

### [PUT] /update/:id

Update zombie

#### Parameters
- (url) `:id` id of zombie - number

#### Return
- 200 OK
- 300 Error

### [POST] /addItem/:id

Add item to zombie

#### Parameters
- (url) `:id` id of zombie - number
- (body/json) `{"itemId": 1}` id of item - number

#### Return
- 200 JSON with details about zobmie
- 300 Error

### [PUT] /deleteItem/:id

Delete item from zombie

#### Parameters
- (url) `:id` id of zombie - number

#### Return
- 200 OK
- 300 Error
### [GET] /totalPrice/:cur

Get total price of zombie items

#### Parameters
- (url) `:cur` currency symbol (EUR/USD/PLN)

#### Return
- 200 OK json with total price
- 300 Error