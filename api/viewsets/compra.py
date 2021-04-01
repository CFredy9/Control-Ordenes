from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction

from django.db.models.functions import Round, Ceil
from django.db.models import Sum, Count, Avg

from api.models import Compra, Producto, Profile
from api.serializers import CompraSerializer, CompraRegistroSerializer, ProductoSerializer


class CompraViewset(viewsets.ModelViewSet):
    queryset = Compra.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("producto__nombre",)
    search_fields = ("producto__nombre",)
    ordering_fields = ("producto__nombre",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CompraSerializer
        else:
            return CompraRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def list(self, request, *args, **kwargs):
        validacion = request.user.is_anonymous 
        if(validacion==True):
            user = 0
        elif(validacion==False):
            user = request.user.profile.id
        data = request.query_params
        queryset = Compra.objects.filter(
            bandera=True, 
            activo=True
            )
        serializer = CompraSerializer(queryset, many=True)

        page = request.GET.get('page')

        try: 
            page = self.paginate_queryset(queryset)
            print('page', page)
        except Exception as e:
            page = []
            data = page
            return Response({
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'No more record.',
                "data" : data
                })

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            data = serializer.data
            return self.get_paginated_response(data)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        try:
            with transaction.atomic():
                data = request.data
                validacion = request.user.is_anonymous 
                if(validacion==True):
                    user = 0
                elif(validacion==False):
                    user = request.user.profile.id
                verify = CompraRegistroSerializer(data=data)
                if verify.is_valid():
                    
                    vendedor = Profile.objects.get(pk=data.get('vendedor'))
                    producto = Producto.objects.get(pk=data.get('producto'))

                    existencias = producto.existencias - int(data.get('cantidad'))
                    total = producto.precio * int(data.get('cantidad'))

                    if(data.get('bandera')==True):
                        compra = Compra.objects.create(
                            vendedor=vendedor,
                            producto=producto,
                            cantidad=data.get('cantidad'),
                            total=total,
                            bandera=True
                        )
                    else:
                        queryset = Compra.objects.filter(bandera=True)
                        a = 0
                        for x in queryset:
                            compra = queryset[a]
                            compra.bandera = False
                            compra.save()
                            a+=1
                        
                        

                    producto.existencias = existencias
                    producto.save()
                    
                else:
                    #print("Error en la verificación")
                    return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(verify.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:            
            compra = Compra.objects.get(pk=pk)

            producto = Producto.objects.get(pk=compra.producto.id)
            producto.existencias = producto.existencias + compra.cantidad
            producto.save()

            compra.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["get"], detail=False)
    def total_carrito(self, request, *args, **kwargs):
        data = request.query_params
        queryset = Compra.objects.filter(
            bandera=True, 
            activo=True
            ).aggregate(total=
                Sum('total')) 
        return Response(queryset, status=status.HTTP_200_OK)

class Reportes(viewsets.ModelViewSet):

    serializer_class = ProductoSerializer
    queryset = Producto.objects.filter(activo=True)
    serializer = serializer_class(queryset)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def list (self, request, *args, **kwargs):
        user = request.user.profile.id
        data = request.query_params
        
        queryset = Producto.objects.filter(
            vendedor=user, 
            activo=True
            ).annotate(
                total_ventas=Sum(
                    'producto__total',
                ), 
                vendido=Sum(
                    'producto__cantidad'
                )
            )
        serializer = ProductoSerializer(queryset, many=True)

        page = request.GET.get('page')

        try: 
            page = self.paginate_queryset(queryset)
            print('page', page)
        except Exception as e:
            page = []
            data = page
            return Response({
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'No more record.',
                "data" : data
                })

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            data = serializer.data
            return self.get_paginated_response(data)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["get"], detail=False)
    def total_ventas(self, request, *args, **kwargs):
        user = request.user.profile.id
        data = request.query_params
        queryset = Producto.objects.filter(
            vendedor=user, 
            activo=True
            ).aggregate(total=
                Sum('producto__total')) 
        return Response(queryset, status=status.HTTP_200_OK)

    @action(methods=["get"], detail=False)
    def promedio_precios(self, request, *args, **kwargs):
        user = request.user.profile.id
        data = request.query_params
        queryset = Producto.objects.filter(
            vendedor=user, 
            activo=True
            ).aggregate(promedio=
                (Avg('precio')))
        #queryset = round(float(queryset.get('promedio')), 2)
        return Response(queryset, status=status.HTTP_200_OK)
