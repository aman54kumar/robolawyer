from django.urls import path
from .views import (
    FormPageView,
    formProcessing,
    feedback,
    download,
    error_500,
    pdf_email,
    docObject,
)
from django.conf.urls import handler400, handler500

urlpatterns = [
    path("", FormPageView, name="form"),
    path("submit", formProcessing, name="formProcessing"),
    path("feedback", feedback, name="feedback"),
    path("download", download, name="download"),
    path("email", pdf_email, name="pdf_email"),
    path("docObject", docObject, name="docObject"),
]

# handler404 =
# handler500 = 'applicationForm.views.error_500'
