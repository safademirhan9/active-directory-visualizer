# Active Directory Visualization Application

## Project Description

This project is designed to visualize objects within an Active Directory (AD) environment, capture various attributes of these objects, and store them in a Neo4j database. It consists of three main components:

**1. Core (C#):** Scans the AD environment for User, Computer, and Group objects, retrieves their attributes, and stores the data in a Neo4j database.
**2. Backend (Python/Django):** Provides a REST API to interact with the data stored in Neo4j.
**3. Frontend (React):** Visualizes the data retrieved from the backend API.

## Table of Contents

- [Prerequisites](#Prerequisites)
- [Setting up Active Directory](#Setting-up-Active-Directory)
- [Setting up Neo4j](#Setting-up-Neo4j)
- [Core (C#) Setup](<#Core-(C#)-Setup>)
- [Backend (Python/Django) Setup](<#Backend-(Python/Django)-Setup>)
- [Frontend (React) Setup](<#Frontend-(React)-Setup>)
- [Running the Application](#Running-the-Application)
- [Notes](#Notes)

## Prerequisites

- Windows Server with Active Directory Domain Services role installed.
- Neo4j database.
- .NET SDK.
- Visual Studio.
- Python and Django.
- Node.js and npm.

## Setting up Active Directory

**1. Install Windows Server:** Set up a Windows Server (you can use a virtual machine using VirtualBox).

**2. Install Active Directory Domain Services (AD DS):**

- Open Server Manager.
- Select Add roles and features.
- Choose Role-based or feature-based installation.
- Select your server from the server pool.
- Check Active Directory Domain Services.
- Follow the wizard to complete the installation and promote the server to a domain controller.

**3. Create Test Data:**

- Open Active Directory Users and Computers.
- Create test users under the Users container.
- Create test computers under the Computers container.
- Create groups under the Users container (or create a new Organizational Unit).

## Setting up Neo4j

**1. Install Neo4j:**

- Download Neo4j from the official website.
- Follow the installation instructions for your operating system.
- Start the Neo4j server.

**2. Set up Neo4j Database:**

- Open the Neo4j browser at `http://localhost:7474`.
- Log in with the default credentials (neo4j / neo4j) and change the password.
- Create constraints and indexes as necessary.

## Core (C#) Setup

**1. Install .NET SDK:**

- Download and install the .NET SDK from the official website.

**2. Install Visual Studio:**

- Download and install Visual Studio from the official website.
- During the installation, select the following workloads:
  - .NET Desktop Development
  - ASP.NET and web development

**3. Install NuGet Packages:**

- Open your C# project in Visual Studio.
- Open the NuGet Package Manager and install the following packages:
  - `System.DirectoryServices`
  - `System.DirectoryServices.AccountManagement`
  - `Neo4jClient`

**4. Write the C# Code:**

- Create a console application to connect to AD, retrieve objects, and store them in Neo4j.
- Example code is provided in the previous steps.

## Backend (Python/Django) Setup

**1. Install Python:**

- Download and install Python from the official website.

**2. Install Django:**

- Open a terminal and run:

  ```sh
  pip install django djangorestframework neomodel
  ```

**3. Create a Django Project:**

- Navigate to your desired directory and run:

  ```sh
  django-admin startproject advisualization
  cd advisualization
  django-admin startapp api
  ```

**4. Configure Django:**

- Update the `settings.py` file to include `rest_framework` and `neomodel`.
- Configure the Neo4j connection in your `settings.py`:
  ```python
  NEOMODEL_NEO4J_BOLT_URL = 'bolt://neo4j:password@localhost:7687'
  ```

**5. Create Models and Serializers:**

- Define models for User, Computer, and Group objects.
- Create serializers to handle JSON conversion.

**6. Create API Views and URLs:**

- Define API views to handle requests.
- Create URL patterns to map to these views.

## Frontend (React) Setup

**1. Install Node.js and npm:**

- Download and install Node.js from the official website.

**2. Create a Vite Project:**

- Open a terminal and run:

  ```sh
      npm create vite@latest ad-visualization --template react
      cd ad-visualization
      npm install
  ```

**3. Install Required Packages:**

- Install Axios and React Query:

  ```sh
  npm install axios react-query
  ```

**4. Create Components:**

- Create components for listing and displaying details of Users, Computers, and Groups.

**5. Fetch Data from Backend:**

- Use Axios to fetch data from the Django REST API.
- Use React Query to manage server state and caching.

## Running the Application

**1. Start Neo4j:**

- Ensure the Neo4j server is running.

**2. Run the Core (C#) Application:**

- Open Visual Studio and run the C# console application to populate the Neo4j database with AD data.

**3. Run the Django Backend:**

- Navigate to your Django project directory and run:

  ```sh
  python manage.py runserver
  ```

**4. Run the React Frontend:**

- Navigate to your React project directory and run:
  ```sh
  npm run dev
  ```
