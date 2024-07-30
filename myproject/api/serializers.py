from rest_framework import serializers
from .models import User, Computer, Group

class UserSerializer(serializers.Serializer):
    distinguished_name = serializers.CharField(max_length=255)
    object_sid = serializers.CharField(max_length=255)
    service_principal_name = serializers.CharField(max_length=255)
    nt_security_descriptor = serializers.CharField(max_length=255)
    when_created = serializers.DateTimeField()

    def create(self, validated_data):
        return User(**validated_data).save()

class ComputerSerializer(serializers.Serializer):
    distinguished_name = serializers.CharField(max_length=255)
    object_sid = serializers.CharField(max_length=255)
    service_principal_name = serializers.CharField(max_length=255)
    nt_security_descriptor = serializers.CharField(max_length=255)
    when_created = serializers.DateTimeField()
    
    def create(self, validated_data):
        return Computer(**validated_data).save()

class GroupSerializer(serializers.Serializer):
    distinguished_name = serializers.CharField(max_length=255)
    object_sid = serializers.CharField(max_length=255)
    service_principal_name = serializers.CharField(max_length=255)
    nt_security_descriptor = serializers.CharField(max_length=255)
    when_created = serializers.DateTimeField()

    def create(self, validated_data):
        return Group(**validated_data).save()

