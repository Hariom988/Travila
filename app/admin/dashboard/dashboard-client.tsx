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
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Hotel {
  id: string;
  name: string;
  location: string;
  pricePerNight: string;
  available: boolean;
  createdAt: string;
}

interface FormData {
  name: string;
  location: string;
  description: string;
  pricePerNight: string;
}

export default function HotelManagementDashboard() {
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
    description: "",
    pricePerNight: "",
  });

  // Fetch hotels on component mount
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/hotels");
      if (!response.ok) throw new Error("Failed to fetch hotels");
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setFormError("Failed to load hotels");
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setFormData({ name: "", location: "", description: "", pricePerNight: "" });
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
      const payload = {
        name: formData.name.trim(),
        location: formData.location.trim(),
        description: formData.description.trim(),
        pricePerNight: parseFloat(formData.pricePerNight),
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
      fetchHotels();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/hotels/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete hotel");
      }

      setSuccessMessage("Hotel deleted successfully!");
      fetchHotels();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Delete failed");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/admin-logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Hotel Management</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your hotel inventory
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg flex items-center gap-3 text-green-300">
            <CheckCircle size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {formError && !isModalOpen && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-center gap-3 text-red-300">
            <AlertCircle size={20} />
            <span>{formError}</span>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 text-gray-500" size={18} />
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
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium whitespace-nowrap"
          >
            <Plus size={18} /> Add Hotel
          </button>
        </div>

        {/* Hotels Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
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
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredHotels.map((hotel) => (
                    <tr key={hotel.id} className="hover:bg-gray-750 transition">
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
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            hotel.available
                              ? "bg-green-900/30 text-green-300"
                              : "bg-red-900/30 text-red-300"
                          }`}
                        >
                          {hotel.available ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditClick(hotel)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(hotel.id, hotel.name)}
                            className="p-2 bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white rounded transition"
                            title="Delete"
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
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

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price per Night *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.pricePerNight}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerNight: e.target.value })
                  }
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm disabled:opacity-50"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
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
