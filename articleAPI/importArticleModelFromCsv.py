# script to run when updating this API
# use python manage.py shell for updating

from articleAPI.models import ArticleDetail
import csv
import os

filename = "CSV_articleAPI.csv"
# path = "D:/Projects/robolawyer/articleAPI"
# path = "/home/aman/Documents/Projects/robolawyer/articleAPI"
path = "/app/articleAPI"  #for heroku

os.chdir(path)
with open(filename, encoding="UTF-8") as csvFile:
    reader = csv.DictReader(csvFile)
    for row in reader:
        p = ArticleDetail(article=row['\ufeffArticle'],
                          fullText=row['Full text'])
        print(p)
        p.save()

if __name__ == "__main__":
    print("data updated")
