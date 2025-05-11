# School Vaccination Portal

A full-stack web application to manage student records and school vaccination drives.

## Features

- Add, edit, and delete student records
- Bulk upload students via CSV
- Create and manage vaccination drives
- Prevent overlapping and late-scheduled drives
- Mark and track student vaccination status
- Search, filter, and paginate student data
- View summary statistics on dashboard
- Swagger-based API documentation

## Tech Stack

- **Frontend:** React.js, Bootstrap
- **Backend:** ASP.NET Core Web API
- **Database:** Microsoft SQL Server
- **ORM:** Entity Framework Core

## Backend Setup (ASP.NET Core)

1. **Clone the repository**

   ```bash
   git clone https://github.com/tooba-nawaz/vaccination-portal-backend.git
   cd vaccination-portal-backend
   Configure database
   ```

In appsettings.json, update:

json
Copy
Edit
"ConnectionStrings": {
"DefaultConnection": "Server=TOOBA;Database=vaccinationportaltooba;Trusted_Connection=True;TrustServerCertificate=True;"
}
Apply migrations and run

bash
Copy
Edit
dotnet ef database update
dotnet run
Access API documentation

Navigate to:
https://localhost:7211/swagger/index.html

Frontend Setup (React.js)
Clone the repository

bash
Copy
Edit
git clone https://github.com/tooba-nawaz/vaccination-portal-frontend.git
cd vaccination-portal-frontend
Install dependencies

bash
Copy
Edit
npm install
Create environment config

In a .env file:

env
Copy
Edit
REACT_APP_API_URL=https://localhost:7211/api
Start the app

bash
Copy
Edit
npm run dev
App will be available at:
http://localhost:5173/
# vaccination-portal-frontend-
