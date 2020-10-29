from django.db import models
# Create your models here.


class CountryDetail(models.Model):
    sNo = models.IntegerField(primary_key=True)
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.country


class ArticleDetail(models.Model):
    country = models.ForeignKey(CountryDetail, on_delete=models.CASCADE)
    date = models.CharField(max_length=5000)
    active = models.CharField(max_length=1000)
    reservations = models.TextField(max_length=10000)
    article = models.CharField(max_length=1000)
    fullText = models.TextField(max_length=10000)