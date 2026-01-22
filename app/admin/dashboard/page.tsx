"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X, Search, LogOut } from "lucide-react";

interface Hotel {
  id: string | number;
  name: string;
  city: string;
  rooms: number;
  price: number;
}

const HotelDashboard = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    rooms: "",
    price: "",
  });
  const [formError, setFormError] = useState("");

  // Fetch hotels from database
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/hotels");
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setFormData({ name: "", city: "", rooms: "", price: "" });
    setEditingId(null);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleEditClick = (hotel: any) => {
    setFormData({
      name: hotel.name,
      city: hotel.city,
      rooms: hotel.rooms.toString(),
      price: hotel.price.toString(),
    });
    setEditingId(hotel.id);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setFormError("");

    if (
      !formData.name.trim() ||
      !formData.city.trim() ||
      !formData.rooms ||
      !formData.price
    ) {
      setFormError("Please fill all fields");
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        city: formData.city.trim(),
        rooms: parseInt(formData.rooms),
        price: parseFloat(formData.price),
      };

      if (editingId) {
        // Update existing hotel
        const response = await fetch(`/api/hotels/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Failed to update hotel");
      } else {
        // Add new hotel
        const response = await fetch("/api/hotels", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Failed to add hotel");
      }

      setIsModalOpen(false);
      fetchHotels();
    } catch (error) {
      setFormError(
        (error instanceof Error ? error.message : String(error)) ||
          "Something went wrong",
      );
    }
  };

  const handleRemove = async (id: string | number) => {
    if (window.confirm("Are you sure you want to deactivate this hotel?")) {
      try {
        const response = await fetch(`/api/hotels/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to deactivate hotel");
        fetchHotels();
      } catch (error) {
        console.error("Error deactivating hotel:", error);
        alert("Failed to deactivate hotel");
      }
    }
  };

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Hotel Management
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your hotel inventory
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition text-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
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
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm whitespace-nowrap"
          >
            <Plus size={18} /> Add Hotel
          </button>
        </div>

        {/* Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <p className="text-gray-400">Loading hotels...</p>
            </div>
          ) : filteredHotels.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400">
                {searchTerm ? "No hotels found" : "No hotels yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-700 border-b border-gray-700">
                    <th className="px-6 py-3 text-left font-medium text-gray-300">
                      Hotel Name
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-300">
                      City
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-300">
                      Rooms
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-300">
                      Price per Night
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHotels.map((hotel, index) => (
                    <tr
                      key={hotel.id}
                      className="border-b border-gray-700 hover:bg-gray-750 transition"
                    >
                      <td className="px-6 py-4 text-white font-medium">
                        {hotel.name}
                      </td>
                      <td className="px-6 py-4 text-gray-300">{hotel.city}</td>
                      <td className="px-6 py-4 text-gray-300">{hotel.rooms}</td>
                      <td className="px-6 py-4 text-gray-300">
                        ${hotel.price}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEditClick(hotel)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition"
                            title="Edit hotel"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleRemove(hotel.id)}
                            className="p-2 bg-gray-700 hover:bg-red-600 text-gray-300 rounded transition"
                            title="Delete hotel"
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
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingId ? "Edit Hotel" : "Add New Hotel"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-700 rounded transition text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm">
                {formError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Hotel Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm"
                  placeholder="Enter hotel name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm"
                  placeholder="Enter city name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Number of Rooms
                  </label>
                  <input
                    type="number"
                    value={formData.rooms}
                    onChange={(e) =>
                      setFormData({ ...formData, rooms: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Price per Night
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition font-medium text-sm"
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDashboard;
