# Computato 🎮

## Overview

Computato is a web application that allows users to check if their computer can run various games. The application consists of a frontend built with React and Vite, and a backend built with Node.js, Express, and Sequelize using PostgreSQL.

## Features ✨

- User authentication and authorization 🔐
- Game search and filtering 🔍
- Display game details and requirements 📋
- Infinite scrolling for game lists 🔄
- Responsive design 📱

## Prerequisites 📋

- Node.js (v14 or higher)
- PostgreSQL

## Setup ⚙️

### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    DB_HOST=your_database_host
    DB_PORT=your_database_port
    DB_DATABASE=your_database_name
    DB_USER=your_database_user

    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret

    RAWG_API=your_rawg_api_key

    EMAIL_HOST=your_email_host
    EMAIL_PORT=your_email_port
    EMAIL_USER=your_email_user
    EMAIL_PASSWD=your_email_password
    ```

4. Start the backend server:
    ```sh
    npm run start
    ```

### Frontend

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm run dev
    ```

## Usage 🚀

1. Open your browser and navigate to `http://localhost:5173` to access the frontend application.
2. Use the search bar and filters to find games and check if your computer can run them.
3. Log in or sign up to access additional features.

## Project Structure 📂

```
.env
.gitignore
backend/
    .env
    .gitignore
    config/
    controllers/
    doc/
    logs/
    middleware/
    models/
    package.json
    README.md
    routes/
    server.js
frontend/
    .DS_Store
    .gitignore
    eslint.config.js
    index.html
    package.json
    README.md
    src/
    vite.config.js
LICENSE
package.json
README.md
```

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing 🤝

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact 📧

For any questions or inquiries, please contact the project maintainer.
