from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^login/$', views.login_page, name='login'),
	url(r'^autentica/$', views.entrar),
	url(r'^registra/$', views.register),
	url(r'^logout/$', views.make_logout),
	url(r'^deletaconta/$', views.deletaconta),
	url(r'^edit_profile/$', views.edit_profile),
	url(r'^pdf/$', views.html_to_pdf_view)
]
