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
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "import_href"
    ]

@require_http_methods(["GET","POST"])
def list_technician(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            {"technician":technician},
            encoder=TechnicianDetailEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False
            )
        except:
            return JsonResponse(
                {"message": "Could not add technician"},
                status = 400,
            )

@require_http_methods(["GET","PUT", "DELETE"])
def show_technician(request, pk):
    if request.method == "GET":
        pass
    elif request.method == "PUT":
        pass
    else:
        pass

@require_http_methods(["GET","POST"])
def list_appointment(request, vin = None):
    if request.method == "GET":
        pass
    else:
        pass

@require_http_methods(["GET","PUT", "DELETE"])
def show_appointment(request, pk):
    if request.method == "GET":
        pass
    elif request.method == "PUT":
        pass
    else:
        pass
