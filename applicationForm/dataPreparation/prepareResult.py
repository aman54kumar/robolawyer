from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import A4
from reportlab.rl_config import defaultPageSize
import os
import os.path
from PyPDF2 import PdfFileReader, PdfFileWriter, PdfFileMerger
import moment
import glob
import re
import shutil
from .inputMethodforWM import (
    firstPageInputs,
    secondPageInputs,
    thirdPageInputs,
    fourthPageInputs,
    fifthPageInputs,
    sixthPageInputs,
    seventhPageInputs,
    eighthPageInputs,
    ninthPageInputs,
    tenthPageInputs,
    eleventhPageInputs,
    twelvthPageInputs,
    thirteenthPageInputs,
    extractStringFromList,
)
from .inputMethodforWM import (
    modifyCountryNames,
    sortDocumentsDate,
    formatText,
    bookmarkPageInputs,
)

import logging
from .countryCoordDict import coordinateDict

# from datetime import datetime
from .prepareDocsPDF import PrepareDocsPDF

logger = logging.getLogger(__name__)


class PrepareResult:
    def __init__(self, inputObj, sessionID, spclReplies, hiddenDocsObject):
        self.inputObj = inputObj
        self.sessionID = sessionID
        self.spclReplies = spclReplies
        self.hiddenDocsObject = hiddenDocsObject

    basedirPDF = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    def natural_key(self, string_):
        return [int(s) if s.isdigit() else s for s in re.split(r"(\d+)", string_)]

    def createOrDeleteDirectory(self, directoryName):
        dirname = directoryName
        if not os.path.exists(dirname):
            os.makedirs(dirname)
        else:
            shutil.rmtree(dirname)
            os.makedirs(dirname)

    def swapPositions(self, list, pos1, pos2):
        list[pos1], list[pos2] = list[pos2], list[pos1]
        return list

    def changeDateFormat(self, inDate):
        if inDate == "":
            return inDate
        else:
            # inputDate = datetime.strptime(inDate, "%d-%m-%Y").date()
            inputDate = moment.date(inDate, "%d-%m-%Y").strftime("%Y-%m-%d")
            # inputDate = datetime.strptime(str(inputDate), "%Y-%m-%d")
            return str(inputDate)

    def objectDocs(self, objectDict, dirname):
        pageNList = [13]
        import json

        objectDict = json.loads(objectDict)
        # print(type(objectDict))
        for data in objectDict:
            docName = "Result_form_page_" + \
                str(14 + objectDict.index(data)) + ".pdf"
            # print(data)
            docsPDF = PrepareDocsPDF(
                data,
                dirname,
                str(docName),
                data["title"],
                data["title"],
                sum(pageNList),
            )
            pageReturned = docsPDF.main()
            pageNList.append(pageReturned)

    def main(self):
        """next 3 lines to be executed when there is a change in application form file. Looks for the
        formatting changes if needed."""
        # filename = 'applicationForm/dataPreparation/App_form.pdf'
        # self.createOrDeleteDirectory('applicationForm/dataPreparation/pages')
        # self.pdf_splitter(filename)
        sof = self.inputObj["page4"]["page4[stOfFacts]"]
        sof1 = ""
        sof2 = ""
        sof3 = ""
        lines = sof

        lines = formatText(self, lines, 99)

        cnt = 0
        temp = ""
        for line in lines.split("\n"):
            cnt = cnt + 1
            temp += line + "\n"

            if cnt <= 49:
                sof1 += temp

                temp = ""
            elif cnt <= 104:
                sof2 += temp
                temp = ""
            elif cnt <= 159:
                sof3 += temp
                temp = ""

        #  inputsForArticlePage
        article = self.inputObj["page5"]
        articleSelectList = []
        articleExplanationList = []
        for keys, value in article.items():
            if "articleArea" in keys:
                articleSelectList.append(value)
            if "articleExplanation" in keys:
                articleExplanationList.append(value)

        # test
        # for i in range(12):
        #     articleSelectList.append(articleSelectList[0])
        #     articleExplanationList.append(articleExplanationList[0])
        # close test

        lineEscape = "#-"
        tabEscape = "%+"
        finalString = extractStringFromList(
            articleSelectList, articleExplanationList, tabEscape, lineEscape
        )

        articleLineList = finalString.split(lineEscape)

        no_of_lines_first_page = 54
        no_of_lines_second_page = 54
        articleFirstPage = []
        articleSecondPage = []
        paraEscape = "$^"

        for i in range(no_of_lines_first_page):
            if i < len(articleLineList):
                if paraEscape in articleLineList[i]:
                    no_of_lines_first_page -= 1
            else:
                break

        articleFirstPage = articleLineList[:no_of_lines_first_page]

        for i in range(no_of_lines_first_page, no_of_lines_first_page + 54):
            if i < len(articleLineList):
                if paraEscape in articleLineList[i]:
                    no_of_lines_second_page -= 1
            else:
                break

        articleSecondPage = articleLineList[
            no_of_lines_first_page: no_of_lines_first_page + no_of_lines_second_page
        ]

        # finish Input for Article Page

        # input for complaints page
        complains = self.inputObj["page6"]
        # processing of page 6
        complainSelectList = []
        remediesUsedList = []
        # print(complains)
        for keys, value in complains.items():
            if "complainSelect" in keys:
                complainSelectList.append(value)
            if "remediesUsed" in keys:
                remediesUsedList.append(value)

        # test
        # for i in range(2):
        #     complainSelectList.append(complainSelectList[0])
        #     remediesUsedList.append(remediesUsedList[0])
        # close test
        finalStringPage10 = extractStringFromList(
            complainSelectList, remediesUsedList, tabEscape, lineEscape
        )

        # # print(repr(finalString))
        complainLineList = finalStringPage10.split(lineEscape)

        page_10_lines = 51

        for i in range(page_10_lines):
            if i < len(complainLineList):
                if paraEscape in complainLineList[i]:
                    page_10_lines -= 1
            else:
                break
        complainFirstPage = complainLineList[:page_10_lines]

        docs = self.inputObj["page8"]

        codeList = []
        barCodeText = "ENG - 2018/1|"

        inputState = self.spclReplies[0]
        statesValue = changeCountryToCode(inputState)

        for key, value in self.inputObj["page1"].items():
            if key in ["page1[referenceText]"]:
                barCodeText += value + "|"
        for key, value in self.inputObj["page2"].items():
            if key not in [
                "page2[applicantType]",
                "page2[applicantAnon]",
                "page2[applicantAnonExp]",
                "page2[orgDateOption]",
                "page2[orgIdentityOption]",
                "page2[orgActivity]",
            ]:
                barCodeText += value + "|"
        for key, value in self.inputObj["page3"].items():
            if key not in [
                "page3[indRepresentativeType]",
                "page3[indNLCapacity]",
                "page3[orgCapacity]",
                "page3[orgRepresentativeType]",
            ]:
                barCodeText += value + "|"
        barCodeText = barCodeText.replace("\r\n", "").replace("\n", "")
        barCodeList = barCodeText.split("|")
        if self.inputObj["page2"]["page2[applicantType]"] == "Organisation":
            barCodeList.insert(10, "")  # insert empty field for individual sex

        barCodeList.insert(17, statesValue)

        for indexes in [6, 21, 29, 36, 43]:
            barCodeList[indexes] = modifyCountryNames(barCodeList[indexes])
        barCodeList = self.swapPositions(
            barCodeList, 20, 21)  # address-nationality
        barCodeList = self.swapPositions(
            barCodeList, 22, 23)  # phone-fax-email
        barCodeList = self.swapPositions(
            barCodeList, 23, 24)  # phone-fax-email
        # swapping page1 values:
        barCodeList = self.swapPositions(barCodeList, 28, 29)
        barCodeList = self.swapPositions(
            barCodeList, 12, 13
        )  # swapping page 4 address and nationality:
        barCodeList = self.swapPositions(
            barCodeList, 36, 37
        )  # swapping page 4 L address and nationality:
        barCodeList = self.swapPositions(barCodeList, 43, 44)

        barCodeList[4] = self.changeDateFormat(barCodeList[4])
        barCodeList[13] = self.changeDateFormat(barCodeList[13])

        barCodeText = "|".join(barCodeList)

        codeList.append(barCodeText[:927])
        codeList.append(self.sessionID)
        self.createOrDeleteDirectory(
            "applicationForm/dataPreparation/results/" + self.sessionID + "/finalPage/"
        )
        self.createOrDeleteDirectory(
            "applicationForm/dataPreparation/results/" + self.sessionID + "/watermark/"
        )

        self.objectDocs(
            self.hiddenDocsObject,
            "applicationForm/dataPreparation/results/" + self.sessionID + "/finalPage/",
        )
        output1 = self.create_watermark_pdf(
            self.inputObj["page2"],
            pos=1,
            tempInput=self.inputObj["page1"]["page1[referenceText]"],
        )
        output2 = self.create_watermark_pdf(self.spclReplies[0], pos=2)
        if self.inputObj["page2"]["page2[applicantType]"] == "Individual":
            output3 = self.create_watermark_pdf(self.inputObj["page3"], pos=3)
            output4 = self.create_watermark_pdf([], pos=4)
        else:
            output3 = self.create_watermark_pdf([], pos=3)
            output4 = self.create_watermark_pdf(self.inputObj["page3"], pos=4)
        output5 = self.create_watermark_pdf(sof1, pos=5)
        output6 = self.create_watermark_pdf(sof2, pos=6)
        output7 = self.create_watermark_pdf(sof3, pos=7)
        output8 = self.create_watermark_pdf(articleFirstPage, pos=8)
        output9 = self.create_watermark_pdf(articleSecondPage, pos=9)
        output10 = self.create_watermark_pdf(complainFirstPage, pos=10)
        output11 = self.create_watermark_pdf(
            self.inputObj["page6"], pos=11, tempInput=self.inputObj["page7"]
        )
        output12 = self.create_watermark_pdf(docs, pos=12)
        output13 = self.create_watermark_pdf(
            self.inputObj["page9"], pos=13, tempInput=codeList
        )

        self.create_New_Pdf(docs)
        # totalDocs = len(self.inputObj['page8']) / 4

        logger.warning("Your log message is here")

        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_1.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_1.pdf",
            output1,
        )
        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_2.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_2.pdf",
            output2,
        ),
        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_3.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_3.pdf",
            output3,
        ),
        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_4.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_4.pdf",
            output4,
        ),
        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_5.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_5.pdf",
            output5,
        ),
        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_6.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_6.pdf",
            output6,
        ),
        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_7.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_7.pdf",
            output7,
        ),
        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_8.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_8.pdf",
            output8,
        ),
        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_9.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_9.pdf",
            output9,
        ),
        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_10.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_10.pdf",
            output10,
        ),
        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_11.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_11.pdf",
            output11,
        ),
        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_12.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_12.pdf",
            output12,
        ),
        self.watermark(
            "applicationForm/dataPreparation/pages/App_form_page_13.pdf",
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_13.pdf",
            output13,
        ),

        resultPath = glob.glob(
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Result_form_page_*.pdf"
        )
        # print(type(resultPath))

        resultPath.sort(key=self.natural_key)
        self.pdf_merger(
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/finalPage/Application form to the ECtHR.pdf",
            resultPath,
        )

    def pdf_splitter(self, path):
        fname = os.path.splitext(os.path.basename(path))[0]
        pdf = PdfFileReader(path)
        for page in range(pdf.getNumPages()):
            pdf_writer = PdfFileWriter()
            pdf_writer.addPage(pdf.getPage(page))
            output_filename = (
                "applicationForm/dataPreparation/pages/"
                + "{}_page_{}.pdf".format(fname, page + 1)
            )
            with open(output_filename, "wb") as out:
                pdf_writer.write(out)
            # print('Created: {}'.format(output_filename))

    def pdf_merger(self, output_path, input_paths):
        pdf_merger = PdfFileMerger()
        for path in input_paths:
            pdf_merger.append(path)
        with open(output_path, "wb") as fileobj:
            pdf_merger.write(fileobj)

    def watermark(self, input_pdf, output_pdf, watermark_pdf):
        watermark = PdfFileReader(watermark_pdf)
        watermark_page = watermark.getPage(0)
        pdf = PdfFileReader(input_pdf)
        pdf_writer = PdfFileWriter()
        for page in range(pdf.getNumPages()):
            pdf_page = pdf.getPage(page)
            pdf_page.mergePage(watermark_page)
            pdf_writer.addPage(pdf_page)
        with open(output_pdf, "wb") as fh:
            pdf_writer.write(fh)
        fh.close()

    def create_watermark_pdf(self, inputObj, pos, tempInput=None):
        filename = (
            "applicationForm/dataPreparation/results/"
            + self.sessionID
            + "/watermark/resultForm_"
            + str(pos)
            + ".pdf"
        )

        can = canvas.Canvas(filename, pagesize=A4)
        if pos == 1:
            can = firstPageInputs(self, can, inputObj, tempInput)
        elif pos == 2:
            can = secondPageInputs(self, can, inputObj)
        elif pos == 3:
            can = thirdPageInputs(self, can, inputObj)
        elif pos == 4:
            can = fourthPageInputs(self, can, inputObj)
        elif pos == 5:
            can = fifthPageInputs(self, can, inputObj)
        elif pos == 6:
            can = sixthPageInputs(self, can, inputObj)
        elif pos == 7:
            can = seventhPageInputs(self, can, inputObj)
        elif pos == 8:
            can = eighthPageInputs(self, can, inputObj)
        elif pos == 9:
            can = ninthPageInputs(self, can, inputObj)
        elif pos == 10:
            can = tenthPageInputs(self, can, inputObj)
        elif pos == 11:
            can = eleventhPageInputs(self, can, inputObj, tempInput)
        elif pos == 12:
            can = twelvthPageInputs(self, can, inputObj)
        elif pos == 13:
            can = thirteenthPageInputs(self, can, inputObj, tempInput)
        else:
            print("bug reported")
        can.save()
        return filename

    def getNumberOfPagesList(self, directory_name):
        pageCountList = []
        ext = ".pdf"

        for path, dirc, pdf_files in os.walk(directory_name):
            for name in pdf_files:
                if name.endswith(ext):
                    with open(os.path.join(path, name), "rb") as pdf_file:
                        pdf_reader = PdfFileReader(pdf_file)
                        pageCountList.append(pdf_reader.getNumPages())
        # for pdf_file in glob.iglob(str(directory_name) + "*.pdf"):
        #     with open(pdf_file, 'rb') as pdf_file:
        #         pdf_reader = PdfFileReader(pdf_file)
        #         pageCountList.append(pdf_reader.getNumPages())

        return list(reversed(pageCountList))

    def create_New_Pdf(self, inputObj):
        totalBookmark = int((len(inputObj)) / 4)
        docs4List = sortDocumentsDate(self, inputObj)
        # initPages = self.checkDocsOrNot(docs4List)
        initPages = 100
        for single in range(totalBookmark):
            filename = (
                "applicationForm/dataPreparation/results/"
                + self.sessionID
                + "/finalPage/Result_form_page_"
                + str(initPages + single)
                + ".pdf"
            )
            can = canvas.Canvas(filename, pagesize=A4)
            can = bookmarkPageInputs(
                self,
                can,
                [
                    docs4List[1][single],
                    docs4List[2][single],
                    docs4List[3][single],
                    docs4List[4][single],
                    single,
                ],
            )
            can.save()

    def checkDocsOrNot(self, docsList):
        sofExtra = any(
            "Extra pages for the Statement of Facts" in sublist for sublist in docsList
        )
        anonReq = any("Anonymity Request" in sublist for sublist in docsList)
        totalPages = 0
        if sofExtra and anonReq:
            totalPages = 14 + int(docsList[3][1])
        elif sofExtra or anonReq:
            totalPages = 14 + int(docsList[3][0])
        else:
            totalPages = 14
        return totalPages


