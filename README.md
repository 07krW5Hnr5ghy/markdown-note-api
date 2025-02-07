# Markdown Note-taking API

## 📌 Overview

This API allows users to upload Markdown notes, check their grammar, save them, and render them in HTML format.

## 🚀 Features

- Upload and save Markdown notes.
- Check grammar for saved notes.
- Retrieve a list of all saved notes.
- Convert Markdown notes to HTML.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Markdown Parsing:** `marked`
- **Grammar Checking:** LanguageTool API
- **Rate Limiting:** Express-rate-limit

---

## 🔧 Installation & Setup

### **1️⃣ Clone Repository**

```sh
git clone https://github.com/07krW5Hnr5ghy/markdown-note-api
cd markdown-note-api
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### **4️⃣ Start Server**

```sh
npm start
```

---

## 📌 API Endpoints

### **1️⃣ Create a Note**

**POST** `/api/notes`

#### Request Body:

```json
{
  "title": "My Note",
  "content": "# Hello World\nThis is a sample markdown note."
}
```

#### Response:

```json
{
  "_id": "noteId123",
  "title": "My Note",
  "content": "# Hello World\nThis is a sample markdown note.",
  "createdAt": "2025-02-04T12:00:00Z"
}
```

---

### **2️⃣ Get All Notes**

**GET** `/api/notes`

#### Response:

```json
[
  {
    "_id": "noteId123",
    "title": "My Note",
    "createdAt": "2025-02-04T12:00:00Z"
  }
]
```

---

### **3️⃣ Get a Single Note**

**GET** `/api/notes/{id}`

#### Response:

```json
{
  "_id": "noteId123",
  "title": "My Note",
  "content": "# Hello World\nThis is a sample markdown note."
}
```

---

### **4️⃣ Get Note as HTML**

**GET** `/api/notes/{id}/html`

#### Response:

```html
<h1>Hello World</h1>
<p>This is a sample markdown note.</p>
```

---

### **5️⃣ Check Grammar of a Note**

**GET** `/api/notes/{id}/grammar`

#### Response:

```json
{
  "matches": [
    {
      "message": "Possible spelling mistake found.",
      "offset": 13,
      "length": 5
    }
  ]
}
```

---

## 📌 Rate Limiting

- API requests are limited to **100 requests per 15 minutes** to prevent abuse.

---

## 🛠️ Future Improvements

- User authentication.
- Cloud storage support for large markdown files.
- Syntax highlighting for code blocks.

---

## url

https://roadmap.sh/projects/markdown-note-taking-app
