from django.shortcuts import render
from django.contrib.staticfiles import finders

# Create your views here.


def aboutPage(request):
    context = {"about_page": "active"}
    return render(request, 'about/aboutUs.html', context)
