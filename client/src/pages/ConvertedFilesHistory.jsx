import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { apiurl } from '../api/axios';
const ConvertedFilesHistory = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${apiurl}/conversion-history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setHistory(data.history);
          setFilteredHistory(data.history);
        } else {
          alert("Failed to fetch history");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Error fetching history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    const filtered = history.filter((item) =>
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHistory(filtered);
  }, [searchQuery, history]);

  const downloadFile = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg max-w-6xl mx-auto my-8 border border-gray-200">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Conversion History</h2>
        <p className="text-gray-600">View and manage your previously converted files</p>
      </div>

      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Search files by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-12"
        />
        <svg
          className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-5 bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="flex justify-end mt-4 space-x-3">
                <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No files found</h3>
          <p className="mt-2 text-gray-600">
            {searchQuery ? "No files match your search." : "You haven't converted any files yet."}
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredHistory.map((item) => (
            <li
              key={item._id}
              className="p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 ease-in-out"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-3 sm:mb-0">
                  <p className="font-semibold text-lg text-gray-800 truncate max-w-xs">
                    {item.fileName}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Converted on:{" "}
                    <span className="font-medium">
                      {new Date(item.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => downloadFile(item.pdfUrl, item.fileName)}
                    className="flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                  >
                    <Download size={18} className="mr-2" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={() => downloadFile(item.xmlUrl, item.xmlFileName)}
                    className="flex items-center justify-center px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                  >
                    <Download size={18} className="mr-2" />
                    <span>Download XML</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConvertedFilesHistory;