# CarCar

Team:

* Kevin Truong - Services
* Carlos Barrera - Sales
## Instructions to Run the Project
1.) Clone the Repository https://gitlab.com/kevitruon/project-beta
2.) In the directory of the content run the commands (Must have Docker installed)
docker volume create beta-data
docker-compose build
docker-compose up
3.) In your browser use http://localhost:3000/ to interact with the CarCar website
4.) The application loads with an empty database. To fully interact please create the following in order
    1. Manufacturer
    2. Model
    3. Automobile

## Design
Services Diagram: ![alt text](ghi/app/public/image.png)

## Service microservice
Three models: AutomobileVO, Technician, Appointment

Appointment model tracks customer name, vin, date/time, and status of created/canceled/finished and assigned Technician

Technician model tracks technician's name and employee_id and has a one to many relationship with the appointment model

AutomobileVO is a value object model which uses a poller to track automobiles in the inventory with vin, href, and sold status

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
