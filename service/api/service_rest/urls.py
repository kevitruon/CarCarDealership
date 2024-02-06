from django.urls import path
from .views import list_technician,list_appointment,show_appointment,show_technician

urlpatterns = [
    path("technicians/", list_technician, name="list_technician"),
    path("technicians/<int:pk>/", list_appointment, name="list_appointment"),
    path("appointments/", show_technician, name="show_technician"),
    path("appoinments/<int:pk>/", show_appointment, name="show_appointment")
]
