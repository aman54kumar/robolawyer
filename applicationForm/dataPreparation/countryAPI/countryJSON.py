#!/usr/bin/env python
# coding: utf-8
""" delete countryArticle.json and global static folder
 python manage.py shell
 exec(open('.\\applicationForm\\dataPreparation\\countryAPI\\countryJSON.py').read())
#  for linux
 exec(open('./applicationForm/dataPreparation/countryAPI/countryJSON.py').read()) """
import pandas as pd
from datetime import datetime
from django.conf import settings
import os
import jsons

jsons.suppress_warnings()


def getFormattedArticleText(text):
    text = text.split("<br/>\n")
    if len(text) == 1:
        return [{"mainText": text, "points": []}]
    res = []
    flag = 0
    temp = {"mainText": "", "points": []}
    for i in text:
        if i[0] != "(":
            # main text
            if flag == 1 or flag == 2:
                res.append(temp)
                temp = {"mainText": "", "points": []}
            flag = 1
            temp["mainText"] = i

        else:
            # points
            flag = 2
            temp["points"].append(i)
    if flag == 2 or flag == 1:
        res.append(temp)
    return res


articleFile = os.path.join(
    settings.BASE_DIR,
    # 'applicationForm\\dataPreparation\\countryAPI\\API ratification territorial application reservations - With UK updated.xlsx'
    "applicationForm/dataPreparation/countryAPI/API ratification territorial application reservations - With UK updated-Jul23.xlsx",
)

courtFile = os.path.join(
    settings.BASE_DIR,
    "applicationForm/dataPreparation/countryAPI/Countries_and_national_courts.csv",
)

outputFile = os.path.join(
    settings.BASE_DIR,
    "applicationForm/static/applicationForm/apiFiles/countryArticle.json",
)

tempFile = os.path.join(
    settings.BASE_DIR, "applicationForm/static/applicationForm/apiFiles/temp.csv"
)
final_list = {}
country_json = {}
article_json = {}
court_json = {}
court_json = {}
fill_dt = datetime(2100, 1, 1)
fill_na = "N/A"

sheet_name = [i for i in range(1, 48)]
data = pd.read_excel(articleFile, sheet_name=sheet_name, index_col=0)
court = pd.read_csv(courtFile, header=0, sep=",", encoding="utf-8")

for element in data:
    data[element]["Date"] = data[element]["Date"].fillna(fill_dt)
    data[element]["Active/not active"] = data[element]["Active/not active"].fillna(
        fill_na
    )
    data[element]["Reservations/Derogations/Declarations"] = data[element][
        "Reservations/Derogations/Declarations"
    ].fillna(fill_na)
    data[element]["Article"] = data[element]["Article"].fillna(fill_na)
    data[element]["Full text"] = data[element]["Full text"].fillna(fill_na)

textArray = data[1]["Full text"]
resultList = []
for text in textArray:
    resultList.append(getFormattedArticleText(text))
court_country = court["Country"]
for item in range(1, len(data) + 1):
    country_json[data[item]["Country"][1]] = {}

for item in country_json:
    for record in data:
        # if item == data[record]["Country"].any():
        #     country_json[item]["Date"] = pd.to_datetime(
        #         data[record]["Date"]
        #     ).dt.strftime("%d-%m-%Y")
        #     country_json[item]["Active"] = data[record]["Active/not active"]
        #     country_json[item]["Reservations"] = data[record][
        #         "Reservations/Derogations/Declarations"
        #     ]
        #     country_json[item]["ratDate"] = pd.to_datetime(
        #         data[record]["Date"].min()
        #     ).strftime("%d-%m-%Y")
        if item == data[record]["Country"].all():
            print("here")
            article_json["Article"] = data[record]["Article"]
            article_json["Full text"] = resultList
        # if item in court["Country"].tolist():
        #     myIndex = court_country[court_country == item].index[0]
        #     if (
        #         type(court["ProceedingType3"].iloc[myIndex]) == float
        #         and type(court["ProceedingType2"].iloc[myIndex]) == float
        #     ):
        #         country_json[item]["Court"] = {
        #             "ProceedingType1": str(court["ProceedingType1"].iloc[myIndex]),
        #             "Court1": str(court["Court1"].iloc[myIndex]),
        #         }

        #     elif (
        #         type(court["ProceedingType3"].iloc[myIndex]) == float
        #         and type(court["ProceedingType2"].iloc[myIndex]) == str
        #     ):

        #         country_json[item]["Court"] = {
        #             "ProceedingType1": str(court["ProceedingType1"].iloc[myIndex]),
        #             "Court1": str(court["Court1"].iloc[myIndex]),
        #             "ProceedingType2": str(court["ProceedingType2"].iloc[myIndex]),
        #             "Court2": str(court["Court2"].iloc[myIndex]),
        #         }
        #     else:
        #         country_json[item]["Court"] = {
        #             "ProceedingType1": str(court["ProceedingType1"].iloc[myIndex]),
        #             "Court1": str(court["Court1"].iloc[myIndex]),
        #             "ProceedingType2": str(court["ProceedingType2"].iloc[myIndex]),
        #             "Court2": str(court["Court2"].iloc[myIndex]),
        #             "ProceedingType3": str(court["ProceedingType3"].iloc[myIndex]),
        #             "Court3": str(court["Court3"].iloc[myIndex]),
        #         }

final_list["country"] = country_json
final_list["article"] = article_json

# print(final_list["article"])
# with open(outputFile, "w", encoding="UTF-8") as ps:
#     ps.write(jsons.dumps(final_list))
