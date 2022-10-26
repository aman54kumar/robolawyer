from django.shortcuts import render
from django.contrib.staticfiles import finders
# Create your views here.


def privacy(request):
    context = {"privacy": "active"}
    return render(request, 'privacy/privacy.html', context)
