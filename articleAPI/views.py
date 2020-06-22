from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializers import ArticleSerializer
from .models import ArticleDetail


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = ArticleDetail.objects.all().order_by('sNo')
    serializer_class = ArticleSerializer

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
