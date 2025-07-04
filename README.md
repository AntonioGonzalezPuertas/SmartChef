<img src=".\Doc\logo.png" alt="logo" height="68"/>

# SmartChef

SmartChef is a fullstack application designed to help users manage their kitchen, plan meals, track ingredients, and discover new recipes with ease. This README explains the main sections, functionalities, and technologies used in both the frontend and backend of SmartChef.

---

## Table of Contents

- [Features](#features)
- [Frontend](#frontend)
  - [Main Sections](#main-sections)
  - [Technologies Used](#frontend-technologies)
- [Backend](#backend)
  - [API Endpoints & Models](#api-endpoints--models)
  - [Technologies Used](#backend-technologies)
- [Database](#database)
- [How It Works](#how-it-works)
- [Setup & Installation](#setup--installation)

---

## Features

- **Meal Planning:** Plan your meals for each day (lunch, dinner, etc.) and view your weekly schedule.
- **Recipe Management:** Add, edit, and view recipes with ingredients, instructions, photos, and categories.
- **Ingredient Tracking:** Manage your pantry, track stock, and get low-stock notifications.
- **Smart Recommendations:** Get daily recipe recommendations.
- **Shopping List:** Generate shopping lists.
- **User Authentication:** Sign up, log in, and log out securely.
  - LogIn by email/password
  - JWT is used received on LogIn to authenticate the requests
  - Forgot password link request
    - Send email with a link to reset password
    - A second email is sent with a random password to access to the account and be able to change the password
      <img src=".\Doc\ResetPasswordEmail.PNG" alt="App Screenshot"/>
- **Profile Creation:** Create a profile with a unique username and password.
  - Sign up with email validation (JWT token)
    <img src=".\Doc\validationEmail.PNG" alt="App Screenshot"/>

---

<img src=".\Doc\login.PNG" alt="" height="300" /> <img src=".\Doc\signup.PNG" alt="" height="300" /> <img src=".\Doc\forgot_password.PNG" alt="" height="300" />

## Implementation Details

**State Management:** Uses RxJS BehaviorSubject for authentication and profile state.

**Routing:** Angular Router with route guards for protected pages.

**Forms:** Reactive Forms for validation and user input.

**API Communication:** HTTPClient for RESTful API calls.

**Error Handling:** Toast notifications for user feedback.

---

## Technologies Used

**Frontend:** Angular, Ionic, TypeScript, RxJS, SCSS

**Authentication:** JWT

**Other:** REST API, RxJS Observables, Responsive Design

---

## Frontend

The frontend is built with **Angular** and **Ionic**, providing a modern, mobile-friendly user interface.

### Main Sections

- **Home (`tabHome`):**

  - Welcome header with app icon and slogan.
  - **Today's Recipes:** Shows the meals planned for today.
  - **Notifications:** Notifies you of ingredients that need restocking.
  - **Recommended Recipes:** Displays three random recipes for inspiration.

<img src=".\Doc\Home.PNG" alt="" height="300" />

- **Ingredients (`tabIngredients`):**

  - View, search, and filter all ingredients.
  - Group ingredients by category.
  - Add, edit, or delete ingredients.
  - See ingredient details, including stock and description.

<img src=".\Doc\Ingredients.PNG" alt="" height="300" /> <img src=".\Doc\Ingredients_actions.PNG" alt="" height="300" /> <img src=".\Doc\Ingredients_details.PNG" alt="" height="300" /> <img src=".\Doc\Ingredients_edit.PNG" alt="" height="300" />

- **Recipes (`tabRecipes`):**

  - Browse all recipes.
  - Search and filter recipes by category or keyword.
  - View recipe details, including ingredients, instructions, and photos.
  - Add or edit recipes with dynamic ingredient and instruction fields.

<img src=".\Doc\Recipes.PNG" alt="" height="300" /> <img src=".\Doc\Recipes_details.PNG" alt="" height="300" /> <img src=".\Doc\Recipes_edit.PNG" alt="" height="300" /> <img src=".\Doc\Recipes_ing_control.PNG" alt="" height="300" /> <img src=".\Doc\Recipes_play.PNG" alt="" height="300" />

---

**Schedule (`tabHome & tabRecipes`):**

<img src=".\Doc\Schedule_insert.PNG" alt="" height="300" />

### Frontend Technologies

- **Angular**: Main framework for SPA structure.
- **Ionic**: UI components for mobile-friendly design.
- **RxJS**: Reactive programming for data streams.
- **Angular Material**: Icons and some UI elements.
- **SCSS**: For modern, responsive styling.
- **TypeScript**: Strongly-typed codebase.

---

## Backend

The backend is built with **Node.js** and **Express**, using **MongoDB** for data storage.

### API Endpoints & Models

- **Recipes (`/recipes`):**

  - CRUD operations for recipes.
  - Each recipe includes title, categories, ingredients (with quantity), instructions, favorite flag, photos, cost, and cooking time.

- **Ingredients (`/ingredients`):**

  - CRUD operations for ingredients.
  - Each ingredient includes name, category, stock, units, and description.

- **Schedule (`/schedule`):**

  - Manage meal planning for each day and period (lunch, dinner, etc.).
  - Assign recipes to specific days and meals.

- **Authentication (optional/planned):**
  - JWT-based authentication for secure access.

#### Main Models

- **Recipe:**  
  Fields: `title`, `categories`, `ingredients` (with quantity), `instructions`, `favorite`, `photos`, `cost`, `cost_unit`, `cookingTime`, `createdAt`, `updatedAt`.

- **Ingredient:**  
  Fields: `name`, `categories`, `stock`, `stock_in`,`ordered`,`price`,`price_unit`, `units`, `description`, `createdAt`, `updatedAt`.

- **Schedule:**  
  Fields: `date`, `recipes`, `period`, `createdAt`, `updatedAt`.

### Backend Technologies

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for API endpoints.
- **MongoDB**: NoSQL database for storing recipes, ingredients, and schedules.
- **Mongoose**: Docker for MongoDB.
- **JWT**: (Optional) Authentication.

---

### Database

SmartChef uses **MongoDB** as its primary database to store all application data. MongoDB is a NoSQL, document-oriented database, which allows flexible and scalable storage of JSON-like documents.

### Collections and Structure

#### 1. **recipes**

Stores all recipe documents.

**Example structure:**

```json
{
  "_id": ObjectId("..."),
  "title": "Paella",
  "categories": ["Spanish", "Seafood"],
  "ingredients": [
    { "id": "60f...", "quantity": 2 }
  ],
  "description": "A classic Spanish rice dish.",
  "instructions": [
    "Sauté onions and garlic.",
    "Add rice and broth.",
    "Add seafood and cook until done."
  ],
  "favorite": false,
  "photos": ["https://..."],
  "cost": 15,
  "cost_unit": "€",
  "cookingTime": 45,
  "createdAt": "2025-07-03T12:00:00.000Z",
  "updatedAt": "2025-07-03T12:00:00.000Z"
}
```

#### 2. **ingredients**

Stores all ingredients documents.

**Example structure:**

```json
  {
    "_id": ObjectId("..."),
    "name": "Tomato in dices",
    "categories": ["Vegetables"],
    "shops": ["Local Market", "Lidel"],
    "units": "piece",
    "description": "",
    "photo": "https://www.hunts.com/sites/g/files/qyyrlu211/files/images/products/diced-tomatoes-79288.png",
    "stock": 0,
    "min_stock": 2,
    "ordered": 10,
    "price": 100,
    "price_unit": "CHF",
    "createdAt": "2024-05-01T10:00:00Z",
    "updatedAt": "2024-05-20T15:00:00Z"
  }
```

#### 3. **schedule**

Stores all schedule documents.

**Example structure:**

```json
{
    "_id": ObjectId("..."),
    "date": "2025-07-02",
    "recipes": ["1"],
    "period": "dinner",
    "createdAt": "2024-05-01T10:00:00Z",
    "updatedAt": "2024-05-20T15:00:00Z"
  }

```

#### 4. **profiles**

Stores all ingredients documents.

**Example structure:**

```json
{
        "_id": ObjectId("..."),
        "name": "Antonio",
        "email": "antonio.gonzalez.puertas@gmail.com",
        "isDeleted": false,
        "isValidated": true,
        "technologies": [],
        "createdAt": "2025-07-03T13:00:36.203Z",
        "updatedAt": "2025-07-03T13:30:30.987Z",
        "__v": 0
    }
```

---

## How It Works

1. **User logs in** (optional).
2. **Home page** shows today's meals, low-stock alerts, and recommendations.
3. **Ingredients** can be managed (add, edit, delete, view details).
4. **Recipes** can be browsed, searched, and managed.
5. **Schedule** allows planning meals for each day and period.
6. **Recommendations** are generated randomly from available recipes.
7. **All data** is synced with the backend via RESTful API calls.

---

## Setup & Installation

### Backend

1. `cd backend`
2. `npm install`
3. Configure your MongoDB connection in `.env` or config file.
4. `npm start`

### Frontend

1. `cd frontend`
2. `npm install`
3. Update `environment.ts` with your backend API URL.
4. `ionic serve` or `ng serve`

---

## Missing features

- Unit, E2E and integration tests.
- Code cleaning, removing unused styles and imports.
- More exaustive error control
- Cookies management
- Profiles Management for users ( Information edit and password change)

## Disclaimer

- The login, authorisation, guards, token security and many other features are implemented for demo proposes and not learned or validated by the course.
- The application is not intended for production use or grand public.

## License

This project is proprietary and all rights are reserved by the author.  
The code and materials in this repository may not be used, copied, distributed, or incorporated into any coursework or educational material without explicit written permission from the author.

Unauthorized use, reproduction, or distribution is strictly prohibited.
