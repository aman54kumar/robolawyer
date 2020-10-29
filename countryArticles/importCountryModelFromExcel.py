# script to run when updating this API
# use python manage.py shell for updating

from countryArticles.models import CountryDetail, ArticleDetail
import pandas as pd
import os

sheet_name = [i for i in range(1, 46)]
path = "D:/Projects/robolawyer/countryArticles"
# filename = "./API articles with ratification dates and reservations.xlsx"
filename = "API articles with ratification dates and reservations.xlsx"
os.chdir(path)
data = pd.read_excel(filename, sheet_name=sheet_name, index_col=0)



for count in range(1, len(data)):
    nation = CountryDetail.objects.get(country=data[count]['Country'][1])
    q = ArticleDetail(
        country=nation,
        date=data[count]['Date'],
        active=data[count]['Active/not active'],
        reservations=data[count]['Reservations/Derogations/Declarations'],
        article=data[count]['Article'],
        fullText=data[count]['Full text'])
    q.save()

    print("data updated")

# for element in data:
#     print(element)
# p = ArticleDetail(sNo=row['Index'],
#                   article=row['Article'],
#                   fullText=row['Full text'])
# # print(row)
# print(p)
# p.save()