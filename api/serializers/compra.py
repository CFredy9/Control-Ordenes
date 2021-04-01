from rest_framework import serializers
from api.models import Compra


class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = (
            'id',
            'vendedor',
            'producto',
            'cantidad',
            'bandera',
            'total'
        )
        depth=1


class CompraRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Compra
        fields = (
            'vendedor',
            'producto',
            'cantidad',
        )