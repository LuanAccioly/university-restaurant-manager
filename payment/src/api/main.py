"""Esse módulo contém a aplicação Flask.
"""
from __future__ import annotations
from datetime import datetime
import logging
from dataclasses import dataclass
from flask import Flask, jsonify, request
from enum import Enum
from flask_cors import CORS
import random
import time

app = Flask(__name__)
CORS(app)

gunicorn_logger = logging.getLogger('gunicorn.error')
app.logger.handlers = gunicorn_logger.handlers
app.logger.setLevel(gunicorn_logger.level)

_ORDERS = dict()

_CURRENT_ID = 1


class PaymentMethod(str, Enum):
    PIX = "pix"
    CREDIT = "credit"

    @staticmethod
    def from_string(method: str) -> PaymentMethod:
        if method == "pix":
            return PaymentMethod.PIX
        else:
            return PaymentMethod.CREDIT


def validate_credit_card(card_number: str) -> bool:
    """This function validates a credit card number."""
    # 1. Change datatype to list[int]
    card_number = [int(num) for num in card_number]

    # 2. Remove the last digit:
    checkDigit = card_number.pop(-1)

    # 3. Reverse the remaining digits:
    card_number.reverse()

    # 4. Double digits at even indices
    card_number = [num * 2 if idx % 2 == 0
                   else num for idx, num in enumerate(card_number)]

    # 5. Subtract 9 at even indices if digit is over 9
    # (or you can add the digits)
    card_number = [num - 9 if idx % 2 == 0 and num > 9
                   else num for idx, num in enumerate(card_number)]

    # 6. Add the checkDigit back to the list:
    card_number.append(checkDigit)

    # 7. Sum all digits:
    checkSum = sum(card_number)

    # 8. If checkSum is divisible by 10, it is valid.
    return checkSum % 10 == 0


@dataclass
class Order:
    name: str
    date: datetime
    id: int
    lunch_amount: int
    dinner_amount: int
    total_value: float
    payment_method: PaymentMethod
    payment_status: str


@app.route('/payment/pay', methods=['POST'])
def pay():
    global _CURRENT_ID
    data = request.get_json(force=True)
    order = Order(data["name"],
                  datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
                  _CURRENT_ID,
                  data["lunch_amount"],
                  data["dinner_amount"],
                  data["total_value"],
                  PaymentMethod.from_string(data["payment_method"]),
                  "Aguardando pagamento"
                  )
    valid = False

    if order.payment_method == PaymentMethod.CREDIT:
        cc_number = data['credit_card_number']
        # cc_name = data['credit_name']
        # cc_cvv = data['credit_cvv']

        cc_exp_date = data['credit_expiration_date']  # MM/YY
        exp_date = datetime.strptime(cc_exp_date, "%m/%y")
        expired = exp_date < datetime.now()

        # Adicionar lógica de validação...
        valid = not expired and validate_credit_card(cc_number)
    else:
        # Do contrário, é PIX
        # Valida CPF
        cpf = data['pix_cpf']
        # name = data['pix_name']

        # Adicionar lógica de validação
        valid = sum(map(int, cpf)) % 11 == 0

    if valid:
        status = "Pagamento aprovado"

        if random.randint(0, 100) >= 75:
            status = "Falha no pagamento"

        order.payment_status = status
    else:
        order.payment_status = "Forma de pagamento inválido."

    time.sleep(random.randint(0, 3))
    _ORDERS[order.id] = order
    _CURRENT_ID += 1

    return jsonify(order)


@app.route('/payment/list', methods=['GET'])
def list_payments():
    return jsonify(list(reversed(_ORDERS.values())))
