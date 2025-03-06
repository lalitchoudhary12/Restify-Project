# Restify

Restify is a responsive web application for listing and booking vacation rentals. Users can explore listings, book accommodations, and leave reviews. The application is built using Node.js, Express, MongoDB, and EJS templating. It is web responsive for all devices.

## Features

- User authentication and authorization
- Create, read, update, and delete (CRUD) operations for listings
- Booking functionality for listings
- Review and rating system for listings
- Responsive design with Bootstrap
- Image upload using Cloudinary
- Flash messages for user feedback
- Error handling

## Tools and Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- Passport.js (for authentication)
- Cloudinary (for image storage)
- Axios (for HTTP requests)
- Bootstrap (for styling)
- dotenv (for environment variables)
- connect-mongo (for session storage)
- method-override (for HTTP method overrides)
- multer (for file uploads)
- ejs-mate (for EJS layouts)
- connect-flash (for flash messages)

## Installation

1. Clone the repository
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    NODE_ENV=development
    ATLAS_DBURL=your_mongodb_connection_string
    SECRET_CODE=your_secret_code
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    MAP_API_KEY=your_here_map_api_key
    ```
4. Start the application:
    ```sh
    node app.js
    ```

## Endpoints

### Listings

- `GET /listings` - View all listings
- `GET /listings/new` - Render form to create a new listing
- `POST /listings` - Create a new listing
- `GET /listings/:id` - View a specific listing
- `GET /listings/:id/edit` - Render form to edit a listing
- `PUT /listings/:id` - Update a listing
- `DELETE /listings/:id` - Delete a listing

### Bookings

- `GET /listings/:id/book` - Render form to book a listing
- `POST /listings/:id` - Confirm booking
- `GET /listings/bookings` - View all bookings
- `DELETE /listings/bookings/:bookingId` - Delete a booking

### Reviews

- `POST /listings/:id/reviews` - Create a new review
- `DELETE /listings/:id/reviews/:reviewId` - Delete a review

### Users

- `GET /signup` - Render signup form
- `POST /signup` - Sign up a new user
- `GET /login` - Render login form
- `POST /login` - Log in a user
- `GET /logout` - Log out a user

### Contact

- `GET /contact` - Render contact form

## Conclusion

Restify is a comprehensive web application designed to simplify the process of finding and booking vacation rentals. With features like user authentication, CRUD operations for listings, booking functionality, and a review system, Restify provides a seamless experience for both hosts and guests. The use of modern tools and technologies ensures that the application is robust, scalable, and easy to maintain. Whether you are looking to list your property or find the perfect vacation rental, Restify has you covered.