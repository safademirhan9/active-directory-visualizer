from neomodel import StructuredNode, StringProperty, config

config.DATABASE_URL = 'bolt://neo4j:forestall123@localhost:7687'  

class TestNode(StructuredNode):
    name = StringProperty(unique_index=True)

if __name__ == '__main__':
    node = TestNode(name="Hello, Neo4j").save()
    print("Node saved with ID:", node.element_id)
