
[NodeJS Project CostManager-Aviv Ben Shitrit (1).pdf](https://github.com/avivbs96/node-costManager/files/14811572/NodeJS.Project.CostManager-Aviv.Ben.Shitrit.1.pdf)


# Cost Manager RESTful Web Services
 Final Project in Asynchronous Server Side Course
The final project includes developing specific parts of REStful Web Services that allow the development of a client application for managing our daily costs.

with postman these are the actions get/post we can do : 

GET - http://localhost:3000/about - show about the developers.


POST - http://localhost:3000/addcost - add cost to a specific user and catagory and add that to the report ,
if a cost is invalid for some reason you will see the problem in the error message.


GET - http://localhost:3000/report - if you write the endpoint like this to show a report you will get an error message with instructions how to write it as it should, like this :
"error": "Missing user_id, month, or year in query parameters.",
    "example": "Here is an example of how you should write the endpoint: http://localhost:3000/report?user_id=6468cd441c73b7e76897efc6&month=5&year=2023".


GET -  http://localhost:3000/report?user_id=6468cd441c73b7e76897efc6&month=5&year=2023" - the right way example to request a report on specific user for a specific date.


GET - http://localhost:3000/users - show the number of users in the database and their info.

This post methoed we removed because we understand that there is no option to create a new user ! :

(POST - http://localhost:3000/users - add a new user to the database , you can press send in postman with this endpoint and you will get an exact instructions of how to add user successfully.)
