from django.db import models
# Create your models here.


class ArticleDetail(models.Model):
    article = models.CharField(max_length=500)
    fullText = models.CharField(max_length=10000)

    def __str__(self):
        return self.article
