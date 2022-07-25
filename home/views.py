from django.shortcuts import render
from django.contrib.staticfiles import finders
from django.http import HttpResponse
from pdfrw import PdfReader
# Create your views here.


def home(request):
    context = {"home_page": "active"}
    return render(request, 'home/home.html', context)
