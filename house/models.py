from django.db import models
from django.utils import timezone

from core.models import User

class House(models.Model):
	name = models.CharField(max_length=100, verbose_name='Nome', null=False, blank=False)
	creator = models.ForeignKey(User, verbose_name='Criador', null=False, blank=False, related_name='+')
	crated_by = models.DateTimeField(default=timezone.now)
	server = models.CharField(max_length=100, verbose_name='Servidor', null=False, blank=False)
	user = models.CharField(max_length=100, verbose_name='Usuário', null=False, blank=False)
	password = models.CharField(max_length=100, verbose_name='Senha', null=False, blank=False)
	portws = models.CharField(max_length=100, verbose_name='Porta para websocket', null=False, blank=False)
	participants = models.ManyToManyField(User, verbose_name='Participantes', blank=True)
	image = models.FileField(upload_to='house/', null=True, blank=True)

	def __str__(self):
		return self.name

class Message(models.Model):
	text = models.CharField(max_length=100, verbose_name='Mensagem', null=False, blank=False)
	creator = models.ForeignKey(User, verbose_name='Criador', null=False, blank=False, related_name='+')
	house = models.ForeignKey(House, verbose_name='Ambiente', null=False, blank=False, related_name='+')
	crated_by = models.DateTimeField(default=timezone.now)
	is_message = models.BooleanField(default=False)
	
	def __str__(self):
		return self.creator.username + ' disse ' + self.text + ' em ' + self.house.name