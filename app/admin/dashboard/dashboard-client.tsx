"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Search,
  LogOut,
  AlertCircle,
  CheckCircle,
  Upload,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Hotel {
  id: string;
  name: string;
  location: string;
  pricePerNight: string;
  available: boolean;
  facilities: string[];
  images: string[];
  createdAt: string;
}

interface Activity {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  user: {
    email: string;
    name: string | null;
  };
}

interface FormData {
  name: string;
  location: string;
  description: string;
  pricePerNight: string;
  facilities: string;
  images: string[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"hotels" | "activity">("hotels");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedHotel, setExpandedHotel] = useState<string | null>(null);
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
    description: "",
    pricePerNight: "",
    facilities: "",
    images: [],
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === "hotels") {
        await fetchHotels();
      } else {
        await fetchActivities();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await fetch("/api/hotels");
      if (!response.ok) throw new Error("Failed to fetch hotels");
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setFormError("Failed to load hotels");
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch("/api/activities");
      if (!response.ok) throw new Error("Failed to fetch activities");
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setFormError("Failed to load activities");
    }
  };

  const handleAddClick = () => {
    setFormData({
      name: "",
      location: "",
      description: "",
      pricePerNight: "",
      facilities: "",
      images: [],
    });
    setEditingId(null);
    setFormError("");
    setSuccessMessage("");
    setIsModalOpen(true);
  };

  const handleEditClick = (hotel: Hotel) => {
    setFormData({
      name: hotel.name,
      location: hotel.location,
      description: "",
      pricePerNight: hotel.pricePerNight,
      facilities: hotel.facilities.join(", "),
      images: hotel.images || [],
    });
    setEditingId(hotel.id);
    setFormError("");
    setSuccessMessage("");
    setIsModalOpen(true);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setFormError("Hotel name is required");
      return false;
    }
    if (!formData.location.trim()) {
      setFormError("Location is required");
      return false;
    }
    if (!formData.pricePerNight || parseFloat(formData.pricePerNight) <= 0) {
      setFormError("Valid price is required");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const facilitiesArray = formData.facilities
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const payload = {
        name: formData.name.trim(),
        location: formData.location.trim(),
        description: formData.description.trim(),
        pricePerNight: parseFloat(formData.pricePerNight),
        facilities: facilitiesArray,
        images: formData.images,
      };

      const response = await fetch(
        editingId ? `/api/hotels/${editingId}` : "/api/hotels",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Operation failed");
      }

      setSuccessMessage(
        editingId ? "Hotel updated successfully!" : "Hotel added successfully!",
      );
      setIsModalOpen(false);
      await fetchHotels();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleAvailability = async (
    id: string,
    currentStatus: boolean,
  ) => {
    try {
      const response = await fetch(`/api/hotels/${id}/availability`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update availability");

      setSuccessMessage(
        !currentStatus ? "Hotel activated!" : "Hotel deactivated!",
      );
      await fetchHotels();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Operation failed");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result;
          if (result && typeof result === "string") {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, result],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredActivities = activities.filter(
    (activity) =>
      activity.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage your system</p>
          </div>
          <button
            onClick={async () => {
              await fetch("/api/auth/admin-logout", { method: "POST" });
              router.push("/admin/login");
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("hotels")}
              className={`py-4 px-2 font-medium transition border-b-2 ${
                activeTab === "hotels"
                  ? "text-blue-400 border-blue-400"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}
            >
              Hotels
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`py-4 px-2 font-medium transition border-b-2 ${
                activeTab === "activity"
                  ? "text-blue-400 border-blue-400"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}
            >
              Activity
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg flex items-center gap-3 text-green-300">
            <CheckCircle size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {formError && !isModalOpen && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-center gap-3 text-red-300">
            <AlertCircle size={20} />
            <span>{formError}</span>
          </div>
        )}

        {/* Hotels Tab */}
        {activeTab === "hotels" && (
          <>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-3 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search hotels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 text-sm"
                />
              </div>
              <button
                onClick={handleAddClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start"
              >
                <Plus size={18} /> Add Hotel
              </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Loading hotels...</p>
                </div>
              ) : filteredHotels.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-400 mb-4">
                    {searchTerm ? "No hotels found" : "No hotels yet"}
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={handleAddClick}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Add your first hotel
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-700 border-b border-gray-700">
                        <th className="px-6 py-4 text-left font-semibold text-gray-200">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-200">
                          Location
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-200">
                          Price/Night
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-200">
                          Facilities
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-200">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-200">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredHotels.map((hotel) => (
                        <tr
                          key={hotel.id}
                          className="hover:bg-gray-750 transition"
                        >
                          <td className="px-6 py-4 text-white font-medium">
                            {hotel.name}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {hotel.location}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            ₹{hotel.pricePerNight}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {hotel.facilities &&
                              hotel.facilities.length > 0 ? (
                                hotel.facilities.map((facility, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded"
                                  >
                                    {facility}
                                  </span>
                                ))
                              ) : (
                                <span className="text-gray-500 text-xs">
                                  No facilities
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
                                hotel.available
                                  ? "bg-green-900/30 text-green-300 hover:bg-green-900/50"
                                  : "bg-red-900/30 text-red-300 hover:bg-red-900/50"
                              }`}
                              onClick={() =>
                                handleToggleAvailability(
                                  hotel.id,
                                  hotel.available,
                                )
                              }
                            >
                              {hotel.available ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditClick(hotel)}
                                className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  handleToggleAvailability(
                                    hotel.id,
                                    hotel.available,
                                  )
                                }
                                className={`p-2 rounded transition ${
                                  hotel.available
                                    ? "bg-gray-700 hover:bg-red-600 text-gray-300"
                                    : "bg-gray-700 hover:bg-green-600 text-gray-300"
                                }`}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Loading hotels...</p>
                </div>
              ) : filteredHotels.length === 0 ? (
                <div className="p-8 text-center bg-gray-800 rounded-lg">
                  <p className="text-gray-400 mb-4">
                    {searchTerm ? "No hotels found" : "No hotels yet"}
                  </p>
                </div>
              ) : (
                filteredHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
                  >
                    {/* Collapsed View */}
                    <div
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750 transition"
                      onClick={() =>
                        setExpandedHotel(
                          expandedHotel === hotel.id ? null : hotel.id,
                        )
                      }
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">
                          {hotel.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          ₹{hotel.pricePerNight}/night
                        </p>
                      </div>

                      <div className="flex items-center gap-3 ml-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                            hotel.available
                              ? "bg-green-900/30 text-green-300"
                              : "bg-red-900/30 text-red-300"
                          }`}
                        >
                          {hotel.available ? "Active" : "Inactive"}
                        </span>
                        <ChevronDown
                          size={20}
                          className={`text-gray-400 transition ${
                            expandedHotel === hotel.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Expanded View */}
                    {expandedHotel === hotel.id && (
                      <div className="border-t border-gray-700 p-4 space-y-4 bg-gray-750">
                        <div>
                          <p className="text-gray-400 text-sm">Location</p>
                          <p className="text-white font-medium">
                            {hotel.location}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400 text-sm">Facilities</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {hotel.facilities && hotel.facilities.length > 0 ? (
                              hotel.facilities.map((facility, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded"
                                >
                                  {facility}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 text-xs">
                                No facilities
                              </span>
                            )}
                          </div>
                        </div>

                        {hotel.images && hotel.images.length > 0 && (
                          <div>
                            <p className="text-gray-400 text-sm mb-2">Images</p>
                            <div className="grid grid-cols-2 gap-2">
                              {hotel.images.slice(0, 4).map((image, idx) => (
                                <img
                                  key={idx}
                                  src={image}
                                  alt={`Hotel ${idx + 1}`}
                                  className="h-20 object-cover rounded border border-gray-600"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleEditClick(hotel)}
                            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition flex items-center justify-center gap-2"
                          >
                            <Edit2 size={16} /> Edit
                          </button>
                          <button
                            onClick={() =>
                              handleToggleAvailability(
                                hotel.id,
                                hotel.available,
                              )
                            }
                            className={`flex-1 py-2 rounded text-sm font-medium transition ${
                              hotel.available
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-green-600 hover:bg-green-700 text-white"
                            }`}
                          >
                            {hotel.available ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-3 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by admin or action..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 text-sm"
                />
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Loading activities...</p>
                </div>
              ) : filteredActivities.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-400">No activities yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-700 border-b border-gray-700">
                        <th className="px-6 py-4 text-left font-semibold text-gray-200">
                          Admin
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-200">
                          Action
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-200">
                          Details
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-200">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredActivities.map((activity) => (
                        <tr
                          key={activity.id}
                          className="hover:bg-gray-750 transition"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-white font-medium">
                                {activity.user.name || "Admin"}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {activity.user.email}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-xs rounded font-medium">
                              {activity.action}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-300 max-w-xs truncate">
                            {activity.details || "—"}
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm">
                            {new Date(activity.timestamp).toLocaleDateString()}{" "}
                            {new Date(activity.timestamp).toLocaleTimeString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Loading activities...</p>
                </div>
              ) : filteredActivities.length === 0 ? (
                <div className="p-8 text-center bg-gray-800 rounded-lg">
                  <p className="text-gray-400">No activities yet</p>
                </div>
              ) : (
                filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750 transition"
                      onClick={() =>
                        setExpandedActivity(
                          expandedActivity === activity.id ? null : activity.id,
                        )
                      }
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">
                          {activity.action}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {activity.user.email}
                        </p>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition ml-2 ${
                          expandedActivity === activity.id ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {expandedActivity === activity.id && (
                      <div className="border-t border-gray-700 p-4 space-y-3 bg-gray-750">
                        <div>
                          <p className="text-gray-400 text-sm">Admin Name</p>
                          <p className="text-white font-medium">
                            {activity.user.name || "Admin"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400 text-sm">Details</p>
                          <p className="text-gray-300">
                            {activity.details || "No details"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400 text-sm">Time</p>
                          <p className="text-gray-300">
                            {new Date(activity.timestamp).toLocaleDateString()}{" "}
                            {new Date(activity.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal - Same as before */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingId ? "Edit Hotel" : "Add New Hotel"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="p-1 hover:bg-gray-700 rounded transition text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {formError}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hotel Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm disabled:opacity-50"
                    placeholder="e.g., Azure Paradise Resort"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm disabled:opacity-50"
                    placeholder="e.g., Maldives"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  disabled={isSubmitting}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm disabled:opacity-50"
                  placeholder="Hotel description..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price per Night *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.pricePerNight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pricePerNight: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm disabled:opacity-50"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Facilities (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.facilities}
                    onChange={(e) =>
                      setFormData({ ...formData, facilities: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm disabled:opacity-50"
                    placeholder="e.g., WiFi, Pool, Gym, Spa"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hotel Images
                </label>
                <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Upload size={18} />
                    <span className="text-sm">Click to upload images</span>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isSubmitting}
                    className="hidden"
                  />
                </label>

                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {formData.images.map((image, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={image}
                          alt={`Hotel ${idx + 1}`}
                          className="w-full h-24 object-cover rounded border border-gray-600"
                        />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                          type="button"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                {editingId ? "Update" : "Add"} Hotel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
