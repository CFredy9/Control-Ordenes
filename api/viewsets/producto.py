from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction

from django.db.models import Sum, Count

from api.models import Producto, Profile
from api.serializers import ProductoSerializer, ProductoRegistroSerializer


class ProductoViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProductoSerializer
        else:
            return ProductoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    @permission_classes([AllowAny])
    def list(self, request, *args, **kwargs):
        user = request.user.profile.id
        data = request.query_params
        queryset = Producto.objects.filter(vendedor=user, activo=True)
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

    def create(self, request):
        try:
            with transaction.atomic():
                data = request.data
                user = request.user.profile.id
                verify = ProductoRegistroSerializer(data=data)
                if verify.is_valid():
                    
                    usuario = Profile.objects.get(pk=user)

                    producto = Producto.objects.create(
                        nombre=data.get('nombre'),
                        precio=data.get('precio'),
                        existencias=data.get('existencias'),
                        vendedor=usuario,
                    )

                    
                else:
                    #print("Error en la verificación")
                    return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(verify.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ComprarProductos(viewsets.ModelViewSet):

    serializer_class = ProductoSerializer
    queryset = Producto.objects.filter(activo=True)
    serializer = serializer_class(queryset)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def list (self, request, *args, **kwargs):
        
        validacion = request.user.is_anonymous 
        if(validacion==True):
            user = 0
        elif(validacion==False):
            user = request.user.profile.id
        
        print('USER', user)
        data = request.query_params
        
        queryset = Producto.objects.filter(existencias__gt=0, activo=True).exclude(vendedor=user).order_by('nombre')
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