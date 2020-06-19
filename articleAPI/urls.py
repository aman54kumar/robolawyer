from django.urls import include, path
from rest_framework import routers
from . import views

app_name = 'articleAPI'
router = routers.DefaultRouter()
router.register(r'', views.ArticleViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework'))
]
