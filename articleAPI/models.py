from django.db import models
# Create your models here.


class ArticleDetail(models.Model):
    sNo = models.IntegerField(primary_key=True)
    article = models.CharField(max_length=500)
    fullText = models.TextField(max_length=10000)

    def __str__(self):
        return self.article
