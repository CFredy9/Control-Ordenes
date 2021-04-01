from django.db import models
from django.contrib.auth.models import User


class Producto(models.Model):

    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    existencias = models.IntegerField()
    vendedor = models.ForeignKey('Profile', 
                            on_delete=models.CASCADE, 
                            related_name="vendedor_producto")

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True