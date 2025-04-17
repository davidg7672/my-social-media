# My Social

My Social is a full-stack web application that is essentially a Facebook Mockup. Designed to act a versatile framework for tailoring to all your social media needs.

## Tech Stack

My Social uses the following technologies

-   **MongoDB** - NoSQL database for storing user, order, and menu data.
-   **Express.js** - Backend framework for handling server-side logic and API endpoints.
-   **React.js** - Frontend library for building an interactive user interface.
-   **Node.js** - JavaScript runtime for running the backend server.

## Features

-   **User Authentication**: Secure login and sign-up functionality.
-   **State Management**: Understanding which user is logged in.
-   **Responsive Design**: Optimized for both desktop and mobile users.

## Installation & Setup

1. **Clone the Repository**:

    ```sh
    git clone https://github.com/davidg7672/my-social-media.git
    cd my-social-media
    ```

2. **Backend Setup**:

    ```sh
    cd server
    npm i
    npm i express cors bcrypt body-parser cors dotenv helmet jsonwebtoken mongoose morgan multer multer-gridfs-storage
    node server.js
    ```

3. **Frontend Setup**:

    ```sh
    cd frontend
    npm install
    npm i react-router-dom redux formik dotenv yup mui
    npm run dev
    ```

4. **Database Setup**:
    - Ensure MongoDB is installed and running.
    - Update `.env` files with database connection details.

## Contribution

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Contact

For inquiries or suggestions, reach out via davidgsosa1@gmail.com.
