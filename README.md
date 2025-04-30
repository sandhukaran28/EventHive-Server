# EventHive API (Express.js Backend)

This backend service powers the **EventHive** platform – a full-featured event management and ticket booking application developed for IFN666 Web and Mobile Application Development.

## 📌 Purpose

The **EventHive API** provides a RESTful interface to manage:
- Users and authentication (admin & regular users)
- Events (create, update, delete, view)
- Ticket bookings per user and across all users (admin-only access)

---

## 📚 API Endpoints

### 🔐 **Auth**
- `POST /api/register` – Register a new user
- `POST /api/login` – Login a user and get JWT

---

### 👤 **User**
- `GET /api/users` – Get all users (admin only)
- `GET /api/users/:id` – Get a specific user (admin/user)
- `GET /api/users/bookings` – Get all bookings by logged-in user
- `PUT /api/users/:id` – Update user (admin/user)
- `DELETE /api/users/:id` – Delete a user (admin/user)

---

### 📅 **Event**
- `GET /api/events` – Get all events (public)
- `GET /api/events/:id` – Get single event (public)
- `POST /api/events` – Create new event (admin only)
- `PUT /api/events/:id` – Update event (admin only)
- `DELETE /api/events/:id` – Delete event (admin only)

---

### 🎟️ **Booking**
- `GET /api/bookings` – Get all bookings (admin only)
- `GET /api/bookings/:id` – Get a single booking (admin/user)
- `POST /api/bookings` – Create a booking (authenticated users)
- `PUT /api/bookings/:id` – Update booking (admin only)
- `DELETE /api/bookings/:id` – Delete booking (admin/user)

---

## 🛠 Features

- Secure authentication using JWT & bcrypt
- Role-based access control for users vs. admins
- Event creation, viewing, editing, and deletion by admin
- Bookings system with seat quantity
- MongoDB integration via Mongoose
- Centralized error handling and request validation

---

## 📁 Folder Structure

```
/controllers     -> Business logic for Users, Events, Bookings
/routes          -> API routes for each resource
/models          -> Mongoose schemas and data models
/middleware      -> Auth, error handling, and admin checks
/utils           -> Token generators and helpers
```

---

## ⚙️ Installation & Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Setup a `.env` file with:
   ```
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_secret>
   ```
4. Start server using: `npm run dev`

---

## 🤝 Contributions

Feel free to open PRs or issues for improvements and fixes.

---

## 🔐 License

For educational use only – IFN666 @ QUT.