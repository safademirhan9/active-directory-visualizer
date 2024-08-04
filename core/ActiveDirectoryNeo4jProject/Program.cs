using System;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using Neo4jClient;

namespace ADNeo4jIntegration
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Connecting to Active Directory...");

            string domainController = "192.168.1.57";
            // string domain = "forestall.local";
            string username = "admin@forestall.local";
            string password = "Forestall123";
            string db_password = "forestall123";
            string container = "DC=forestall,DC=local";

            // Connect to the domain context with explicit domain details
            using (PrincipalContext context = new PrincipalContext(ContextType.Domain, domainController, container, username, password))
            {
                // Define a user principal object to search for users
                UserPrincipal userPrincipal = new UserPrincipal(context);
                PrincipalSearcher searcher = new PrincipalSearcher(userPrincipal);

                // Connect to Neo4j
                var client = new BoltGraphClient(new Uri("bolt://localhost:7687"), "neo4j", db_password);
                client.ConnectAsync().Wait();
                Console.WriteLine("Connected to Neo4j.");

                // Iterate over search results
                foreach (var result in searcher.FindAll())
                {
                    DirectoryEntry de = result.GetUnderlyingObject() as DirectoryEntry;
                    string name = de.Properties["name"].Value.ToString();
                    string distinguishedName = de.Properties["distinguishedName"].Value.ToString();
                    string objectSid = de.Properties["objectSid"]?.Value.ToString();
                    string ntSecurityDescriptor = de.Properties["ntSecurityDescriptor"]?.Value.ToString();
                    // string servicePrincipalName = de.Properties["servicePrincipalName"]?.Value.ToString();

                    Console.WriteLine($"Name: {name}");
                    Console.WriteLine($"Distinguished Name: {distinguishedName}");

                    // Create a new user node in Neo4j
                    var newUser = new
                    {
                        distinguished_name = distinguishedName,
                        object_sid = objectSid,
                        // service_principal_name = servicePrincipalName,
                        nt_security_descriptor = ntSecurityDescriptor
                    };

                    client.Cypher
                       .Merge("(u:User {distinguished_name: $DistinguishedName})")
                       .OnCreate()
                       .Set("u = $newUser")
                       .WithParam("newUser", newUser)
                       .WithParam("DistinguishedName", distinguishedName)  
                       .ExecuteWithoutResultsAsync()
                       .Wait();

                    Console.WriteLine("User added to Neo4j.");
                }

                // Define a computer principal object to search for computers
                ComputerPrincipal computerPrincipal = new ComputerPrincipal(context);
                PrincipalSearcher computerSearcher = new PrincipalSearcher(computerPrincipal);

                foreach (var result in computerSearcher.FindAll())
                {
                    DirectoryEntry de = result.GetUnderlyingObject() as DirectoryEntry;
                    string name = de.Properties["name"].Value.ToString();
                    string distinguishedName = de.Properties["distinguishedName"].Value.ToString();
                    string objectSid = de.Properties["objectSid"]?.Value.ToString();
                    string ntSecurityDescriptor = de.Properties["ntSecurityDescriptor"]?.Value.ToString();
                    // string servicePrincipalName = de.Properties["servicePrincipalName"]?.Value.ToString();

                    Console.WriteLine($"Name: {name}");
                    Console.WriteLine($"Distinguished Name: {distinguishedName}");

                    // Create a new computer node in Neo4j
                    var newComputer = new
                    {
                        Name = name,
                        distinguished_name = distinguishedName,
                        object_sid = objectSid,
                        // service_principal_name = servicePrincipalName,
                        nt_security_descriptor = ntSecurityDescriptor
                    };

                    client.Cypher
                        .Merge("(c:Computer {distinguished_name: $DistinguishedName})")
                        .OnCreate()
                        .Set("c = $newComputer")
                        .WithParam("newComputer", newComputer)
                        .WithParam("DistinguishedName", distinguishedName)
                        .ExecuteWithoutResultsAsync()
                        .Wait();

                    Console.WriteLine("Computer added to Neo4j.");
                }

                // Define a group principal object to search for groups
                GroupPrincipal groupPrincipal = new GroupPrincipal(context);
                PrincipalSearcher groupSearcher = new PrincipalSearcher(groupPrincipal);

                foreach (var result in groupSearcher.FindAll())
                {
                    DirectoryEntry de = result.GetUnderlyingObject() as DirectoryEntry;
                    string name = de.Properties["name"].Value.ToString();
                    string distinguishedName = de.Properties["distinguishedName"].Value.ToString();
                    string objectSid = de.Properties["objectSid"]?.Value.ToString();
                    string ntSecurityDescriptor = de.Properties["ntSecurityDescriptor"]?.Value.ToString();
                    //string servicePrincipalName = de.Properties["servicePrincipalName"]?.Value.ToString();

                    Console.WriteLine($"Name: {name}");
                    Console.WriteLine($"Distinguished Name: {distinguishedName}");

                    // Create a new group node in Neo4j
                    var newGroup = new
                    {
                        Name = name,
                        distinguished_name = distinguishedName,
                        object_sid = objectSid,
                        //service_principal_name = servicePrincipalName,
                        nt_security_descriptor = ntSecurityDescriptor
                    };

                    client.Cypher
                        .Merge("(g:Group {DistinguishedName: $DistinguishedName})")
                        .OnCreate()
                        .Set("g = $newGroup")
                        .WithParam("newGroup", newGroup)
                        .WithParam("DistinguishedName", distinguishedName)
                        .ExecuteWithoutResultsAsync()
                        .Wait();

                    Console.WriteLine("Group added to Neo4j.");
                }

            }

            Console.WriteLine("Active Directory users processed successfully.");
        }
    }
}
