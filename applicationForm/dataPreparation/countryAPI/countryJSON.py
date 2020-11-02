#!/usr/bin/env python
# coding: utf-8

import pandas as pd
from datetime import datetime
from django.conf import settings
import os
import jsons
jsons.suppress_warnings()

inputFile = os.path.join(
    settings.BASE_DIR,
    'applicationForm\\dataPreparation\\countryAPI\\API articles with ratification dates and reservations.xlsx'
)
outputFile = os.path.join(
    settings.BASE_DIR,
    'applicationForm\\static\\applicationForm\\apiFiles\\countryArticle.json')

final_list = {}
country_json = {}
article_json = {}
fill_dt = datetime(2100, 1, 1)
fill_na = "N/A"

sheet_name = [i for i in range(1, 46)]
data = pd.read_excel(inputFile, sheet_name=sheet_name, index_col=0)

for element in data:
    data[element]['Date'] = data[element]['Date'].fillna(fill_dt)
    data[element]['Active/not active'] = data[element][
        'Active/not active'].fillna(fill_na)
    data[element]['Reservations/Derogations/Declarations'] = data[element][
        'Reservations/Derogations/Declarations'].fillna(fill_na)
    data[element]['Article'] = data[element]['Article'].fillna(fill_na)
    data[element]['Full text'] = data[element]['Full text'].fillna(fill_na)

for item in range(1, len(data)):
    country_json[data[item]['Country'][1]] = {}

for item in country_json:
    for record in data:
        if item == data[record]['Country'].any():
            country_json[item]['Date'] = pd.to_datetime(
                data[record]['Date']).dt.strftime("%d-%m-%Y")
            country_json[item]['Active'] = data[record]['Active/not active']
            country_json[item]['Reservations'] = data[record][
                'Reservations/Derogations/Declarations']
            country_json[item]['ratDate'] = pd.to_datetime(
                data[record]['Date'].min()).strftime("%d-%m-%Y")
        if item == data[record]['Country'].all():
            article_json['Article'] = data[record]['Article']
            article_json['Full text'] = data[record]['Full text']

# final_list.append([1,2,3])
final_list["country"] = country_json
final_list["article"] = article_json

with open(outputFile, 'w', encoding="UTF-8") as ps:
    ps.write(jsons.dumps(final_list))
