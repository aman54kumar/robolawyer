from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import A4
from reportlab.rl_config import defaultPageSize
from PyPDF2 import PdfFileReader, PdfFileWriter, PdfFileMerger
import os
import os.path


class PrepareDocsPDF:
    def __init__(self, sessionID, objectDict):
        self.sessionID = sessionID
        self.objectDict = objectDict

    def createDirectory():
        # code to create directory/file (Decide it) and name it as per the need
        return

    def createProperFileName():
        # code to create proper file names according to sessionID and document description
        return

    def makePDF():
        # code to make pdf of corresponding documents.
        return

    def documentFirstPage():
        # code to make first page of documents.
        return

    def documentRestPages():
        # code to make remaining pages of documents.
        return

    def documentSeparatorPages():
        # code to make separator pages for documents.
        return

    def main(self):
        print(self.objectDict)
