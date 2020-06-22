from rest_framework import serializers
from .models import ArticleDetail


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArticleDetail
        fields = (
            'sNo',
            'article',
            'fullText',
        )
