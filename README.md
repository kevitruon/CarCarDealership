# CarCar

Team:

- Kevin Truong - Services
- Carlos Barrera - Sales

## Instructions to Run the Project

1.) Clone the Repository https://gitlab.com/kevitruon/project-beta <br>
2.) In the directory of the content run the commands (Must have Docker installed)<br>
docker volume create beta-data<br>
docker-compose build<br>
docker-compose up<br>
3.) In your browser use http://localhost:3000/ to interact with the CarCar website<br>
4.) The application loads with an empty database. To fully interact please create the following in order <br>1. Manufacturer <br>2. Model <br>3. Automobile

## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

| Endpoint           | Method | Description                | URL                                                                                  | Request Payload                                            | Response                                                           |
| ------------------ | ------ | -------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------ |
| **Sale**           |        |                            |                                                                                      |                                                            |                                                                    |
| List Sales         | GET    | View all sales             | [http://localhost:8090/api/sales/](http://localhost:8090/api/sales/)                 |                                                            | ![List Sales](ghi/app/public/listsale.png)                         |
| Add Sales          | POST   | Add a new sale             | [http://localhost:8090/api/sales/](http://localhost:8090/api/sales/)                 | ![Add Sales JSON](ghi/app/public/addsalejson.png)          | ![Add Sales Response](ghi/app/public/addsaleresponse.png)          |
| Delete Sales       | DELETE | Delete a sale by ID        | [http://localhost:8090/api/sales/id](http://localhost:8090/api/sales/id)             |                                                            | ![Delete Sales](ghi/app/public/delete.png)                         |
| **Salesperson**    |        |                            |                                                                                      |                                                            |                                                                    |
| List Salesperson   | GET    | View all salespeople       | [http://localhost:8090/api/salespeople/](http://localhost:8090/api/salespeople/)     |                                                            | ![List Salesperson](ghi/app/public/listsalesperson.png)            |
| Add Salesperson    | POST   | Add a new salesperson      | [http://localhost:8090/api/salespeople/](http://localhost:8090/api/salespeople/)     | ![Add Salesperson JSON](ghi/app/public/salepersonjson.png) | ![Add Salesperson Response](ghi/app/public/salepersonresponse.png) |
| Delete Salesperson | DELETE | Delete a salesperson by ID | [http://localhost:8090/api/salespeople/id](http://localhost:8090/api/salespeople/id) |                                                            | ![Delete Salesperson](ghi/app/public/delete.png)                   |
| **Customer**       |        |                            |                                                                                      |                                                            |                                                                    |
| List Customer      | GET    | View all customers         | [http://localhost:8090/api/customers/](http://localhost:8090/api/customers/)         |                                                            | ![List Customer](ghi/app/public/listcustomer.png)                  |
| Add Customer       | POST   | Add a new customer         | [http://localhost:8090/api/customers/](http://localhost:8090/api/customers/)         | ![Add Customer JSON](ghi/app/public/customerjson.png)      | ![Add Customer Response](ghi/app/public/customerjson.png)          |
| Delete Customer    | DELETE | Delete a customer by ID    | [http://localhost:8090/api/customers/id](http://localhost:8090/api/customers/id)     |                                                            | ![Delete Customer](ghi/app/public/delete.png)                      |

## Design

Services Diagram: ![alt text](ghi/app/public/image.png)

Sales Diagram: ![alt text](ghi/app/public/salediagram.png)

## Service microservice

Three models: AutomobileVO, Technician, Appointment

Appointment model tracks customer name, vin, date/time, and status of created/canceled/finished and assigned Technician

Technician model tracks technician's name and employee_id and has a one to many relationship with the appointment model

AutomobileVO is a value object model which uses a poller to track automobiles in the inventory with vin, href, and sold status

## Sales microservice

Models:

AutomobileVO: Similar to the Service microservice, it tracks automobiles in the inventory with VIN, href, and sold status.

Salesperson: Tracks associate's first name, last name, and employee ID.

Customer: Tracks customer's first name, last name, address, and phone number.

Sale: Tracks sales information including the automobile sold, salesperson involved, customer involved, and the price. It has one-to-many relationships with the Automobile, Salesperson, and Customer models.
