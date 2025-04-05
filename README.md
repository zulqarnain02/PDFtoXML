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
- Maintain user privacy and data security

### 💡 Key Features

- **Document Conversion** 📄
  - PDF to XML conversion with high accuracy using PDF.co API
  - Support for multiple PDF formats
  - Batch file processing
  - Custom XML structure configuration
  - Real-time conversion progress tracking
  - Download converted files in XML format
  - Integration with PDF.co for reliable conversion
  - Support different Media(media friendly)

- **User Management** 👤
  - Secure login and logout
  - User profile management
  - Password reset functionality
  - Email verification

- **History & Tracking** 📊
  - Conversion history tracking
  - Export history reports
  - Download PDF and XML from the History
  - Advanced search functionality
    - Search by filename
    - Search by date range

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
  - User authentication and authorization
  - Email service integration

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn
- PDF.co API key (for PDF to XML conversion)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/zulqarnain02/PDFtoXML.git
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
EMAIL_PASSWORD=your_email_password
PDF_TO_XML_KEY=your_generated_key_from_PDF.co
```

## 🔧 PDF.co Setup

1. Sign up for a PDF.co account at [https://pdf.co](https://pdf.co)
2. Generate your API key from the dashboard
3. Add the API key to your `.env` file as `PDF_TO_XML_KEY`
4. The application will use PDF.co's reliable conversion service for:
   - High-quality PDF to XML conversion
   - Batch processing capabilities
   - Secure file handling
   - Consistent output format

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

![image](https://github.com/user-attachments/assets/21055cb6-694a-4e1b-915a-bccac3ea2d62)
![image](https://github.com/user-attachments/assets/46ed4185-59d1-4abf-bd56-2d5426364a4a)
![image](https://github.com/user-attachments/assets/27cb939b-e180-49ca-9813-cb89c9e2ecc8)  ![image](https://github.com/user-attachments/assets/67ddc5d4-adaa-4c3a-9de2-6455befe12e4)
![image](https://github.com/user-attachments/assets/455874ef-6704-4b48-af6d-422fe9e252b9)
![image](https://github.com/user-attachments/assets/3947b54e-c32a-42e7-8538-ea50bc442ed8)
![image](https://github.com/user-attachments/assets/5be0907b-ef7c-4b7b-b31f-c492d5214e48)
![image](https://github.com/user-attachments/assets/7b5fb163-9ec9-48d6-9ebd-5a636ea277ed)
![image](https://github.com/user-attachments/assets/b9a18214-0644-403e-be85-08c9db43e35f)
![image](https://github.com/user-attachments/assets/0131af6e-da08-4773-9230-f64f0ab54ee5)
![image](https://github.com/user-attachments/assets/a146e190-85ef-4518-9eb2-11d89b5a1a08)





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
