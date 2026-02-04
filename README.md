# Clockify Time Tracker Dashboard

This project is a simple dashboard built using the **Clockify API**.
It allows users to enter their Clockify API key, view their workspaces, see time entries, filter by date, and calculate total tracked time.

## Features

* Enter and use a Clockify Personal API Key
* Fetch and display user workspaces
* View time entries for selected workspaces
* Filter time entries by date range
* Calculate and display total tracked time
* Clean and easy-to-use interface

## Technologies Used

* Frontend: JavaScript / TypeScript (React or Next.js)
* Styling: TailwindCSS / Material UI (based on implementation)
* API: Clockify REST API

## Getting Started

### Clone the repository

```bash
git clone https://github.com/MohammadMosavat/clockify-dashboard.git
cd clockify-dashboard
```

### Install dependencies

```bash
npm install
# or
yarn install
```

### Run the project

```bash
npm run dev
# or
yarn dev
```

The application will be available at:

```
http://localhost:3000
```

## Clockify API Key

To use this app, you need a **Clockify Personal API Key**.

1. Go to [https://clockify.me/user/settings](https://clockify.me/user/settings)
2. Copy your Personal API Key
3. Paste it into the app when prompted

⚠️ Do not expose your API key publicly or commit it to the repository.

## How It Works

1. User enters their Clockify API key
2. The app fetches available workspaces
3. User selects a workspace
4. Time entries are fetched from Clockify
5. User applies date filters
6. Total tracked time is calculated and displayed

## API Endpoints Used

* `GET /workspaces`
* `GET /workspaces/{workspaceId}/time-entries`
* `GET /user`

## Date Filtering

* Filter time entries by start date and end date
* Total time updates automatically based on selected dates

## Total Time Calculation

* Time entries are summed on the client side
* Supports hours, minutes, and seconds
* Updates dynamically when filters change

## Security Notes

* API keys should be handled securely
* Avoid storing keys in source code
* For production, consider using a backend proxy

## Possible Improvements

* Charts and analytics
* Weekly / monthly summaries
* Team and project filtering
* Dark mode support
* Export reports (CSV / PDF)

## License

MIT License
