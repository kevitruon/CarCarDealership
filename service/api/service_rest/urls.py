from django.urls import path
from .views import list_technician,list_appointment,show_appointment,show_technician

urlpatterns = [
    path("technician/", list_technician, name="list_technician"),
    path("technician/<int:pk>/", list_appointment, name="list_appointment"),
    path("appointment/", show_technician, name="show_technician"),
    path("appoinment/<int:pk>/", show_appointment, name="show_appointment")
]
