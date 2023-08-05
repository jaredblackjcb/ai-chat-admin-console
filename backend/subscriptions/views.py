import environ
import os
from pathlib import Path
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import stripe
from rest_framework import status

BASE_DIR = Path(__file__).resolve().parent.parent
env = environ.Env()
env.read_env(os.path.join(BASE_DIR,  ".env"))
stripe.api_key = env("STRIPE_TEST_SECRET_KEY")

@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
    amount=1000, currency='pln', 
    payment_method_types=['card'],
    receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)

# @api_view(['GET'])
# def pricing_plans(request):
#     active_products = list(get_active_products_with_metadata())

#     def _to_dict(product_with_metadata):
#         product_data = {}
#         if PlanInterval.year in ACTIVE_PLAN_INTERVALS:
#             product_data['annual_price'] = {
#                 'stripe_id': product_with_metadata.annual_price.id,
#                 'payment_amount': product_with_metadata.get_annual_price_display(),
#                 'interval': PlanInterval.year,
#             }
#         if PlanInterval.month in ACTIVE_PLAN_INTERVALS:
#             product_data['monthly_price'] = {
#                 'stripe_id': product_with_metadata.monthly_price.id,
#                 'payment_amount': product_with_metadata.get_monthly_price_display(),
#                 'interval': PlanInterval.month,
                
#             }
#         return product_data

#     response_data = {
#         'stripe_api_key': djstripe_settings.STRIPE_PUBLIC_KEY,
#         'active_products': active_products,
#         'active_products_json': {str(p.stripe_id): _to_dict(p) for p in active_products},
#         'active_plan_intervals': get_active_plan_interval_metadata(),
#         'subscription_urls': get_subscription_urls(None)
#     }

#     return Response(response_data)
