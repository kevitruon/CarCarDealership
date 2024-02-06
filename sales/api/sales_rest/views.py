from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from decimal import Decimal
import json

from .models import AutomobileVO, Salesperson, Customer, Sale

class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "vin", "sold"]

class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = ["id","first_name", "last_name", "employee_id"]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ["id", "first_name", "last_name", "address", "phone_number"]

class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = ["id","price", "automobile", "salesperson", "customer"]

    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        return super().default(o)
    encoders = {
        "automobile" : AutomobileVODetailEncoder(),
        "salesperson" : SalespersonListEncoder(),
        "customer" : CustomerListEncoder(),
    }

@require_http_methods(("GET", "POST", "DELETE"))
def api_list_salesperson(request, salesperson_id=None):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople" : salespeople},
            encoder= SalespersonListEncoder,
            safe=False
        )
    elif request.method=="POST":
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonListEncoder,
            safe = False,
        )
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=salesperson_id).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(("GET", "POST", "DELETE"))
def api_list_customers(request, customer_id=None):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers" : customers},
            encoder= CustomerListEncoder,
            safe=False
        )
    elif request.method=="POST":
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerListEncoder,
            safe = False,
        )
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=customer_id).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(("GET", "POST", "DELETE"))
def api_list_sales(request, sale_id=None):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales" : sales},
            encoder= SaleListEncoder,
            safe=False
        )
    elif request.method=="POST":
        content = json.loads(request.body)
        try:
            automobile_id = content.get('automobile')
            content['automobile'] = AutomobileVO.objects.get(pk=automobile_id)
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid Auto ID"},
                status=400
            )
        try:
            salesperson_id = content.get('salesperson')
            content['salesperson'] = Salesperson.objects.get(pk=salesperson_id)
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid Salesperson ID"},
                status=400
            )
        try:
            customer_id = content.get('customer')
            content['customer'] = Customer.objects.get(pk=customer_id)
        except Customer.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid Customer Id"},
                status=400
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleListEncoder,
            safe = False,
        )
    elif request.method == "DELETE":
        count, _ = Sale.objects.filter(id=sale_id).delete()
        return JsonResponse({"deleted": count > 0})
