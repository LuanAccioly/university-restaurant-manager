"""Esse módulo contém a aplicação Flask.
"""
from __future__ import annotations

import os

from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

import logging
import random
import time
from dataclasses import dataclass
from datetime import datetime
from enum import Enum

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo


def _max_id() -> int:
    sorted = list(mongo.db.transactions.find().sort('id', -1).limit(1))

    if len(sorted) <= 0:
        return 0
    
    return int(sorted[0]['id'])


def _find_all():
    def _map(o):
        del o['_id']
        return o
    
    find = mongo.db.transactions.find()
    sorted = find.sort('id', -1)
    return list(map(_map, sorted))


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

app = Flask(__name__)
CORS(app)

#app.config['MONGO_DBNAME'] = 'RU'
app.config['MONGO_URI'] = f'mongodb+srv://{os.environ["DB_USER"]}:{os.environ["DB_PASSWORD"]}@clustersd.qb2xyaw.mongodb.net/RU?retryWrites=true&w=majority'

mongo = PyMongo(app)

gunicorn_logger = logging.getLogger('gunicorn.error')
app.logger.handlers = gunicorn_logger.handlers
app.logger.setLevel(gunicorn_logger.level)

_CURRENT_ID = _max_id() + 1
print(f'ID atual é: {_CURRENT_ID}')


class PaymentMethod(str, Enum):
    PIX = "pix"
    CREDIT = "credit"

    @staticmethod
    def from_string(method: str) -> PaymentMethod:
        if method == "pix":
            return PaymentMethod.PIX
        else:
            return PaymentMethod.CREDIT

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

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "date": self.date.strftime("%d/%m/%y-%H:%M:%S"),
            "id": self.id,
            "lunch_amount": self.lunch_amount,
            "dinner_amount": self.dinner_amount,
            "total_value": self.total_value,
            "payment_method": self.payment_method,
            "payment_status": self.payment_status
        }


@app.route('/payment/pay', methods=['POST'])
def pay():
    global _CURRENT_ID
    data = request.get_json(force=True)
    order = Order(data["name"],
                  datetime.now(),
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

    _CURRENT_ID += 1
    mongo.db.transactions.insert_one(order.to_dict())

    return jsonify(order)


@app.route('/payment/list', methods=['GET'])
def list_payments():
    return jsonify(_find_all())
