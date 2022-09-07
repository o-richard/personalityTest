from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('client_text', views.client_text, name="client_text"),
    path('get_questionnaire', views.get_questionnaire, name="get_questionnaire"),
    path('client_questionnaire', views.client_questionnaire, name="client_questionnaire"),
]
