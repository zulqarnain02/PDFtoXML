"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Upload, ArrowRight, RefreshCw, Copy, Download } from "lucide-react";
import { apiurl } from '../api/axios';

export default function Home() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [xmlContent, setXmlContent] = useState(null);
  const [xmlFileName, setXmlFileName] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();


  // 🔐 Redirect to /login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setXmlContent(null); // Reset XML content when new file is selected
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setXmlContent(null); // Reset XML content when new file is selected
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleConvertClick = async () => {
    if (!file) {
      alert("Please upload a PDF file");
      return;
    }

    setIsConverting(true);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const token = localStorage.getItem("token");
    
      const response = await fetch(`${apiurl}/convert`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
    
      if (!response.ok) {
        if (response.status === 403) {
          alert("Session expired or unauthorized. Please log in again.");
        } else {
          alert("Failed to convert PDF");
        }
        setIsConverting(false);
        return;
      }
    
      const data = await response.json();
    
      setXmlContent(data.xmlContent);
      setXmlFileName(data.xmlFileName);
      setIsConverting(false);
    } catch (error) {
      console.error("Error converting file", error);
      alert("Failed to convert PDF");
      setIsConverting(false);
    }
    
  };

  const handleDownloadXml = () => {
    if (!xmlContent) return;
    
    const blob = new Blob([xmlContent], { type: "text/xml" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", xmlFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyXml = () => {
    if (!xmlContent) return;
    navigator.clipboard.writeText(xmlContent)
      .then(() => alert("XML copied to clipboard!"))
      .catch(err => console.error("Failed to copy: ", err));
  };

  const handleStartOver = () => {
    setFile(null);
    setXmlContent(null);
    setXmlFileName("");
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / 1048576).toFixed(2) + " MB";
  };

  return (
    <div className="max-w-6xl mx-auto p-10 bg-gray-100 mt-6">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">PDF to XML Converter</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Easily convert PDF to XML, directly in your browser! It's fast, free, and works on any device.
        </p>
      </div>

      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center ${
            isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4">
              <Upload className="h-16 w-16 text-indigo-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Drag and drop your PDF file here
            </h3>
            <p className="text-sm text-indigo-500 mb-6">
              PDF Files Smaller Than 20MB, Max 100 Pages
            </p>
            <button
              onClick={handleUploadClick}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Upload file
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-medium text-gray-700">
              {xmlContent ? "Conversion Complete!" : "Press Convert to XML"}
            </h2>
          </div>

          <div className={`flex ${xmlContent ? "flex-col lg:flex-row" : "justify-center"} gap-8 mb-8`}>
            {/* PDF Preview */}
            <div className={`bg-white shadow-lg rounded-md p-4 ${xmlContent ? "w-full lg:w-1/2" : "max-w-md w-full"}`}>
              <div className="aspect-[1/1.4] bg-gray-100 flex items-center justify-center mb-4">
                <embed
                  src={URL.createObjectURL(file)}
                  type="application/pdf"
                  className="w-full h-full"
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-800">
                  {file.name}, {file.size ? formatFileSize(file.size) : ""}
                </p>
              </div>
            </div>

            {/* XML Preview */}
            {xmlContent && (
              <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    {xmlFileName}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyXml}
                      className="text-indigo-500 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50"
                      title="Copy XML"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleDownloadXml}
                      className="text-indigo-500 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50"
                      title="Download XML"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="h-96 bg-gray-50 p-4 overflow-auto border border-gray-200 rounded">
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                    {xmlContent}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            {!xmlContent && (
              <button
                onClick={handleConvertClick}
                disabled={isConverting}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-8 rounded-md transition-colors flex items-center gap-2 min-w-[200px] justify-center"
              >
                {isConverting ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    Convert to XML
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            )}

            <div className="flex items-center gap-2 text-gray-600">
              <span>Need to convert another file?</span>
              <button
                onClick={handleStartOver}
                className="text-indigo-500 hover:text-indigo-600 font-medium flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}