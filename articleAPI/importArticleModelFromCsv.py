# script to run when updating this API
# use python manage.py shell for updating

from articleAPI.models import ArticleDetail
import csv
import os

filename = "articleList.csv"
# path = "D:/Projects/robolawyer/articleAPI"
# path = "/home/aman/Documents/Projects/robolawyer/articleAPI"
path = "/app/articleAPI"  #for heroku

os.chdir(path)
with open(filename, encoding="utf-8-sig") as csvFile:
    reader = csv.DictReader(csvFile)
    for row in reader:
        p = ArticleDetail(sNo=row['Index'],
                          article=row['Article'],
                          fullText=row['Full text'])
        # print(row)
        print(p)
        p.save()

if __name__ == "__main__":
    print("data updated")
