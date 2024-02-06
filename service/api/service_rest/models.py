from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique =True)
    import_href = models.CharField(max_length = 200, unique = True)
    sold = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.vin


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200, null=True)
    employee_id = models.CharField(max_length=200,unique=True)


class Appointment(models.Model):
    vin = models.CharField(max_length = 17, null=True)
    owner = models.CharField(max_length = 200)
    date = models.CharField(max_length = 10)
    time = models.CharField(max_length = 10)
    technician = models.ForeignKey(
        Technician,
        related_name = "appointments",
        on_delete=models.PROTECT
    )
    reason = models.TextField()
    vip = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)
