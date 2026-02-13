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
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BookingsSection } from "./booking-section";
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
  name: string;
  location: string;
  description: string;
  pricePerPerson: string;
  duration: string;
  images: string[];
  createdAt: string;
}

interface Booking {
  id: string;
  bookingType: "HOTEL" | "ACTIVITY";
  itemId: string;
  itemName: string;
  itemLocation: string;
  itemImage: string | null;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  startDate?: string;
  endDate?: string;
  nights?: number;
  rooms?: number;
  date?: string;
  people?: number;
  duration?: string;
  pricePerUnit: string;
  totalPrice: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  paymentId: string | null;
  createdAt: string;
}

interface ActivityLog {
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
  price: string;
  duration?: string;
  facilities?: string;
  images: string[];
}

type TabType = "hotels" | "activities" | "bookings";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("hotels");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [bookingFilter, setBookingFilter] = useState<
    "all" | "hotel" | "activity"
  >("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "PENDING" | "CONFIRMED" | "CANCELLED"
  >("all");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
    description: "",
    price: "",
    duration: "",
    facilities: "",
    images: [],
  });

  const tabConfig = {
    hotels: {
      label: "Hotels",
      endpoint: "/api/hotels",
      addLabel: "Add Hotel",
      modalTitle: (editing: boolean) =>
        editing ? "Edit Hotel" : "Add New Hotel",
      successMsg: (editing: boolean) =>
        editing ? "Hotel updated successfully!" : "Hotel added successfully!",
      fields: [
        "name",
        "location",
        "description",
        "price",
        "facilities",
        "images",
      ] as const,
      priceLabel: "Price per Night ($)",
      extraField: "facilities",
      hasToggle: true,
    },
    activities: {
      label: "Activities",
      endpoint: "/api/activity-management",
      addLabel: "Add Activity",
      modalTitle: (editing: boolean) =>
        editing ? "Edit Activity" : "Add New Activity",
      successMsg: (editing: boolean) =>
        editing
          ? "Activity updated successfully!"
          : "Activity added successfully!",
      fields: [
        "name",
        "location",
        "description",
        "price",
        "duration",
        "images",
      ] as const,
      priceLabel: "Price per Person ($)",
      extraField: "duration",
      hasToggle: false,
    },
    bookings: {
      label: "Bookings",
      endpoint: "/api/admin/booking",
      addLabel: "",
      modalTitle: () => "",
      successMsg: () => "",
      fields: [] as const,
      priceLabel: "",
      extraField: "",
      hasToggle: false,
    },
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, bookingFilter, statusFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === "hotels") {
        await fetchItems("hotels");
      } else if (activeTab === "activities") {
        await fetchItems("activities");
      } else if (activeTab === "bookings") {
        await fetchBookings();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async (type: Exclude<TabType, "bookings">) => {
    try {
      const endpoint = tabConfig[type].endpoint;
      const response = await fetch(endpoint, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch ${type}: ${response.status}`);
      }

      if (!contentType?.includes("application/json")) {
        throw new Error(`Expected JSON but got ${contentType}`);
      }

      const data = await response.json();

      if (type === "hotels") setHotels(data);
      else if (type === "activities") setActivities(data);
      else setLogs(data);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      setFormError(
        `Failed to load ${type}: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const fetchBookings = async () => {
    try {
      let url = "/api/admin/booking";
      const params = new URLSearchParams();

      if (bookingFilter !== "all") {
        params.append("type", bookingFilter);
      }
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch bookings");

      const data = await response.json();
      setBookings(data.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setFormError("Failed to load bookings");
    }
  };

  const handleAddClick = () => {
    setFormData({
      name: "",
      location: "",
      description: "",
      price: "",
      duration: activeTab === "activities" ? "" : undefined,
      facilities: activeTab === "hotels" ? "" : undefined,
      images: [],
    });
    setEditingId(null);
    setFormError("");
    setSuccessMessage("");
    setIsModalOpen(true);
  };

  const handleEditClick = (item: Hotel | Activity) => {
    if (activeTab === "hotels") {
      const hotel = item as Hotel;
      setFormData({
        name: hotel.name,
        location: hotel.location,
        description: "",
        price: hotel.pricePerNight,
        facilities: (hotel.facilities || []).join(", "),
        images: hotel.images || [],
      });
    } else {
      const activity = item as Activity;
      setFormData({
        name: activity.name,
        location: activity.location,
        description: activity.description,
        price: activity.pricePerPerson,
        duration: activity.duration,
        images: activity.images || [],
      });
    }
    setEditingId(item.id);
    setFormError("");
    setSuccessMessage("");
    setIsModalOpen(true);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setFormError("Name is required");
      return false;
    }
    if (!formData.location.trim()) {
      setFormError("Location is required");
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setFormError("Valid price is required");
      return false;
    }
    if (activeTab === "activities" && !formData.duration?.trim()) {
      setFormError("Duration is required");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const endpoint = tabConfig[activeTab].endpoint;

      let payload: any = {
        name: formData.name.trim(),
        location: formData.location.trim(),
        description: formData.description.trim(),
        [activeTab === "hotels" ? "pricePerNight" : "pricePerPerson"]:
          parseFloat(formData.price),
        images: formData.images,
      };

      if (activeTab === "hotels") {
        payload.facilities =
          formData.facilities
            ?.split(",")
            .map((f) => f.trim())
            .filter((f) => f.length > 0) || [];
      } else {
        payload.duration = formData.duration;
      }

      const response = await fetch(
        editingId ? `${endpoint}/${editingId}` : endpoint,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Operation failed");
      }

      setSuccessMessage(tabConfig[activeTab].successMsg(!!editingId));
      setIsModalOpen(false);
      await fetchItems(activeTab as Exclude<TabType, "bookings">);
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
        credentials: "include",
        body: JSON.stringify({ available: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update availability");

      setSuccessMessage(
        !currentStatus ? "Hotel activated!" : "Hotel deactivated!",
      );
      await fetchItems("hotels");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Operation failed");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

    try {
      const endpoint = tabConfig[activeTab].endpoint;
      const response = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setSuccessMessage("Deleted successfully!");
      await fetchItems(activeTab as Exclude<TabType, "bookings">);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Delete failed");
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

  const getFilteredItems = () => {
    if (activeTab === "hotels") {
      return hotels.filter(
        (h) =>
          h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } else if (activeTab === "activities") {
      return activities.filter(
        (a) =>
          a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } else if (activeTab === "bookings") {
      return bookings.filter(
        (b) =>
          b.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.userName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    return [];
  };

  const filteredItems = getFilteredItems();
  const currentConfig = tabConfig[activeTab];

  return (
    <div className="min-h-screen bg-gray-900">
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
              await fetch("/api/auth/admin-logout", {
                method: "POST",
                credentials: "include",
              });
              router.push("/admin/login");
            }}
            className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="bg-gray-800 border-b border-gray-700 sticky top-18 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-8 overflow-x-auto">
            {(["hotels", "activities", "bookings"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 cursor-pointer px-2 font-medium transition border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? "text-blue-400 border-blue-400"
                    : "text-gray-400 border-transparent hover:text-gray-300"
                }`}
              >
                {tabConfig[tab].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
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

        {activeTab !== "bookings" && (
          <>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-3 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder={`Search ${currentConfig.label.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 text-sm"
                />
              </div>
              <button
                onClick={handleAddClick}
                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start"
              >
                <Plus size={18} /> {currentConfig.addLabel}
              </button>
            </div>

            <div className="hidden md:block bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Loading...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-400 mb-4">
                    {searchTerm
                      ? "No results found"
                      : `No ${currentConfig.label.toLowerCase()} yet`}
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={handleAddClick}
                      className="text-blue-400 cursor-pointer hover:text-blue-300"
                    >
                      Add your first{" "}
                      {currentConfig.label.toLowerCase().slice(0, -1)}
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
                          Price
                        </th>
                        {activeTab === "hotels" && (
                          <th className="px-6 py-4 text-left font-semibold text-gray-200">
                            Facilities
                          </th>
                        )}
                        {activeTab === "activities" && (
                          <th className="px-6 py-4 text-left font-semibold text-gray-200">
                            Duration
                          </th>
                        )}
                        {activeTab === "hotels" && (
                          <th className="px-6 py-4 text-left font-semibold text-gray-200">
                            Status
                          </th>
                        )}
                        <th className="px-6 py-4 text-left font-semibold text-gray-200">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredItems.map((item: any) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-750 transition"
                        >
                          <td className="px-6 py-4 text-white font-medium">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {item.location}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            $
                            {activeTab === "hotels"
                              ? item.pricePerNight
                              : item.pricePerPerson}
                          </td>
                          {activeTab === "hotels" && (
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {item.facilities?.length > 0 ? (
                                  item.facilities.map(
                                    (f: string, idx: number) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded"
                                      >
                                        {f}
                                      </span>
                                    ),
                                  )
                                ) : (
                                  <span className="text-gray-500 text-xs">
                                    —
                                  </span>
                                )}
                              </div>
                            </td>
                          )}
                          {activeTab === "activities" && (
                            <td className="px-6 py-4 text-gray-300">
                              {item.duration}
                            </td>
                          )}
                          {activeTab === "hotels" && (
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
                                  item.available
                                    ? "bg-green-900/30 text-green-300 hover:bg-green-900/50"
                                    : "bg-red-900/30 text-red-300 hover:bg-red-900/50"
                                }`}
                                onClick={() =>
                                  handleToggleAvailability(
                                    item.id,
                                    item.available,
                                  )
                                }
                              >
                                {item.available ? "Active" : "Inactive"}
                              </span>
                            </td>
                          )}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditClick(item)}
                                className="p-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition"
                              >
                                <Edit2 size={16} />
                              </button>
                              {activeTab === "hotels" ? (
                                <button
                                  onClick={() =>
                                    handleToggleAvailability(
                                      item.id,
                                      item.available,
                                    )
                                  }
                                  className={`p-2 cursor-pointer rounded transition ${
                                    item.available
                                      ? "bg-gray-700 hover:bg-red-600 text-gray-300"
                                      : "bg-gray-700 hover:bg-green-600 text-gray-300"
                                  }`}
                                >
                                  <Trash2 size={16} />
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleDelete(item.id, item.name)
                                  }
                                  className="p-2 cursor-pointer bg-gray-700 hover:bg-red-600 text-gray-300 rounded transition"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="md:hidden space-y-3">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Loading...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="p-8 text-center bg-gray-800 rounded-lg">
                  <p className="text-gray-400 mb-4">
                    {searchTerm
                      ? "No results found"
                      : `No ${currentConfig.label.toLowerCase()} yet`}
                  </p>
                </div>
              ) : (
                filteredItems.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750 transition"
                      onClick={() =>
                        setExpandedId(expandedId === item.id ? null : item.id)
                      }
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          $
                          {activeTab === "hotels"
                            ? item.pricePerNight
                            : item.pricePerPerson}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 ml-4">
                        {activeTab === "hotels" && (
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                              item.available
                                ? "bg-green-900/30 text-green-300"
                                : "bg-red-900/30 text-red-300"
                            }`}
                          >
                            {item.available ? "Active" : "Inactive"}
                          </span>
                        )}
                        <ChevronDown
                          size={20}
                          className={`text-gray-400 transition ${expandedId === item.id ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>

                    {expandedId === item.id && (
                      <div className="border-t border-gray-700 p-4 space-y-4 bg-gray-750">
                        <div>
                          <p className="text-gray-400 text-sm">Location</p>
                          <p className="text-white font-medium">
                            {item.location}
                          </p>
                        </div>

                        {activeTab === "activities" && (
                          <div>
                            <p className="text-gray-400 text-sm">Duration</p>
                            <p className="text-white font-medium">
                              {item.duration}
                            </p>
                          </div>
                        )}

                        {item.description && (
                          <div>
                            <p className="text-gray-400 text-sm">Description</p>
                            <p className="text-gray-300 text-sm">
                              {item.description}
                            </p>
                          </div>
                        )}

                        {activeTab === "hotels" &&
                          item.facilities?.length > 0 && (
                            <div>
                              <p className="text-gray-400 text-sm mb-2">
                                Facilities
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {item.facilities.map(
                                  (f: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded"
                                    >
                                      {f}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                        {item.images?.length > 0 && (
                          <div>
                            <p className="text-gray-400 text-sm mb-2">Images</p>
                            <div className="grid grid-cols-2 gap-2">
                              {item.images
                                .slice(0, 4)
                                .map((img: string, idx: number) => (
                                  <img
                                    key={idx}
                                    src={img}
                                    alt={`${item.name} ${idx + 1}`}
                                    className="h-20 object-cover rounded border border-gray-600"
                                  />
                                ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="flex-1 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition flex items-center justify-center gap-2"
                          >
                            <Edit2 size={16} /> Edit
                          </button>
                          {activeTab === "hotels" ? (
                            <button
                              onClick={() =>
                                handleToggleAvailability(
                                  item.id,
                                  item.available,
                                )
                              }
                              className={`flex-1 cursor-pointer py-2 rounded text-sm font-medium transition ${
                                item.available
                                  ? "bg-red-600 hover:bg-red-700 text-white"
                                  : "bg-green-600 hover:bg-green-700 text-white"
                              }`}
                            >
                              {item.available ? "Deactivate" : "Activate"}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDelete(item.id, item.name)}
                              className="flex-1 cursor-pointer py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === "bookings" && (
          <BookingsSection
            bookings={bookings}
            loading={loading}
            onBookingUpdated={(updatedBooking) => {
              setBookings((prev) =>
                prev.map((b) =>
                  b.id === updatedBooking.id ? updatedBooking : b,
                ),
              );
            }}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            bookingFilter={bookingFilter}
            onBookingFilterChange={setBookingFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        )}
      </div>

      {isModalOpen && activeTab !== "bookings" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {currentConfig.modalTitle(!!editingId)}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="p-1 cursor-pointer hover:bg-gray-700 rounded transition text-gray-400"
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
                    {activeTab === "hotels" ? "Hotel" : "Activity"} Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm disabled:opacity-50"
                    placeholder={
                      activeTab === "hotels"
                        ? "e.g., Azure Paradise Resort"
                        : "e.g., Taj Mahal Sunrise Tour"
                    }
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
                    placeholder="e.g., Agra, Uttar Pradesh"
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
                  placeholder="Description..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {currentConfig.priceLabel} *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm disabled:opacity-50"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {activeTab === "activities" ? "Duration" : "Facilities"}{" "}
                    {activeTab === "activities" ? "*" : ""}
                  </label>
                  <input
                    type="text"
                    value={
                      activeTab === "activities"
                        ? formData.duration
                        : formData.facilities
                    }
                    onChange={(e) =>
                      activeTab === "activities"
                        ? setFormData({ ...formData, duration: e.target.value })
                        : setFormData({
                            ...formData,
                            facilities: e.target.value,
                          })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm disabled:opacity-50"
                    placeholder={
                      activeTab === "activities"
                        ? "e.g., 4 hours, Full Day"
                        : "e.g., WiFi, Pool, Gym, Spa"
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {activeTab === "hotels" ? "Hotel" : "Activity"} Images
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
                          alt={`Image ${idx + 1}`}
                          className="w-full h-24 object-cover rounded border border-gray-600"
                        />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute cursor-pointer top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
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
                className="flex-1 cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="flex-1 cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                {editingId ? "Update" : "Add"}{" "}
                {activeTab === "hotels" ? "Hotel" : "Activity"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
