from django.urls import path
from .views import list_technician,list_appointment,show_appointment,show_technician

urlpatterns = [
    path("technicians/", list_technician, name="list_technician"),
    path("appointments/", list_appointment, name="list_appointment"),
    path("technicians/<int:pk>/", show_technician, name="show_technician"),
    path("appointments/<int:pk>/", show_appointment, name="show_appointment")
]
