<h1>University management server</h1>

<p>This is the documentation for the Authentication Service component of the University Management System. The Authentication Service provides authentication and authorization functionalities for the three main roles in the system: Admin, Student, and Faculty. It is built using TypeScript, Express.js, Zod validation, and MongoDB.</p>

<h2>Functional Requirements</h2>
<h2>Student</h2>
<ul>
<li>Student can login and log out.</li>
<li>Student can manage and update their profile.</li>
<li>Student can update certain fields.</li>
</ul>

<h2>Admin</h2>
<ul>
<li>Admin can log in and log out.</li>
<li>Admin can manage and update their profile.</li>
<li>Admin can only update certain fields.</li>
<li>Admin can manage user accounts:
Change Password</li>
</ul>

<h2>Faculty</h2>
<ul>
<li>Faculty can log in and log out.</li>
<li>Faculty can manage and update their profile.</li>
<li>Faculty can only update certain fields.<li>
</ul>

#API Endpoints
#User

<ul>
<li>POST /users/create-student</li>
<li>POST /users/create-faculty</li>
<li>POST /users/create-admin</li>
</ul>

#Student

<ul>
<li>GET /students</li>
<li>GET /students?searchTerm=fr797</li>
<li>GET /students?page=1&limit=10&sortBy=gender&sortOrder=asc</li>
<li>GET /students/:id</li>
<li>PATCH /students/:id</li>
<li>DELETE /students/:id</li>
</ul>

#Faculty

<ul>
<li>GET /faculties</li>
<li>GET /faculties?searchTerm=john</li>
<li>GET /faculties?page=1&limit=10&sortBy=gender&sortOrder=asc</li>
<li>GET /faculties/:id</li>
<li>PATCH /faculties/:id</li>
<li>
DELETE /faculties/:id</li>
</ul>

#Admin

<ul>
<li>GET /admins</li>
<li>GET /admins?searchTerm=us88</li>
<li>GET /admins?page=1&limit=10&sortBy=gender&sortOrder=asc</li>
<li>GET /admins/:id</li>
<li>PATCH /admins/:id</li>
<li>DELETE /admins/:id</li>

</ul>
#Academic Semester
<ul>
<li>POST /academic-semesters/create-semester</li>
<li>GET /academic-semesters</li>
<li>GET /academic-semesters?searchTerm=fal</li>
<li>GET /academic-semesters?page=1&limit=10&sortBy=year&sortOrder=asc</li>
<li>GET /academic-semesters/:id</li>
<li>PATCH /academic-semesters/:id</li>
<li>DELETE /academic-semesters/:id</li>
</ul>

#Academic Department

<ul>
<li>POST /academic-departments/create-department</li>
<li>GET /academic-departments</li>
<li>GET /academic-departments?searchTerm=math</li>
<li>GET /academic-departments?page=1&limit=10&sortBy=title&sortOrder=asc</li>
<li>GET /academic-departments/:id</li>
<li>PATCH /academic-departments/:id</li>
<li>DELETE /academic-departments/:id</li>
</ul>

#Academic Faculty

<ul>
<li>POST /academic-faculties/create-faculty</li>
<li>GET /academic-faculties</li>
<li>GET /academic-faculties?searchTerm=com</li>
<li>GET /academic-faculties?page=1&limit=10&sortBy=title&sortOrder=asc</li>
<li>
GET /academic-faculties/:id</li>
<li>PATCH /academic-faculties/:id</li>
<li>DELETE /academic-faculties/:id</li>

</ul>

#Authentication

<ul>
<li>POST /auth/login</li>
<li>POST /auth/change-password</li>
<li>POST /auth/refresh-token</li>
</ul>
