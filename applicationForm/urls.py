from django.urls import path, include
from .views import FormPageView, formProcessing, feedback, download, pdf_email

urlpatterns = [
    path('', FormPageView.as_view(), name='form'),
    path('submit', formProcessing, name='formProcessing'),
    path('feedback', feedback, name="feedback"),
    path('download', download, name="download"),
    path('email', pdf_email, name="pdf_email")
]
