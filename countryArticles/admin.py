from django.contrib import admin

# Register your models here.
from .models import CountryDetail, ArticleDetail
# Register your models here.
admin.site.register(ArticleDetail)
admin.site.register(CountryDetail)
