# Flight Booking Application

A full-stack flight booking system built with Angular frontend and Spring Boot microservices backend. This application allows users to search for flights, book tickets, and manage their reservations through a modern web interface.

## 🚀 Project Overview

This is a microservices-based flight booking platform that demonstrates enterprise-level architecture with:
- **Frontend**: Angular 20.3 with Bootstrap for responsive UI
- **Backend**: Spring Boot microservices with Spring Cloud ecosystem
- **Service Discovery**: Eureka Server
- **API Gateway**: Spring Cloud Gateway
- **Configuration Management**: Spring Cloud Config Server
- **Message Queue**: Apache Kafka for asynchronous communication
- **Databases**: MySQL (authentication) and PostgreSQL (business data)
- **Containerization**: Docker & Docker Compose

## 🏗️ Architecture

### Microservices

1. **Service Registry (Eureka Server)** - Port 8761
   - Service discovery and registration

2. **API Gateway** - Port 8765
   - Single entry point for all client requests
   - Routing and load balancing

3. **Config Server** - Port 8888
   - Centralized configuration management

4. **Auth Service** - Port 8085
   - User authentication and authorization
   - JWT token-based security
   - MySQL database

5. **Passenger Service** - Port 9001
   - Passenger profile management
   - PostgreSQL database (passengerDB)

6. **Flight Service** - Port 9002
   - Flight search and management
   - PostgreSQL database (flightDB)

7. **Ticket Service** - Port 9003
   - Ticket booking and management
   - PostgreSQL database (ticketDB)
   - Kafka producer for booking events

8. **Email Service** - Port 9005
   - Email notifications
   - Kafka consumer for booking confirmations

### Frontend Application (Angular 20.3)

The frontend is a modern Angular single-page application (SPA) with the following structure:

#### 🎨 Components

1. **Home Component** (`/`)
   - Landing page with application overview
   - Navigation to key features
   - Responsive hero section

2. **Sign Up Component** (`/signup`)
   - User registration form with validation
   - Custom username and password validators
   - Form validation with real-time feedback
   - Redirects to sign-in after successful registration

3. **Sign In Component** (`/signin`)
   - User authentication interface
   - JWT token-based login
   - Credentials stored in local storage
   - Automatic redirection based on user role

4. **Flight List Component** (`/flights`)
   - Browse and search available flights
   - Filter by source, destination, and date
   - Real-time flight availability
   - Interactive flight cards with booking options

5. **Passenger Registration Component** (`/register`) 🔒
   - Register passenger details before booking
   - Form validation for passenger information
   - Protected route (requires authentication)
   - Integration with Passenger Service API

6. **Ticket Booking Component** (`/book`) 🔒
   - Complete booking process
   - Seat selection and ticket confirmation
   - Protected route (requires authentication)
   - Real-time booking updates

#### 🛣️ Routing & Navigation

**Route Configuration:**
```typescript
/ → Home (Public)
/signup → Sign Up (Public)
/signin → Sign In (Public)
/flights → Flight List (Public)
/register → Passenger Registration (Protected - userOrAdminGuard)
/book → Ticket Booking (Protected - userOrAdminGuard)
```

**Route Guards:**
- `authGuard` - Protects routes requiring authentication
- `adminGuard` - Restricts access to admin-only routes
- `userOrAdminGuard` - Allows access to authenticated users and admins

#### 🔐 Security & Interceptors

**Auth Interceptor** (`auth-interceptor.ts`)
- Automatically attaches JWT tokens to HTTP requests
- Adds Authorization header to API calls
- Handles token refresh and expiration
- Intercepts 401/403 responses for automatic logout

#### 🎯 Services

The application uses Angular services to interact with backend microservices:

1. **Authentication Service** (`services/Authentication/`)
   - User login and registration
   - JWT token management
   - Session handling
   - Role-based access control

2. **Flight Service** (`services/FlightService/`)
   - Fetch available flights
   - Search and filter flights
   - Flight details retrieval
   - Real-time availability updates

