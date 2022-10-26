#!/usr/bin/env python
# coding: utf-8
""" delete countryArticle.json (not apiFiles directory) and global static folder
 python manage.py shell
 exec(open('.\\applicationForm\\dataPreparation\\countryAPI\\countryJSON.py').read())
#  for linux
 exec(open('./applicationForm/dataPreparation/countryAPI/countryJSON.py').read())
 """
import os
from datetime import datetime
import pandas as pd
from django.conf import settings

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


ARTICLE_FILE = os.path.join(
    settings.BASE_DIR,
    "applicationForm/dataPreparation/countryAPI/Updated API ratification list-old.xlsx",
)

COURT_FILE = os.path.join(
    settings.BASE_DIR,
    "applicationForm/dataPreparation/countryAPI/Countries_and_national_courts.csv",
)

OUTPUT_FILE = os.path.join(
    settings.BASE_DIR,
    "applicationForm/static/applicationForm/apiFiles/countryArticle.json",
)

TEMP_FILE = os.path.join(
    settings.BASE_DIR, "applicationForm/static/applicationForm/apiFiles/temp.csv"
)
FINAL_LIST = {}
COUNTRY_JSON = {}
ARTICLE_JSON = {}
COURT_JSON = {}
FILL_DT = datetime(2100, 1, 1)
FILL_NA = "N/A"

SHEET_NAME = [i for i in range(1, 48)]
DATA = pd.read_excel(ARTICLE_FILE, sheet_name=SHEET_NAME, index_col=0, engine="xlrd")
COURT = pd.read_csv(COURT_FILE, header=0, sep=",", encoding="utf-8")

for element in DATA:
    DATA[element]["Date"] = DATA[element]["Date"].fillna(FILL_DT)
    DATA[element]["Active/not active"] = DATA[element]["Active/not active"].fillna(
        FILL_NA
    )
    DATA[element]["Reservations/Derogations/Declarations"] = DATA[element][
        "Reservations/Derogations/Declarations"
    ].fillna(FILL_NA)
    DATA[element]["Article"] = DATA[element]["Article"].fillna(FILL_NA)
    DATA[element]["Full text"] = DATA[element]["Full text"].fillna(FILL_NA)

TEXT_ARRAY = DATA[1]["Full text"]
RESULT_LIST = []
for text in TEXT_ARRAY:
    RESULT_LIST.append(getFormattedArticleText(text))
court_country = COURT["Country"]
for item in range(1, len(DATA) + 1):
    COUNTRY_JSON[DATA[item]["Country"][1]] = {}

for item in COUNTRY_JSON:
    for record in DATA:
        if item == DATA[record]["Country"].any():
            COUNTRY_JSON[item]["Date"] = pd.to_datetime(
                DATA[record]["Date"]
            ).dt.strftime("%d-%m-%Y")
            COUNTRY_JSON[item]["Active"] = DATA[record]["Active/not active"]
            COUNTRY_JSON[item]["Reservations"] = DATA[record][
                "Reservations/Derogations/Declarations"
            ]
            COUNTRY_JSON[item]["ratDate"] = pd.to_datetime(
                DATA[record]["Date"].min()
            ).strftime("%d-%m-%Y")
        if item == DATA[record]["Country"].all():
            ARTICLE_JSON["Article"] = DATA[record]["Article"]
            ARTICLE_JSON["Full text"] = RESULT_LIST

        if item in COURT["Country"].tolist():
            myIndex = court_country[court_country == item].index[0]
            if isinstance(COURT["ProceedingType3"].iloc[myIndex], float) and isinstance(
                COURT["ProceedingType2"].iloc[myIndex], float
            ):
                COUNTRY_JSON[item]["Court"] = {
                    "ProceedingType1": str(COURT["ProceedingType1"].iloc[myIndex]),
                    "Court1": str(COURT["Court1"].iloc[myIndex]),
                }

            elif isinstance(
                COURT["ProceedingType3"].iloc[myIndex], float
            ) and isinstance(COURT["ProceedingType2"].iloc[myIndex], str):

                COUNTRY_JSON[item]["Court"] = {
                    "ProceedingType1": str(COURT["ProceedingType1"].iloc[myIndex]),
                    "Court1": str(COURT["Court1"].iloc[myIndex]),
                    "ProceedingType2": str(COURT["ProceedingType2"].iloc[myIndex]),
                    "Court2": str(COURT["Court2"].iloc[myIndex]),
                }
            else:
                COUNTRY_JSON[item]["Court"] = {
                    "ProceedingType1": str(COURT["ProceedingType1"].iloc[myIndex]),
                    "Court1": str(COURT["Court1"].iloc[myIndex]),
                    "ProceedingType2": str(COURT["ProceedingType2"].iloc[myIndex]),
                    "Court2": str(COURT["Court2"].iloc[myIndex]),
                    "ProceedingType3": str(COURT["ProceedingType3"].iloc[myIndex]),
                    "Court3": str(COURT["Court3"].iloc[myIndex]),
                }

FINAL_LIST["country"] = COUNTRY_JSON
FINAL_LIST["article"] = ARTICLE_JSON
with open(OUTPUT_FILE, "w", encoding="UTF-8") as ps:
    ps.write(jsons.dumps(FINAL_LIST))
