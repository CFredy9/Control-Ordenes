from django.db import models


class Compra(models.Model):

    vendedor = models.ForeignKey('Profile', 
                            on_delete=models.CASCADE, 
                            related_name="vendedor")
    producto = models.ForeignKey('Producto', 
                            on_delete=models.CASCADE, 
                            related_name="producto")
    cantidad = models.IntegerField()
    total = models.DecimalField(max_digits=8, decimal_places=2)
    bandera = models.BooleanField(default=False)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    """def delete(self, *args):
        self.activo = False
        self.save()
        return True"""