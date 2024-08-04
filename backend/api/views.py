from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from .models import User, Computer, Group
from .serializers import UserSerializer, ComputerSerializer, GroupSerializer


class UserList(APIView):
    def get(self, request):
        paginator = PageNumberPagination()
        users = User.nodes.all()
        result_page = paginator.paginate_queryset(users, request)
        serializer = UserSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    def get(self, request, distinguished_name):
        try:
            user = User.nodes.get(distinguished_name=distinguished_name)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, distinguished_name):
        try:
            user = User.nodes.get(distinguished_name=distinguished_name)
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, distinguished_name):
        try:
            user = User.nodes.get(distinguished_name=distinguished_name)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ComputerList(APIView):
    def get(self, request):
        paginator = PageNumberPagination()
        computers = Computer.nodes.all()
        result_page = paginator.paginate_queryset(computers, request)
        serializer = ComputerSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = ComputerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComputerDetail(APIView):
    def get(self, request, distinguished_name):
        try:
            computer = Computer.nodes.get(distinguished_name=distinguished_name)
            serializer = ComputerSerializer(computer)
            return Response(serializer.data)
        except Computer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, distinguished_name):
        try:
            computer = Computer.nodes.get(distinguished_name=distinguished_name)
            serializer = ComputerSerializer(computer, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Computer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, distinguished_name):
        try:
            computer = Computer.nodes.get(distinguished_name=distinguished_name)
            computer.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Computer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class GroupList(APIView):
    def get(self, request):
        paginator = PageNumberPagination()
        groups = Group.nodes.all()
        result_page = paginator.paginate_queryset(groups, request)
        serializer = GroupSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GroupDetail(APIView):
    def get(self, request, distinguished_name):
        try:
            group = Group.nodes.get(distinguished_name=distinguished_name)
            serializer = GroupSerializer(group)
            return Response(serializer.data)
        except Group.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, distinguished_name):
        try:
            group = Group.nodes.get(distinguished_name=distinguished_name)
            serializer = GroupSerializer(group, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Group.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, distinguished_name):
        try:
            group = Group.nodes.get(distinguished_name=distinguished_name)
            group.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Group.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
