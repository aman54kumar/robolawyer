

import time
# from collections import OrderedDict
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.rl_config import defaultPageSize
from reportlab.lib.units import inch
import os
import shutil
from applicationForm.dataPreparation.inputMethodforWM import formatText


class PrepareDocsPDF:
        
    def __init__(self, sessionID, objectDict):
        self.sessionID = sessionID
        self.objectDict = objectDict
        self.PAGE_HEIGHT = defaultPageSize[1]
        self.PAGE_WIDTH = defaultPageSize[0]

    def createDirectory(self, directoryName):
        # code to create directory/file (Decide it) and name it as per the need
        dirname = directoryName
        if not os.path.exists(dirname):
            os.makedirs(dirname)
        else:
            shutil.rmtree(dirname)
            os.makedirs(dirname)
        return

    def myFirstPage(self, canvas, args):
        # Title = "title"
        # pageinfo = "pageInfo"
        canvas.saveState()
        canvas.setFont('Times-Bold', 16)
        canvas.drawCentredString(self.PAGE_WIDTH / 2.0, self.PAGE_HEIGHT - 108, args.title)
        canvas.setFont('Times-Roman', 9)
        canvas.drawString(inch, 0.75 * inch, "First Page / %s" % args.pageinfo)
        canvas.restoreState()

    def myLaterPages(self, canvas, doc, args):
        canvas.saveState()
        canvas.setFont('Times-Roman', 9)
        canvas.drawString(inch, 0.75 * inch, "Page %d %s" % (doc.page, args.pageinfo))
        canvas.restoreState()

    def go(self, filename, dirName, textString, firstPage, laterPage, *args):
        styles = getSampleStyleSheet()
        doc = SimpleDocTemplate(dirName + str(filename))
        Story = [Spacer(1, 2 * inch)]
        style = styles["Normal"]
        style.fontName = "Courier"
        style.fontSize = 9
        textString = formatText(self, textString, 78)
        textString = textString.replace("\n", "<br/>")
        p = Paragraph(textString, style)
        Story.append(p)
        Story.append(Spacer(1, 0.2 * inch))
        doc.build(Story, onFirstPage=firstPage, onLaterPages=laterPage)

    def main(self):
        print(self.sessionID)
        dirName = "applicationForm/dataPreparation/results/" + self.sessionID + "/docs/"
        self.createDirectory(dirName)
        for data in self.objectDict:
            docName = self.objectDict.index(data)
            args = (data['title'], data['title'])
            self.go(docName, dirName, data['text'], self.myFirstPage, self.myLaterPages, args)
    
# from reportlab.pdfgen import canvas
# from reportlab.lib.units import inch
# from reportlab.lib.pagesizes import A4
# from reportlab.pdfbase.pdfmetrics import stringWidth
# from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
# from reportlab.lib.styles import getSampleStyleSheet
# # from PyPDF2 import PdfFileReader, PdfFileWriter, PdfFileMerger
# import os
# import os.path
# import shutil


# class PrepareDocsPDF:
#     def __init__(self, sessionID, objectDict):
#         self.sessionID = sessionID
#         self.objectDict = objectDict

#     def createDirectory(self, directoryName):
#         # code to create directory/file (Decide it) and name it as per the need
#         dirname = directoryName
#         if not os.path.exists(dirname):
#             os.makedirs(dirname)
#         else:
#             shutil.rmtree(dirname)
#             os.makedirs(dirname)
#         return

#     def createProperFileName():
#         # code to create proper file names according to sessionID and document description
#         return

#     def makePDF():
#         # code to make pdf of corresponding documents.
#         return

#     def documentFirstPage(self, title):
#         # code to make first page of documents.
#         PAGE_HEIGHT = defaultPageSize[1]
#         PAGE_WIDTH = defaultPageSize[0]
#         pageinfo = title
#         Title = title
#         canvas.saveState()
#         canvas.setFont("Times-Bold", 16)
#         canvas.drawCentredString(PAGE_WIDTH / 2.0, PAGE_HEIGHT - 108, Title)
#         canvas.setFont("Times-Roman", 9)
#         canvas.drawString(inch, 0.75 * inch, " %s" % pageinfo)
#         canvas.restoreState()
        
