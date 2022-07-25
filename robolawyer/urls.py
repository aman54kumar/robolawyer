from django.contrib import admin
from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns
from django.views.i18n import JavaScriptCatalog
import home
import applicationForm
import about
import extResources
from django.conf.urls.static import static
from django.conf import settings
from robots_txt.views import RobotsTextView

js_info_dict = {
    'packages': ('languages', )
}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls')),
    path('form/', include('applicationForm.urls')),
    path('aboutUs/', include('about.urls')),
    path('externalResources/', include('extResources.urls')),
    # Needed for locale change
    path('i18n/', include('django.conf.urls.i18n')),

    # robots.txt
    path('robots.txt', RobotsTextView.as_view())
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += i18n_patterns(
    # Needed for translations in Javascript
    path('jsi18n/', JavaScriptCatalog.as_view(), name='javascript-catalog'),
)
# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]

handler500 = 'applicationForm.views.error_500'
