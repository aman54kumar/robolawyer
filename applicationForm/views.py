# from posixpath import dirname
from django.shortcuts import render
from django.views.generic import TemplateView
from django.template import RequestContext
from django.http import HttpResponse, Http404, response
from django.template.loader import render_to_string
from .dataPreparation.prepareResult import PrepareResult
from .dataPreparation.prepareDocsPDF import PrepareDocsPDF
from .dataPreparation.inputMethodforWM import bookmarkPageInputs
from django.urls import reverse
from django.conf import settings
from django.core.mail import send_mail
from django.core.mail import EmailMessage
import json
import os
import logging
import uuid
import shutil

logger = logging.getLogger(__name__)
logger.info('Logging works!')
sessionID = uuid.uuid4().hex


# class FormPageView(TemplateView):
#     context = {"form_page": "active"}
#     template_name = "applicationForm/form.html"
def FormPageView(request):
    context = {"form_page": "active"}
    return render(request, 'applicationForm/form.html', context)


def formProcessing(request):

    spclReplies = []
    # filepath = os.path.join(
    #     settings.BASE_DIR, 'applicationForm/dataPreparation/results/' +
    #     sessionID + '/finalPage/finalForm.pdf')
    if request.method == 'POST':
        form_dict = request.POST
        print(form_dict)
        spclReplies.append(request.POST.getlist('page1[involvedStates]'))
        pagesName = [
            'page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7',
            'page8', 'page9', 'page10'
        ]
        pages = {}
        for page in pagesName:
            pages[page] = dict((key, value)
                               for key, value in form_dict.items()
                               if page in key.lower())
        prepareResult = PrepareResult(pages, sessionID, spclReplies)
        prepareResult.main()
        logger.warning("Your log message is here")

    # path_to_file = filepath
    # return FileResponse(open(filepath, 'rb'), content_type='application/pdf')
    return render(request, 'applicationForm/finalPage.html')


def feedback(request):
    if request.method == 'POST':
        pageNo = request.POST.get('pageNo')
        legalTrained = request.POST.get('legalExp')
        suggestion = request.POST.get('suggestion')
        subject = "suggestionEmail"
        message = "1. Page No. - " + str(pageNo) + "\n2. Legal Trained - " + \
            str(legalTrained) + "\n3. Suggestion - " + str(suggestion)
        from_user = settings.EMAIL_HOST_USER
        to = ["contact@justbot.org"]
        send_mail(subject, message, from_user, to, fail_silently=False)
        return HttpResponse('We have received your feedback.')
    else:
        return HttpResponse(
            'Our developers are working to resolve this issue. Please try after sometime.'
        )


def download(request):
    file_path = os.path.join(
        settings.BASE_DIR, 'applicationForm/dataPreparation/results/' +
        sessionID + '/finalPage/Application form to the ECtHR.pdf')
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/pdf")
            response[
                'Content-Disposition'] = 'attachment; filename="Application form to the ECtHR.pdf"'
            return response
    raise Http404


def pdf_email(request):
    file_path = os.path.join(
        settings.BASE_DIR, 'applicationForm/dataPreparation/results/' +
        sessionID + '/finalPage/Application form to the ECtHR.pdf')
    if request.method == 'POST':
        emailInput = request.POST.get('emailInput')
        print(emailInput)
        subject = "Your application to the European Court of Human Rights is here"
        from_user = settings.EMAIL_HOST_USER
        to = [emailInput]
        body = "Hello, <br /> <br /> Thank you for using Just Bot to fill in your application form to the European Court of Human Rights. <br /><br />You can find your application in the attachment. Together you will find your separator pages for the documents you need to attach to your application, as well as the Anonymity Request Form and the document containing your Supplementary statement expanding on the facts if you used this form to generate them. <br /><br /> Do not forget to date and sign the application form before mailing it to the Court! <br /> <br /> Here is a short checklist for you: <br /> ❏ Have you dated and signed the printed application form? (you must always date and sign page 13 of your printed form, as well as either page 3 or page 4, depending on what type of applicant you are and whether you have someone else representing you); <br />❏ Have you made copies of all documents that you are going to attach to the application? <br />❏ Have you arranged the documents chronologically, from the newest document to the oldest? You can make use of the separator pages generated together with the application form to guide you in arranging the documents. <br />❏ Have you numbered the pages of the attached documents consecutively? <br />❏ Have you added all documents to a folder and put them in an envelope with the application form? <br /><br /><br />If the answer to each question above is yes, then you are ready to go! The address of the Court is: <br /><br /> The Registrar <br /> European Court of Human Rights <br /> Council of Europe <br /> 67075 STRASBOURG CEDEX <br /> FRANCE <br /><br /> Best of luck with your application and don’t forget to keep the Court informed of any changes of address or other events relevant to your application! <br /><br /> The Just Bot team."
        message = EmailMessage(subject=subject,
                               body=body,
                               from_email=from_user,
                               to=to)
        # send_mail(subject, message, from_user, to, fail_silently=False)
        message.attach_file(file_path)
        message.content_subtype = "html"
        message.send()
        return HttpResponse('The email was sent')
    else:
        return HttpResponse(
            'Our developers are working to resolve this issue. Please try after sometime.'
        )


# def error_500(request):
#     data = {}
#     return render(request, 'applicationForm/errors/500.html', data)


def error_500(request):
    response = render(request, 'errors/500.html')
    response.status_code = 500

    return response


def createDirectory(directoryName):
    # code to create directory/file (Decide it) and name it as per the need
    if not os.path.exists(directoryName):
        os.makedirs(directoryName)
    else:
        shutil.rmtree(directoryName)
        os.makedirs(directoryName)
    return


def docObject(request):
    if request.method == 'POST':
        objectDict = json.loads(request.body)
        dirname = "applicationForm/dataPreparation/results/" + sessionID + "/docs/"
        createDirectory(dirname)
        pageNList = [13]
        for data in objectDict:
            docName = objectDict.index(data)
            docsPDF = PrepareDocsPDF(data, dirname, str(docName), data['title'], data['title'], sum(pageNList))
            pageReturned = docsPDF.main()
            pageNList.append(pageReturned)
    return HttpResponse('done')