3. **Passenger Service** (`services/PassengerService/`)
   - Passenger registration
   - Passenger profile management
   - CRUD operations for passenger data

4. **Ticket Service** (`services/TicketService/`)
   - Ticket booking operations
   - Booking confirmation
   - Ticket history and retrieval
   - Payment processing

#### 📋 Data Models

**TypeScript Interfaces:**
- `Flight` - Flight details and availability
- `Passenger` - Passenger information
- `Ticket` - Booking and ticket data
- `User` - User account information
- `UserDetails` - Detailed user profile
- `UserResponse` - API response structure
- `SearchRequest` - Flight search parameters

#### ✅ Form Validation

**Custom Validators:**
- `passwordValidator` - Enforces strong password requirements
  - Minimum length
  - Must contain uppercase, lowercase, numbers, and special characters
- `usernameValidator` - Validates username format
  - Alphanumeric characters
  - Length restrictions
  - Uniqueness checks

**Built-in Angular Validators:**
- Required fields
- Email format validation
- Pattern matching
- Min/Max length validation

#### 🎨 UI/UX Features

- **Responsive Design**: Bootstrap 5.3.8 for mobile-first design
- **Form Validation**: Real-time validation with error messages
- **Loading States**: Spinners and progress indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success/error feedback
- **Protected Routes**: Automatic redirect to login for unauthorized access
- **Clean UI**: Modern, intuitive interface
- **Accessibility**: ARIA labels and keyboard navigation support

## 📋 Prerequisites

### Frontend Requirements
- **Node.js** v18 or higher
- **npm** v9 or higher (comes with Node.js)
- **Angular CLI** v20.3.5 (`npm install -g @angular/cli@20.3.5`)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Backend Requirements
- **Java** JDK 17 or higher
- **Maven** 3.8+
- **Docker** & **Docker Compose**

## 🛠️ Setup and Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend-flight-booking-app
```

2. Build all microservices:
```bash
mvn clean package -DskipTests
```

3. Start all services using Docker Compose:
```bash
docker-compose up -d
```

4. Verify all services are running:
```bash
docker ps
```

5. Access Eureka Dashboard:
```
http://localhost:8761
```

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
ng serve
```

3. Open your browser and navigate to:
```
http://localhost:4200/
```

## 🎯 Frontend Development

### Development Server

Start the Angular development server with hot reload:
```bash
npm start
# or
ng serve
```

The app will be available at `http://localhost:4200/` and will automatically reload on file changes.

**Development with specific configuration:**
```bash
ng serve --configuration development
ng serve --open  # Automatically opens browser
ng serve --port 4300  # Use different port
```

### Code Generation

**Generate a new component:**
```bash
ng generate component components/component-name
# or shorthand
ng g c components/component-name
```

**Generate a service:**
```bash
ng generate service services/service-name
ng g s services/service-name
```

**Generate a guard:**
```bash
ng generate guard guards/guard-name
ng g g guards/guard-name
```

**Generate an interceptor:**
```bash
ng generate interceptor interceptors/interceptor-name
```

**Generate a model (interface):**
```bash
ng generate interface models/model-name
```

**View all available schematics:**
```bash
ng generate --help
```

### Project Structure Deep Dive

