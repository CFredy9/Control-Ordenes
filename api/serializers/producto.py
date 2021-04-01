from rest_framework import serializers
from api.models import Producto


class ProductoSerializer(serializers.ModelSerializer):
    total_ventas = serializers.DecimalField(default=0, max_digits=8, decimal_places=2)
    vendido = serializers.FloatField(default=0)
    class Meta:
        model = Producto
        fields = (
            'id',
            'nombre',
            'precio',
            'existencias',
            'vendedor',
            'total_ventas',
            'vendido',
            )
        depth=2


class ProductoRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Producto
        fields = (
            'nombre',
            'precio',
            'existencias',
        )