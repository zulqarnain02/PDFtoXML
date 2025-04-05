# 📄 PDFtoXML Converter

A powerful full-stack application that converts PDF documents to XML format, featuring a modern React frontend and Node.js backend with advanced document processing capabilities.

## 📋 Project Overview

PDFtoXML is a specialized document conversion tool that transforms PDF files into structured XML data. This project combines modern web technologies to create a robust and efficient conversion system with a user-friendly interface.

### 🎯 Project Goals
- Provide accurate and reliable PDF to XML conversion
- Create an intuitive user interface for document upload and management
- Implement secure file processing and storage
- Ensure high-quality XML output with proper structure
- Support various PDF formats and layouts

### 💡 Key Features

- **Frontend (React + Vite)** 🎨
  - Modern UI with Tailwind CSS
  - Drag-and-drop file upload
  - Real-time conversion status
  - Download converted XML files
  - Lucide React icons
  - ESLint for code quality

- **Backend (Node.js + Express)** ⚙️
  - PDF parsing and extraction
  - XML structure generation
  - File upload and processing
  - Secure storage and retrieval
  - Progress tracking
  - Error handling and validation

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install backend dependencies:
```bash
cd api
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the api directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

## 🚀 Running the Application

1. Start the backend server:
```bash
cd api
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📸 Screenshots

[Add your application screenshots here]

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Lucide React
- ESLint

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Multer (File Upload)
- PDF-parse
- Tesseract.js (OCR)
- Nodemailer
- XML2JS

## 📝 License

This project is licensed under the ISC License.

## 👥 Author

MOHAMMED ZULQARNAIN
📧 Email: [zulqarnain4292@gmail.com](mailto:zulqarnain4292@gmail.com)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 
