from django.shortcuts import render
from django.contrib.staticfiles import finders

# Create your views here.


def aboutPage(request):
    return render(request, 'about/aboutUs.html')
