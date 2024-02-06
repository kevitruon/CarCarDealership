from common.json import ModelEncoder
from .models import AutomobileVO,Technician,Appointment
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

# Create your views here.
class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
        "employee_id"
    ]

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "owner",
        "date_time",
        "technician",
        "reason",
        "vip",
        "finished"
    ]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }

@require_http_methods(["GET","POST"])
def list_technician(request):
    pass

@require_http_methods(["GET","PUT", "DELETE"])
def show_technician(request, pk):
    pass

@require_http_methods(["GET","POST"])
def list_appointment(request, vin = None):
    pass

@require_http_methods(["GET","PUT", "DELETE"])
def show_appointment(request, pk):
    pass
