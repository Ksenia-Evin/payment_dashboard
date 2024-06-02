# Rental Payment Dashboard

This project builds a dashboard app that visualizes rental payments over time. The data represents rental payments from tenants (stores) for a single property owned by the client. 
The client is interested in seeing the total rental income for this property and the amount each tenant is paying. The dashboard allows users to filter by date range and view the total and individual tenant rental payments graphically.

## Architecture

### Backend

The backend is built with Python using Flask. It includes routes to fetch datasets from a JSON file and helper functions to return the data in an appropriate structure for the frontend.

### Frontend
The frontend is built using React and Material UI. It includes components to filter data, display payment charts, and show total and individual tenant rental payments.

#### Running the Backend

1. Navigate to the backend directory.
2. Install the necessary dependencies using `pip install -r requirements.txt`.
3. Start the backend server:
   ```bash
   python server.py

#### Running the Frontend
1. Navigate to the frontend directory.
2. Install the necessary dependencies using:
  ```bash
  npm install
  ```
3. Start the frontend server:
  ```bash
  npm start
