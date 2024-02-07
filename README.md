# CarCar

Team:

* Kevin Truong - Services
* Carlos Barrera - Sales

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
