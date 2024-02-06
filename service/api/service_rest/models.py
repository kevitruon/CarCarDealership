from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique =True)
    import_href = models.CharField(max_length = 200, unique = True)
    sold = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.vin


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_id = models.PositiveIntegerField(unique=True)


class Appointment(models.Model):
    vin = models.CharField(max_length = 17, null=True)
    owner = models.CharField(max_length = 200)
    date_time = models.DateTimeField()
    technician = models.ForeignKey(
        Technician,
        related_name = "appointments",
        on_delete=models.PROTECT
    )
    reason = models.TextField()
    vip = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)
