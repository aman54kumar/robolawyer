from django.shortcuts import render
from django.contrib.staticfiles import finders
from django.http import HttpResponse
# Create your views here.


def home(request):
    return render(request, 'home/home.html')
