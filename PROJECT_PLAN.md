# SmartGoal Web App: Project Plan & Feature Map

## 1. Backend Requirements
- **User Accounts**
  - Registration (email, password)
  - Login/Authentication (JWT or session tokens)
  - Profile management
- **Goal Management**
  - Create, read, update, delete (CRUD) goals
  - Each goal linked to a user
- **LLM/AI API Integration**
  - Connect to LLM/AI provider (e.g., OpenAI)
  - Secure API key management
- **Database**
  - Users table/collection
  - Goals table/collection (linked to users)
  - (Optional) Logs/history of LLM interactions
- **Security**
  - Authentication & authorization
  - Input validation
- **API Endpoints (examples)**
  - `POST /api/register` — Register user
  - `POST /api/login` — Login
  - `GET /api/goals` — List user's goals
  - `POST /api/goals` — Create goal
  - `PUT /api/goals/:id` — Update goal
  - `DELETE /api/goals/:id` — Delete goal
  - `POST /api/llm` — LLM interaction

---

## 2. Anonymous vs Authenticated Users

| Feature                | Anonymous User | Authenticated User |
|------------------------|:--------------:|:------------------:|
| Use LLM/AI             |      Yes       |        Yes         |
| Create/Edit Goals      |      Yes*      |        Yes         |
| Persistent Storage     |      No*       |        Yes         |
| Sync Across Devices    |      No        |        Yes         |

\*Anonymous users' goals are stored in browser (localStorage/IndexedDB), not backend.

- **Anonymous Users:**
  - Can use LLM/AI features
  - Can create/manage goals (in browser only)
  - No persistent storage
- **Authenticated Users:**
  - All features of anonymous users
  - Persistent goal storage in backend
  - Sync across devices
  - Option to sync local (anonymous) goals to account on login

---

## 3. Reminder Delivery Options

### a. Email Reminders
- Backend sends scheduled emails
- Pros: Universal, reliable
- Cons: Can go to spam, less interactive
- Tech: SendGrid, Mailgun, SMTP


------ NOT THIS ONE -----------
### b. Web Push Notifications
- Browser notifications via Service Workers
- Pros: Instant, works if browser is open
- Cons: Requires permission, browser/device support varies
- Tech: web-push, Service Workers
-------------------------------


### c. Mobile Push Notifications
- For mobile apps (React Native, etc.)
- Pros: Best for mobile
- Cons: Requires mobile app
- Tech: FCM (Firebase), APNs (Apple)

### d. SMS Reminders
- Backend sends SMS
- Pros: Works on any phone
- Cons: Paid, needs phone number
- Tech: Twilio, Nexmo, AWS SNS

------------- LOWEST PRIORITY --------------
### e. In-App Reminders
- Shown while user is in app
- Pros: Simple
- Cons: Only works if app is open
- Tech: Frontend code (setTimeout, setInterval)
--------------------------------------------


### f. Calendar Integration
- Add reminders to user's calendar
- Pros: Uses existing calendar
- Cons: Needs user approval
- Tech: Google Calendar API, iCal

---

## 4. Recommendations
- For web: Start with email and web push notifications
- For mobile: Use mobile push
- For maximum reach: Offer email, SMS, and calendar integration

---

**This file is a living document. Add new features, decisions, and architecture notes here as the project evolves.** 