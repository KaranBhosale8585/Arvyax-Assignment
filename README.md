# AI-Assisted Journal System

An AI-powered journaling system built for the **ArvyaX Backend Developer Assignment**.
The application allows users to write journal entries after immersive nature sessions and uses an **LLM to analyze emotions and generate insights** about the user's mental state over time.

The project demonstrates **backend API design, LLM integration, data modeling, and frontend interaction with APIs**.

---

# Live Demo

https://arvyax-assignment-chi.vercel.app/

---

# GitHub Repository

https://github.com/KaranBhosale8585/Arvyax-Assignment

---

# Features

## Journal Entry System

Users can write journal entries after completing immersive nature sessions.

Each entry stores:

* User ID
* Ambience type (user can manually enter ambience)
* Journal text
* Timestamp

Journal entries are stored in **MongoDB** and can be retrieved later.

---

## Emotion Analysis using LLM

The system analyzes journal text using an **LLM API** and extracts:

* Dominant emotion
* Important keywords
* A short summary of the user’s mental state

Example Output:

```
{
  "emotion": "calm",
  "keywords": ["rain", "nature", "peace"],
  "summary": "User experienced relaxation during the forest session"
}
```

---

## Insights Dashboard

The insights API aggregates journal entries and provides mental state insights such as:

* Total number of journal entries
* Most frequent emotion
* Most used ambience
* Recently detected keywords

Example Response:

```
{
  "totalEntries": 8,
  "topEmotion": "calm",
  "mostUsedAmbience": "forest",
  "recentKeywords": ["focus","nature","rain"]
}
```

---

# Tech Stack

## Frontend

* React
* Axios
* React Hot Toast

## Backend

* Next.js API Routes (Node.js runtime)

## Database

* MongoDB

## AI / LLM

* Google Generative AI API (Gemini)

## Deployment

* Vercel

---

# API Endpoints

## Create Journal Entry

POST `/api/journal`

Request:

```
{
  "userId": "123",
  "ambience": "forest",
  "text": "I felt calm today after listening to the rain."
}
```

Response:

```
{
  "message": "Journal entry created successfully"
}
```

---

## Get Journal Entries

GET `/api/journal/:userId`

Response:

```
[
  {
    "ambience": "forest",
    "text": "I felt calm today after listening to the rain.",
    "createdAt": "2026-03-10T12:10:00Z"
  }
]
```

---

## Analyze Journal Entry

POST `/api/journal/analyze`

Request:

```
{
  "text": "I felt calm today after listening to the rain"
}
```

Response:

```
{
  "emotion": "calm",
  "keywords": ["rain","nature","peace"],
  "summary": "User experienced relaxation during the forest session"
}
```

---

## Insights API

GET `/api/journal/insights/:userId`

Response:

```
{
  "totalEntries": 8,
  "topEmotion": "calm",
  "mostUsedAmbience": "forest",
  "recentKeywords": ["focus","nature","rain"]
}
```

---

# Project Structure

```
/app
  /api
    /journal
      route.ts
    /journal/analyze
      route.ts
    /journal/insights
      route.ts

/components
  JournalForm.jsx
  EntriesList.jsx
  Insights.jsx

/lib
  db.js

/models
  Journal.js
```

---

# Running the Project Locally

## 1. Clone the repository

```
git clone https://github.com/KaranBhosale8585/Arvyax-Assignment.git
```

---

## 2. Install dependencies

```
npm install
```

or

```
pnpm install
```

---

## 3. Setup Environment Variables

Create a `.env` file:

```
MONGODB_URI=your_mongodb_connection
GEMINI_API_KEY=your_google_ai_api_key
```

---

## 4. Run the development server

```
npm run dev
```

Application will run at:

```
http://localhost:3000
```

---

# Architecture Overview

## System Flow

```
User → React Frontend → API Routes → MongoDB
                         ↓
                      LLM API
```

Flow Explanation:

1. User writes a journal entry in the frontend
2. Entry is sent to the backend API
3. Entry is stored in MongoDB
4. User clicks **Analyze**
5. Backend sends text to the LLM
6. LLM returns emotion, keywords, and summary
7. Insights API aggregates past journal data

---

# Scaling to 100K Users

To support a large number of users, the system could be improved with:

### Database Optimization

* Add indexes on `userId` for faster queries
* Optimize aggregation queries for insights

### Backend Scaling

* Deploy backend across multiple instances
* Use horizontal scaling for APIs

### Background Processing

LLM analysis could be moved to background jobs so that journal creation remains fast even under heavy load.

---

# Reducing LLM Cost

LLM APIs can become expensive at scale. Cost can be reduced by:

* Triggering analysis only when the user clicks **Analyze**
* Storing analysis results for each entry
* Limiting the maximum text length sent to the LLM
* Using lightweight models for emotion classification

---

# Future Improvement: Analysis Result Caching

Currently each analysis request sends text to the LLM.

A production system could cache results:

1. Generate a hash of the journal text
2. Check if analysis already exists
3. If yes → return cached result
4. If not → call LLM and store result

This would significantly reduce cost and response time.

---

# Protecting Sensitive Journal Data

Journal entries may contain personal information. Protection strategies include:

### Encryption

Sensitive data can be encrypted before storing in the database.

### Authentication

Users should only be able to access their own journal entries.

### Secure Communication

Use HTTPS to protect data in transit.

### API Validation

Validate `userId` and request data to prevent unauthorized access.

---

# Bonus Features Implemented

* LLM-based emotion analysis
* Insights aggregation API
* Simple frontend UI for journaling
* Live deployed demo

---

# Author

Karan Bhosale
Backend Developer | MERN / Next.js Developer

GitHub:
https://github.com/KaranBhosale8585
