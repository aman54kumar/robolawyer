from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.rl_config import defaultPageSize
from reportlab.lib.units import inch


class PrepareDocsPDF:
    def __init__(self, objectDict, dirname, docName, title, pageinfo, pageN):
        self.objectDict = objectDict
        self.dirname = dirname
        self.PAGE_HEIGHT = defaultPageSize[1]
        self.PAGE_WIDTH = defaultPageSize[0]
        self.Title = title
        self.pageinfo = pageinfo
        self.docName = docName
        self.page = pageN

    def myFirstPage(self, canvas, doc):
        canvas.saveState()
        canvas.setFont("Times-Bold", 16)
        canvas.drawCentredString(
            self.PAGE_WIDTH / 2.0, self.PAGE_HEIGHT - 108, self.Title
        )
        canvas.setFont("Times-Roman", 9)
        canvas.drawString(
            1 * inch,
            0.75 * inch,
            "Page %d / %s" % (doc.page + self.page, self.pageinfo),
        )
        canvas.restoreState()

    def myLaterPages(self, canvas, doc):
        canvas.saveState()
        canvas.setFont("Times-Roman", 9)
        canvas.drawString(
            1 * inch,
            0.75 * inch,
            "Page %d / %s" % (doc.page + self.page, self.pageinfo),
        )
        canvas.restoreState()

    def go(self):
        styles = getSampleStyleSheet()
        doc = SimpleDocTemplate(self.dirname + self.docName)
        Story = [Spacer(1, 2 * inch)]
        style = styles["Normal"]
        style.fontName = "Courier"
        style.fontSize = 9
        textString = self.objectDict["text"].replace("\n", "<br/>")
        p = Paragraph(textString, style)
        Story.append(p)
        Story.append(Spacer(1, 0.2 * inch))
        doc.build(Story, onFirstPage=self.myFirstPage, onLaterPages=self.myLaterPages)
        return doc.page

    # def getObjectDict(self):
    #     print(self.objectDict)

    def main(self):
        # self.getObjectDict()
        pageNumber = self.go()
        return pageNumber
