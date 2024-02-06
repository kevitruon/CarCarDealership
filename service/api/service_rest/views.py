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
        "first_name",
        "last_name",
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

@require_http_methods(["GET", "DELETE"])
def show_technician(request, pk):
    if request.method == "GET":
        tech = Technician.objects.get(id=pk)
        return JsonResponse(
            tech,
            encoder=TechnicianDetailEncoder,
            safe=False
            )
    else:
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count>0})

@require_http_methods(["GET","POST"])
def list_appointment(request):
    if request.method == "GET":
        app = Appointment.objects.all()
        return JsonResponse(
            {"appointment":app},
            encoder=AppointmentDetailEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            techID = content["technician"]
            tech = Technician.objects.get(id=techID)
            content["technician"] = tech
            app = Appointment.objects.create(**content)
            return JsonResponse(
                app,
                encoder=AppointmentDetailEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Employee ID"},
                status = 400,
            )

@require_http_methods(["GET","PUT", "DELETE"])
def show_appointment(request, pk):
    if request.method == "GET":
        app = Appointment.objects.get(id=pk)
        return JsonResponse(
            app,
            encoder=AppointmentDetailEncoder,
            safe=False
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        Appointment.objects.filter(id=pk).update(**content)
        app = Appointment.objects.get(id=pk)
        return JsonResponse(
            app,
            encoder=AppointmentDetailEncoder,
            safe=False
        )
    else:
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count>0})
