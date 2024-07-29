from neomodel import StructuredNode, StringProperty, DateTimeProperty, RelationshipTo

class User(StructuredNode):
    distinguished_name = StringProperty(unique_index=True)
    object_sid = StringProperty()
    service_principal_name = StringProperty()
    nt_security_descriptor = StringProperty()
    when_created = DateTimeProperty()
    # Define a relationship to the Group node
    member_of = RelationshipTo('Group', 'MEMBER_OF')

class Computer(StructuredNode):
    distinguished_name = StringProperty(unique_index=True)
    object_sid = StringProperty()
    service_principal_name = StringProperty()
    nt_security_descriptor = StringProperty()
    when_created = DateTimeProperty()

class Group(StructuredNode):
    distinguished_name = StringProperty(unique_index=True)
    object_sid = StringProperty()
    service_principal_name = StringProperty()
    nt_security_descriptor = StringProperty()
    when_created = DateTimeProperty()
    # Define a relationship to the User node
    members = RelationshipFrom('User', 'MEMBER_OF')