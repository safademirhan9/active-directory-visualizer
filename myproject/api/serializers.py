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

    def update(self, instance, validated_data):
        instance.object_sid = validated_data.get("object_sid", instance.object_sid)
        instance.service_principal_name = validated_data.get(
            "service_principal_name", instance.service_principal_name
        )
        instance.nt_security_descriptor = validated_data.get(
            "nt_security_descriptor", instance.nt_security_descriptor
        )
        instance.when_created = validated_data.get(
            "when_created", instance.when_created
        )
        instance.save()
        return instance


class ComputerSerializer(serializers.Serializer):
    distinguished_name = serializers.CharField(max_length=255)
    object_sid = serializers.CharField(max_length=255)
    service_principal_name = serializers.CharField(max_length=255)
    nt_security_descriptor = serializers.CharField(max_length=255)
    when_created = serializers.DateTimeField()

    def create(self, validated_data):
        return Computer(**validated_data).save()

    def update(self, instance, validated_data):
        instance.object_sid = validated_data.get("object_sid", instance.object_sid)
        instance.service_principal_name = validated_data.get(
            "service_principal_name", instance.service_principal_name
        )
        instance.nt_security_descriptor = validated_data.get(
            "nt_security_descriptor", instance.nt_security_descriptor
        )
        instance.when_created = validated_data.get(
            "when_created", instance.when_created
        )
        instance.save()
        return instance


class GroupSerializer(serializers.Serializer):
    distinguished_name = serializers.CharField(max_length=255)
    object_sid = serializers.CharField(max_length=255)
    service_principal_name = serializers.CharField(max_length=255)
    nt_security_descriptor = serializers.CharField(max_length=255)
    when_created = serializers.DateTimeField()

    def create(self, validated_data):
        return Group(**validated_data).save()

    def update(self, instance, validated_data):
        instance.object_sid = validated_data.get("object_sid", instance.object_sid)
        instance.service_principal_name = validated_data.get(
            "service_principal_name", instance.service_principal_name
        )
        instance.nt_security_descriptor = validated_data.get(
            "nt_security_descriptor", instance.nt_security_descriptor
        )
        instance.when_created = validated_data.get(
            "when_created", instance.when_created
        )
        instance.save()
        return instance
