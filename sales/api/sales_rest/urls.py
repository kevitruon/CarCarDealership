from django.contrib import admin
from django.urls import path

from .views import api_list_salesperson, api_list_customers, api_list_sales

urlpatterns=[
    path('salespeople/', api_list_salesperson, name = "api_list_salesperson"),
    path('salespeople/<int:salesperson_id>/', api_list_salesperson, name="delete_salesperson"),
    path('customers/', api_list_customers, name="api_list_customers"),
    path('customers/<int:customer_id>/', api_list_customers, name="delete_customer"),
    path('sales/', api_list_sales, name="api_list_sales"),
    path('sales/<int:sale_id>/', api_list_sales, name="delete_sale")
]
