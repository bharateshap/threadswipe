FULL STACK APPLICATION - README (React + Node.js + Python + SQL)

PROJECT STRUCTURE:

project-root/
│
├── backend/
│   ├── login.js
│   ├── dbconfig.js
│   ├── admin.js
│   ├── router.js
│   ├── index.js
│   ├── server.js
│   └── services/
│       └── asset.js
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Admin.js
│   │   │   ├── User.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   │       └── main.css
│
├── python/
│   └── script.py
│
├── database/
│   └── schema.sql
│
├── package.json
├── requirements.txt
└── README.txt


PREREQUISITES:

- Node.js (v16 or above)
- Python (v3.8 or above)
- MySQL or compatible SQL database
- npm (Node Package Manager)
- pip (Python Package Manager)


INSTALLATION & SETUP:

1. Clone the Repository:
   git clone https://github.com/bharateshap/threadswipe.git
   cd your-repo-name

2. Backend Setup:
   cd backend
   npm install

3. Frontend Setup:
   cd ../frontend
   npm install

4. Configure Database:
   - Create a new MySQL database
   - Run the SQL file located at database/schema.sql
   - Update backend/dbconfig.js with your DB credentials:
       module.exports = {
         host: "localhost",
         user: "yourUsername",
         password: "yourPassword",
         database: "yourDatabase"
       };

5. Python Setup:
   cd ../python
   pip install -r requirements.txt


RUNNING THE APPLICATION:

1. Start the Backend:
   cd backend
   node server.js

2. Start the React Frontend:
   cd ../frontend
   npm start

3. Run Python Script:
   cd ../python
   python script.py

4. Access Application:
   Open browser and go to: http://localhost:3000


FEATURES INCLUDED:

- Login System: login.js and Login page
- Admin Panel: Admin.js and admin.js
- User Dashboard: User.js
- Router Handling: router.js
- Database Configuration: dbconfig.js and schema.sql
- Asset Handling: asset.js under services/
- Reusable Header and Footer components
- Styled with main.css
- Python script for AI/ML or data processing tasks


TROUBLESHOOTING:

- Ensure MySQL is running and accessible
- Confirm backend server is running on port 5000 or change port as needed
- Check browser console and terminal logs for error messages
- Use Postman or Insomnia to test backend endpoints