def changeCountryToCode(countryList):
    sumValue = 0
    for country in countryList:
        # print(country)
        if country in coordinateDict:
            sumValue += coordinateDict[country]["n"]
    return str(sumValue) + ".00000000"


def makeDictofTextDocuments(data):
    finalDocumentDict = {}
    finalDocumentDict["Explanation for missing registration/incorporation no."] = data[
        "page2"
    ]["page2[orgDateNoArea]"]
    finalDocumentDict["Explanation for missing identification number."] = data["page2"][
        "page2[orgIdentityNoArea]"
    ]
    finalDocumentDict["Anonymity Request"] = data["page2"]["page2[applicantAnonExp]"]
    finalDocumentDict["Explanation for missing identification number."] = data["page3"][
        "page3[indLFaxTextArea]"
    ]
    finalDocumentDict["Explanation for lack of authority form"] = data["page3"][
        "page3[indNLAuthArea]"
    ]
    finalDocumentDict["Explanation for lack of signature on the authority form"] = data[
        "page3"
    ]["page3[indLAuthAreaYes]"]
    finalDocumentDict[""] = data["page3"][""]
    finalDocumentDict[""] = data["page3"][""]
    finalDocumentDict[""] = data["page3"][""]
    finalDocumentDict[""] = data["page3"][""]
    return finalDocumentDict
