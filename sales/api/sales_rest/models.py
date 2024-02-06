from django.db import models

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=200)
    sold = models.BooleanField(default=False)

class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        on_delete=models.CASCADE,
        related_name='sales'
        )
    salesperson = models.ForeignKey(
        Salesperson,
        on_delete=models.CASCADE,
        related_name='sales'
        )
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name='sales'
        )
    price = models.DecimalField(max_digits = 10 , decimal_places = 2)