```
src/
├── app/
│   ├── components/          # All UI components
│   │   ├── home/           # Landing page
│   │   ├── signin/         # Login component
│   │   ├── signup/         # Registration component
│   │   ├── flight-list/    # Flight search & display
│   │   ├── passenger-registration/  # Passenger details form
│   │   └── ticket-booking/ # Booking confirmation
│   │
│   ├── services/           # API services
│   │   ├── Authentication/ # Auth service
│   │   ├── FlightService/  # Flight operations
│   │   ├── PassengerService/ # Passenger CRUD
│   │   └── TicketService/  # Ticket booking
│   │
│   ├── gaurds/             # Route guards
│   │   ├── auth.gaurd.ts   # Authentication guard
│   │   ├── admin.gaurd.ts  # Admin-only guard
│   │   └── userOrAdminGuard.ts # User/Admin guard
│   │
│   ├── interceptors/       # HTTP interceptors
│   │   └── auth-interceptor.ts # JWT token interceptor
│   │
│   ├── models/             # TypeScript interfaces
│   │   ├── Flight.ts
│   │   ├── Passenger.ts
│   │   ├── Ticket.ts
│   │   ├── user.ts
│   │   ├── userDetails.ts
│   │   ├── UserResponse.ts
│   │   └── searchRequest.ts
│   │
│   ├── validatorFunctions/ # Custom form validators
│   │   ├── passwordValidator.ts
│   │   └── usernameValidator.ts
│   │
│   ├── enums/              # Enumerations
│   ├── app.routes.ts       # Route configuration
│   ├── app.config.ts       # App configuration
│   └── app.ts              # Root component
│
├── index.html              # Main HTML file
├── main.ts                 # Application entry point
├── styles.css              # Global styles
└── environments/           # Environment configs
```

### Working with Forms

**Template-Driven Forms:**
Used in components with two-way data binding:
```typescript
import { FormsModule } from '@angular/forms';
```

**Reactive Forms:**
For complex validation scenarios:
```typescript
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
```

### API Integration

All API calls go through the API Gateway (`http://localhost:8765`):

```typescript
// Example service method
getFlights(searchRequest: SearchRequest): Observable<Flight[]> {
  return this.http.post<Flight[]>(
    `${this.apiUrl}/flight/search`,
    searchRequest
  );
}
```

The Auth Interceptor automatically adds JWT tokens:
```typescript
Authorization: Bearer <jwt-token>
```

### State Management

- **Local Storage**: JWT tokens, user info
- **Component State**: Reactive forms, local UI state
- **Service State**: Shared data via RxJS subjects

### Styling Guidelines

**Bootstrap Classes:**
- Use Bootstrap 5.3.8 utility classes
- Responsive breakpoints: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
- Grid system for layouts

**Custom Styles:**
- Component-specific: `component-name.css`
- Global styles: `src/styles.css`
- Follow BEM naming convention for custom classes

## 🏗️ Building

### Production Build

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

### Server-Side Rendering (SSR)

```bash
npm run serve:ssr:frontendForSigningIn
```

## 🧪 Testing

### Unit Tests

```bash
ng test
```

Uses Karma test runner with Jasmine framework.

### End-to-End Tests

For e2e testing, run:

```bash
ng e2e
```

## 🗄️ Database Information

### MySQL (Auth Service)
- **Port**: 3307 (host) → 3306 (container)
- **Database**: Configured via init script
- **User**: root
- **Password**: yourpassword

### PostgreSQL Databases
1. **Passenger DB**
   - Port: 5433 (host) → 5432 (container)
   - Database: passengerDB
   - User: postgres
   - Password: password

2. **Flight DB**
   - Port: 5434 (host) → 5432 (container)
   - Database: flightDB
   - User: postgres
   - Password: password

3. **Ticket DB**
   - Port: 5435 (host) → 5432 (container)
   - Database: ticketDB
   - User: postgres
   - Password: password

## 📨 Message Queue

### Apache Kafka
- **Kafka Broker**: localhost:9092 (external), kafka:29092 (internal)
- **Zookeeper**: localhost:2181
- **Topics**: Used for ticket booking events and email notifications

## 🔧 Configuration

### Backend Configuration
Each microservice can be configured through:
- `application.properties` or `application.yml`
- Spring Cloud Config Server (centralized configuration)
- Environment variables in Docker Compose

### Frontend Configuration

**Environment Setup:**
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8765',  // API Gateway endpoint
  apiTimeout: 30000
};
```

**API Gateway Integration:**
- All HTTP requests route through `http://localhost:8765`
- Services automatically prepend base URL
- Interceptor adds authentication headers

**Angular Configuration:**
- `angular.json` - Project configuration, build options
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies and scripts

**Prettier Configuration:**
```json
{
  "printWidth": 100,
  "singleQuote": true,
  "parser": "angular" (for HTML)
}
```

