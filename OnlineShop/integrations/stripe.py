import stripe
from rest_framework.response import Response


def process_payment(request, amount):
    token = request.POST.get('stripeToken')

    try:
        charge = stripe.Charge.create(
            amount=amount,
            currency='eur',
            source=token,
            description='Test Payment'
        )

    except stripe.error.CardError as e:
        return Response({'message': 'Invalid Card'}, 400)

    except Exception:
        return Response({'message': 'Payment Provider Error'}, 500)
