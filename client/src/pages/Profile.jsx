// components/Profile.jsx
import React, { useEffect, useState } from "react";
import { User, Mail, Lock, UserCircle } from "lucide-react";
import { apiurl } from '../api/axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${apiurl}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      } else {
        alert("Failed to load profile");
      }
    } catch (err) {
      console.error("Error fetching profile", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col items-center">
        <UserCircle size={80} className="text-blue-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-1 text-center">
          {loading ? "Loading..." : user?.fullName}
        </h2>
        <p className="text-gray-500 mb-6 text-center">{user?.gender}</p>

        <div className="w-full space-y-4">
          <div className="flex items-center bg-gray-100 rounded-lg p-3">
            <Mail className="text-blue-500 mr-3" />
            <p className="text-gray-700">{user?.email}</p>
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg p-3">
            <User className="text-blue-500 mr-3" />
            <p className="text-gray-700 capitalize">{user?.gender}</p>
          </div>

          {/* You can add more profile fields here if needed */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
