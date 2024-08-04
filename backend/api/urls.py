from django.urls import path
from .views import (
    UserList,
    UserDetail,
    ComputerList,
    ComputerDetail,
    GroupList,
    GroupDetail,
)

urlpatterns = [
    path("users/", UserList.as_view(), name="user_list"),
    path("users/<str:distinguished_name>/", UserDetail.as_view(), name="user_detail"),
    path("computers/", ComputerList.as_view(), name="computer_list"),
    path(
        "computers/<str:distinguished_name>/",
        ComputerDetail.as_view(),
        name="computer_detail",
    ),
    path("groups/", GroupList.as_view(), name="group_list"),
    path(
        "groups/<str:distinguished_name>/", GroupDetail.as_view(), name="group_detail"
    ),
]
