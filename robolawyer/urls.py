"""robolawyer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.conf.urls.i18n import i18n_patterns
from django.views.i18n import JavaScriptCatalog
import home
import applicationForm
import about
import extResources
from django.conf.urls.static import static
from django.conf import settings
from robots_txt.views import RobotsTextView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls')),
    path('form/', include('applicationForm.urls')),
    path('aboutUs/', include('about.urls')),
    path('externalResources/', include('extResources.urls')),
    # Needed for locale change
    path('i18n/', include('django.conf.urls.i18n')),
    # robots.txt
    path('robots.txt', RobotsTextView.as_view()),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += i18n_patterns(
    # Needed for translations in Javascript
    path('jsi18n/', JavaScriptCatalog.as_view(), name='javascript-catalog'),
)
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]

handler500 = 'applicationForm.views.error_500'
