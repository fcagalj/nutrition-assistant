nutrition-assistant
===================
Single page web application served by JSON REST API server (built with AngularJS on frontend and Node.js (+Express) on backend).

Requirements
============

- User is able to create an account and log in
- When logged in, user can see a list of his meals and calories (user enters calories manually, no auto calculations!), also user is able to edit and delete meals
- Each entry has a date, time, text, and num of calories
- Filter by dates from-to, time from-to (e.g. how much calories have I had for lunch each day in the last month, if lunch is between 12 and 15h)
- User setting – Expected number of calories per day
- When displayed, it goes green if the total for that day is less than expected number of calories per day, otherwise goes red
- All actions are done client side using AJAX, refreshing the page is not necessary.
- REST API. Possible to perform all user actions via the API, including authentication.