## 📦 Docker Services

All backend services are containerized. To manage Docker services:

**Start all services:**
```bash
docker-compose up -d
```

**Stop all services:**
```bash
docker-compose down
```

**View logs:**
```bash
docker-compose logs -f [service-name]
```

**Rebuild services:**
```bash
docker-compose up -d --build
```

## 🌐 API Endpoints

All API requests should be routed through the API Gateway at `http://localhost:8765`

Example endpoints:
- **Authentication**: `/auth/**`
- **Passengers**: `/passenger/**`
- **Flights**: `/flight/**`
- **Tickets**: `/ticket/**`

## 🛡️ Security

- JWT-based authentication
- Secure password storage with encryption
- Role-based access control
- Protected routes with authentication guards

## 📱 Features

### Frontend Features

**User Experience:**
- ✅ **Responsive Design** - Mobile-first approach with Bootstrap 5.3.8
- ✅ **Single Page Application** - Fast, seamless navigation without page reloads
- ✅ **Progressive Enhancement** - Works on all modern browsers
- ✅ **Server-Side Rendering (SSR)** - Improved SEO and initial load performance
- ✅ **Lazy Loading** - Optimized bundle sizes and faster load times

**Authentication & Authorization:**
- ✅ **JWT Token Authentication** - Secure, stateless authentication
- ✅ **Protected Routes** - Guard-based route protection
- ✅ **Role-Based Access** - User and Admin role management
- ✅ **Auto-Redirect** - Automatic login redirect for protected pages
- ✅ **Session Management** - Persistent login with local storage
- ✅ **Token Refresh** - Automatic token refresh handling

**Forms & Validation:**
- ✅ **Real-Time Validation** - Instant feedback on form inputs
- ✅ **Custom Validators** - Username and password strength validation
- ✅ **Error Messages** - User-friendly validation error display
- ✅ **Form State Management** - Disabled submit until valid
- ✅ **Field-Level Validation** - Individual field validation indicators

**Flight Booking Flow:**
- ✅ **Flight Search** - Search by source, destination, and date
- ✅ **Flight Listing** - View available flights with details
- ✅ **Passenger Registration** - Add passenger information
- ✅ **Ticket Booking** - Complete booking process
- ✅ **Booking Confirmation** - Immediate booking feedback
- ✅ **Email Notifications** - Automated confirmation emails

**UI Components:**
- ✅ **Navigation Bar** - Responsive navbar with role-based menus
- ✅ **Form Controls** - Styled input fields, buttons, dropdowns
- ✅ **Cards** - Flight information cards
- ✅ **Modals** - Confirmation and alert dialogs
- ✅ **Loading Indicators** - Spinners for async operations
- ✅ **Toast Notifications** - Success/error messages

**Performance:**
- ✅ **Optimized Builds** - Production builds with minification
- ✅ **Code Splitting** - Reduced initial bundle size
- ✅ **Caching Strategy** - HTTP response caching
- ✅ **Async Operations** - Non-blocking UI with RxJS observables

### Backend Features

- ✅ **Microservices Architecture** - Scalable, independent services
- ✅ **Service Discovery** - Eureka-based service registration
- ✅ **API Gateway** - Single entry point for all requests
- ✅ **Event-Driven** - Kafka for asynchronous communication
- ✅ **Database Per Service** - MySQL + PostgreSQL
- ✅ **Containerization** - Docker & Docker Compose deployment

## 🔍 Service Health Checks

The system includes health checks for critical services:
- Eureka Server: `http://localhost:8761/eureka/apps`
- MySQL: Automatic health monitoring
- Kafka: Connection verification
- All services register with Eureka for discovery

## 📝 Development Guidelines

### Code Style
- Prettier configured for consistent formatting
- Print width: 100 characters
- Single quotes preferred
- Angular parser for HTML templates

