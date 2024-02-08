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
4.) The application loads with an empty database. To fully interact please create the following in order 1. Manufacturer 2. Model 3. Automobile

## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

## Sale

### List Sales

- **Method**: GET
- **Endpoint**: [http://localhost:8090/api/sales/](http://localhost:8090/api/sales/)
- **Result**: <img src="ghi/app/public/listsale.png" alt="List Sales" width="400">

### Add Sales

- **Method**: POST
- **Endpoint**: [http://localhost:8090/api/sales/](http://localhost:8090/api/sales/)
- **Input JSON body**: <img src="ghi/app/public/addsalejson.png" alt="Add Sales JSON" width="400">
- **Result**: <img src="ghi/app/public/addsaleresponse.png" alt="Add Sales Response" width="400">

### Delete Sales

- **Method**: DELETE
- **Endpoint**: [http://localhost:8090/api/sales/id](http://localhost:8090/api/sales/id)
- **Result**: <img src="ghi/app/public/delete.png" alt="Delete Sales" width="400">

## Salesperson

### List Salesperson

- **Method**: GET
- **Endpoint**: [http://localhost:8090/api/salespeople/](http://localhost:8090/api/salespeople/)
- **Result**: <img src="ghi/app/public/listsalesperson.png" alt="List Salesperson" width="400">

### Add Salesperson

- **Method**: POST
- **Endpoint**: [http://localhost:8090/api/salespeople/](http://localhost:8090/api/salespeople/)
- **Input JSON body**: <img src="ghi/app/public/salepersonjson.png" alt="Add Salesperson JSON" width="400">
- **Result**: <img src="ghi/app/public/salepersonresponse.png" alt="Add Salesperson Response" width="400">

### Delete Salesperson

- **Method**: DELETE
- **Endpoint**: [http://localhost:8090/api/salespeople/id](http://localhost:8090/api/salespeople/id)
- **Result**: <img src="ghi/app/public/delete.png" alt="Delete Salesperson" width="400">

## Customer

### List Customer

- **Method**: GET
- **Endpoint**: [http://localhost:8090/api/customers/](http://localhost:8090/api/customers/)
- **Result**: <img src="ghi/app/public/listcustomer.png" alt="List Customer" width="400">

### Add Customer

- **Method**: POST
- **Endpoint**: [http://localhost:8090/api/customers/](http://localhost:8090/api/customers/)
- **Input JSON body**: <img src="ghi/app/public/customerjson.png" alt="Add Customer JSON" width="400">
- **Result**: <img src="ghi/app/public/customerjson.png" alt="Add Customer Response" width="400">

### Delete Customer

- **Method**: DELETE
- **Endpoint**: [http://localhost:8090/api/customers/id](http://localhost:8090/api/customers/id)
- **Result**: <img src="ghi/app/public/delete.png" alt="Delete Customer" width="400">

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