#     def documentRestPages(title):
#         # code to make remaining pages of documents.
#         pageinfo = title
#         canvas.saveState()
#         canvas.setFont("Times-Roman", 9)
#         canvas.drawString(inch, 0.75 * inch, "Page %d %s" % (doc.page, pageinfo))
#         canvas.restoreState()

#     def documentSeparatorPages(can, inputObj):
#         # code to make separator pages for documents.
#         headingText = "Accompanying Documents: Document " + str(inputObj[4] + 1)
#         can.setFont("Courier", 18)
#         can.drawString(120, 600, headingText)
#         can.setFont("Times-Roman", 12)
#         if len(inputObj[1]) > 60:
#             extraHeight = 30
#         else:
#             extraHeight = 0

#         can.drawString(80, 500, "Document Title: ")
#         can.drawString(80, 470, "Short Description: ")
#         can.drawString(80, 440 - extraHeight, "Number of Pages: ")

#         startPage = str(1 + int(inputObj[2]) - int(inputObj[3]))
#         endPage = str(1 + int(inputObj[2]) - 1)
#         x = 80
#         y = 410 - extraHeight
#         pagesText1 = "Document starts at page "
#         pagesText2 = " and ends at page "
#         can.drawString(x, y, pagesText1)
#         textWidth = stringWidth(pagesText1, "Times-Roman", 12)
#         can.setFont("Courier", 12)
#         x += textWidth + 1
#         can.drawString(x, y, startPage)
#         textWidth = stringWidth(startPage, "Courier", 12)
#         can.setFont("Times-Roman", 12)
#         x += textWidth + 1
#         can.drawString(x, y, pagesText2)
#         textWidth = stringWidth(pagesText2, "Times-Roman", 12)
#         can.setFont("Courier", 12)
#         x += textWidth + 1
#         can.drawString(x, y, endPage)

#         t1 = can.beginText()
#         t1.setTextOrigin(180, 500)
#         can.setFont("Courier", 12)
#         title = inputObj[0]
#         newTitle = formatText(self, title, 45)
#         t1.textLines(newTitle)
#         can.drawText(t1)

#         t2 = can.beginText()
#         t2.setTextOrigin(180, 470)
#         can.setFont("Courier", 12)
#         desc = inputObj[1]
#         newDesc = formatText(self, desc, 45)
#         t2.textLines(newDesc)
#         can.drawText(t2)

#         t3 = can.beginText()
#         t3.setTextOrigin(180, 440 - extraHeight)
#         can.setFont("Courier", 12)
#         nOPages = inputObj[3]
#         t3.textLines(nOPages)
#         can.drawText(t3)

#         can.showPage()
#         return can

#     def printDoc(self, filename, textString, firstPage, laterPage=None):
#         styles = getSampleStyleSheet()
#         doc = SimpleDocTemplate(filename)
#         Story = [Spacer(1, 2 * inch)]
#         style = styles["Normal"]
#         style.fontName = "Courier"
#         style.fontSize = 9
#         textString = textString.replace("\n", "<br/>")
#         p = Paragraph(textString, style)
#         Story.append(p)
#         Story.append(Spacer(1, 0.2 * inch))
#         doc.build(Story, onFirstPage=firstPage)

#     def main(self):
#         print(self.objectDict)
#         dirName = "applicationForm/dataPreparation/results/" + self.sessionID + "/docs/"
#         self.createDirectory(dirName)

#         self.documentFirstPage(self.objectDict[0]['text'])
#         self.documentRestPages(self.objectDict[0]['text'])
#         self.printDoc(filename, textString, firstPage, laterPage=None)