### Project Structure
```
frontend-flight-booking-app/
├── src/
│   ├── app/
│   │   ├── components/       # UI components
│   │   ├── services/         # API services
│   │   ├── guards/           # Route guards
│   │   ├── interceptors/     # HTTP interceptors
│   │   ├── models/           # Data models
│   │   ├── enums/            # Enumerations
│   │   └── validatorFunctions/ # Custom validators
│   └── ...
└── backend-flight-booking-app/
    ├── api-gateway/
    ├── auth-service/
    ├── ConfigServer/
    ├── email-service/
    ├── flight-service/
    ├── passenger-service/
    ├── service-registry/
    └── ticket-service/
```

## 🚨 Troubleshooting

### Backend Issues
1. Ensure all Docker containers are running: `docker ps`
2. Check service logs: `docker-compose logs [service-name]`
3. Verify Eureka registration: Visit `http://localhost:8761`
4. Ensure databases are initialized and healthy

### Frontend Issues

**Installation Problems:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Build Errors:**
```bash
# Clear Angular cache
rm -rf .angular
ng build --configuration development
```

**Port Already in Use:**
```bash
# Use different port
ng serve --port 4300
```

**API Connection Issues:**
1. Verify API Gateway is running: `http://localhost:8765`
2. Check CORS configuration in backend
3. Verify API URLs in environment files
4. Check browser console for network errors
5. Inspect network tab in DevTools

**Authentication Issues:**
1. Clear local storage: `localStorage.clear()`
2. Check JWT token validity
3. Verify auth interceptor is configured
4. Check token expiration

**Routing Issues:**
1. Verify route guards are imported
2. Check route configuration in `app.routes.ts`
3. Ensure guards return observables/booleans correctly

**Form Validation:**
1. Check validator functions are imported
2. Verify FormModule/ReactiveFormsModule is imported
3. Review console for validation errors

**Browser Console Errors:**
- Open DevTools (F12)
- Check Console tab for errors
- Review Network tab for failed requests
- Use Angular DevTools for component inspection

## 📚 Technologies Used

### Frontend Stack

**Core Framework:**
- **Angular 20.3** - Latest Angular with standalone components
- **TypeScript** - Strongly-typed JavaScript superset
- **RxJS 7.8** - Reactive programming with observables

**UI & Styling:**
- **Bootstrap 5.3.8** - Responsive CSS framework
- **CSS3** - Modern styling with flexbox and grid
- **Angular Animations** - Smooth transitions and effects

**HTTP & API:**
- **Angular HttpClient** - HTTP request handling
- **HTTP Interceptors** - Request/response manipulation
- **RxJS Operators** - map, filter, catchError, etc.

**Routing & Navigation:**
- **Angular Router** - SPA navigation
- **Route Guards** - CanActivate guards for protection
- **Lazy Loading** - On-demand module loading

**Forms:**
- **Template-Driven Forms** - Two-way data binding
- **Reactive Forms** - FormBuilder and validators
- **Custom Validators** - Business logic validation

**Build & Development:**
- **Angular CLI 20.3.5** - Project scaffolding and build tool
- **Webpack** - Module bundler (via Angular CLI)
- **TypeScript Compiler** - TS to JS compilation
- **Prettier** - Code formatting

**Testing:**
- **Jasmine** - Testing framework
- **Karma** - Test runner
- **Angular Testing Utilities** - TestBed, ComponentFixture

**Server-Side Rendering:**
- **Angular SSR** - Server-side rendering
- **Express** - Node.js server for SSR

**Development Tools:**
- **VS Code** - Recommended IDE
- **Angular DevTools** - Browser extension for debugging
- **Chrome DevTools** - Frontend debugging

### Backend
- Spring Boot
- Spring Cloud (Gateway, Config, Netflix Eureka)
- Spring Security (JWT)
- Spring Data JPA
- Apache Kafka
- MySQL & PostgreSQL
- Docker & Docker Compose
- Maven

## 👨‍💻 Author

Chubb Week 9 Assignment - Flight Booking Application

## 📄 License

This project is part of a training assignment.

## 🔗 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [Docker Documentation](https://docs.docker.com/)

---

**Note**: Make sure to configure your database passwords and JWT secrets appropriately for production environments.
