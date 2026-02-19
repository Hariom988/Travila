"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Upload,
  Star,
  Users,
  Globe,
  MapPin,
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  country: string;
  image: string;
  rating: number;
  text: string;
  tour: string;
  isIndian: boolean;
  published: boolean;
  order: number;
  createdAt: string;
}

interface TestimonialFormData {
  name: string;
  location: string;
  country: string;
  image: string;
  rating: number;
  text: string;
  tour: string;
  isIndian: boolean;
  published: boolean;
  order: number;
}

const EMPTY_FORM: TestimonialFormData = {
  name: "",
  location: "",
  country: "",
  image: "",
  rating: 5,
  text: "",
  tour: "",
  isIndian: false,
  published: true,
  order: 0,
};

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "hidden"
  >("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials", { credentials: "include" });
      const data = await res.json();
      if (data.success) setTestimonials(data.data);
    } catch {
      setApiError("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const filtered = testimonials.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tour.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "published" ? t.published : !t.published);
    return matchSearch && matchStatus;
  });

  const stats = {
    total: testimonials.length,
    published: testimonials.filter((t) => t.published).length,
    indian: testimonials.filter((t) => t.isIndian).length,
  };

  const openAdd = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setFormData({
      name: t.name,
      location: t.location,
      country: t.country,
      image: t.image,
      rating: t.rating,
      text: t.text,
      tour: t.tour,
      isIndian: t.isIndian,
      published: t.published,
      order: t.order,
    });
    setEditingId(t.id);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setFormError("Name is required");
      return;
    }
    if (!formData.text.trim()) {
      setFormError("Testimonial text is required");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const url = editingId
        ? `/api/testimonials/${editingId}`
        : "/api/testimonials";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");

      showSuccess(editingId ? "Testimonial updated!" : "Testimonial created!");
      setIsModalOpen(false);
      await fetchTestimonials();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !window.confirm(
        `Delete testimonial from "${name}"? This cannot be undone.`,
      )
    )
      return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      showSuccess("Testimonial deleted!");
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setApiError("Failed to delete testimonial");
    }
  };

  const handleTogglePublish = async (t: Testimonial) => {
    setUpdatingId(t.id);
    try {
      const res = await fetch(`/api/testimonials/${t.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ published: !t.published }),
      });
      if (!res.ok) throw new Error("Failed");
      setTestimonials((prev) =>
        prev.map((item) =>
          item.id === t.id ? { ...item, published: !item.published } : item,
        ),
      );
      showSuccess(
        t.published ? "Testimonial hidden!" : "Testimonial published!",
      );
    } catch {
      setApiError("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") {
        setFormData((prev) => ({
          ...prev,
          image: ev.target!.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const StarRating = ({
    value,
    onChange,
  }: {
    value: number;
    onChange?: (v: number) => void;
  }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className={`transition ${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
        >
          <Star
            size={20}
            className={
              star <= value
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-600"
            }
          />
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: stats.total, color: "text-blue-400" },
          {
            label: "Published",
            value: stats.published,
            color: "text-green-400",
          },
          {
            label: "Indian Travelers",
            value: stats.indian,
            color: "text-orange-400",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center"
          >
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-gray-400 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {apiError && (
        <div className="mb-4 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-center gap-3 text-red-300">
          <AlertCircle size={20} />
          <span>{apiError}</span>
          <button
            onClick={() => setApiError("")}
            className="ml-auto cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-900/30 border border-green-700 rounded-lg flex items-center gap-3 text-green-300">
          <CheckCircle size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 cursor-pointer py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm whitespace-nowrap cursor-pointer"
        >
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      <div className="hidden md:block bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400">Loading testimonials...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 mb-4">
              {searchTerm
                ? "No testimonials match your search"
                : "No testimonials yet"}
            </p>
            {!searchTerm && (
              <button
                onClick={openAdd}
                className="text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                Add your first testimonial
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-700 border-b border-gray-600">
                  {[
                    "Person",
                    "Tour",
                    "Rating",
                    "Origin",
                    "Order",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left font-semibold text-gray-200"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-750 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {t.image ? (
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-9 h-9 rounded-full object-cover border border-gray-600"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 font-bold text-sm">
                            {t.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium">{t.name}</p>
                          <p className="text-gray-500 text-xs flex items-center gap-1">
                            <MapPin size={10} /> {t.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-indigo-900/40 text-indigo-300 text-xs rounded">
                        {t.tour || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={13}
                            className={
                              s <= t.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-600"
                            }
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {t.isIndian ? (
                          <span className="px-2 py-1 bg-orange-900/30 text-orange-300 text-xs rounded flex items-center gap-1">
                            🇮🇳 Indian
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded flex items-center gap-1">
                            <Globe size={10} /> International
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {t.order}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => handleTogglePublish(t)}
                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
                          t.published
                            ? "bg-green-900/30 text-green-300 hover:bg-green-900/50"
                            : "bg-yellow-900/30 text-yellow-300 hover:bg-yellow-900/50"
                        }`}
                      >
                        {updatingId === t.id
                          ? "..."
                          : t.published
                            ? "Published"
                            : "Hidden"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(t)}
                          className="p-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleTogglePublish(t)}
                          disabled={updatingId === t.id}
                          className="p-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition"
                          title={t.published ? "Hide" : "Publish"}
                        >
                          {t.published ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(t.id, t.name)}
                          className="p-2 cursor-pointer bg-gray-700 hover:bg-red-600 text-gray-300 rounded transition"
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

      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center bg-gray-800 rounded-lg">
            <p className="text-gray-400">No testimonials found</p>
          </div>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-600 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 font-bold shrink-0">
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          t.published
                            ? "bg-green-900/30 text-green-300"
                            : "bg-yellow-900/30 text-yellow-300"
                        }`}
                      >
                        {t.published ? "Published" : "Hidden"}
                      </span>
                    </div>
                    <h3 className="text-white font-medium truncate">
                      {t.name}
                    </h3>
                    <p className="text-gray-400 text-xs truncate">
                      {t.tour || t.location}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition ml-2 ${expandedId === t.id ? "rotate-180" : ""}`}
                />
              </div>
              {expandedId === t.id && (
                <div className="border-t border-gray-700 p-4">
                  <p className="text-gray-400 text-sm italic mb-3">
                    "{t.text}"
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(t)}
                      className="flex-1 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition flex items-center justify-center gap-2"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleTogglePublish(t)}
                      disabled={updatingId === t.id}
                      className={`flex-1 cursor-pointer py-2 rounded text-sm font-medium transition ${
                        t.published
                          ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {t.published ? "Hide" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDelete(t.id, t.name)}
                      className="flex-1 cursor-pointer py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">
                {editingId ? "Edit Testimonial" : "New Testimonial"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="p-1 hover:bg-gray-700 rounded transition text-gray-400 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {formError && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm flex items-center gap-2">
                  <AlertCircle size={16} /> {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
                    placeholder="e.g., Rajesh Kumar"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
                    placeholder="e.g., Delhi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
                    placeholder="e.g., India 🇮🇳"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tour / Trek
                  </label>
                  <input
                    type="text"
                    value={formData.tour}
                    onChange={(e) =>
                      setFormData({ ...formData, tour: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
                    placeholder="e.g., Roopkund Trek"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Testimonial Text <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50 resize-none"
                  placeholder="What did the traveler say about their experience..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center gap-3 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        className="cursor-pointer hover:scale-110 transition"
                      >
                        <Star
                          size={24}
                          className={
                            star <= formData.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }
                        />
                      </button>
                    ))}
                    <span className="text-gray-400 text-sm ml-1">
                      {formData.rating}/5
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Profile Image
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={
                      formData.image.startsWith("data:") ? "" : formData.image
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
                    placeholder="Upload your image..."
                  />
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition text-gray-400 text-sm">
                    <Upload size={16} /> Upload profile image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isSubmitting}
                      className="hidden"
                    />
                  </label>
                  {formData.image && (
                    <div className="flex items-center gap-3">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: "" })}
                        className="text-red-400 hover:text-red-300 text-sm cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇮🇳</span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Indian Traveler
                      </p>
                      <p className="text-gray-400 text-xs">
                        {formData.isIndian
                          ? "Marked as Indian"
                          : "International traveler"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, isIndian: !formData.isIndian })
                    }
                    disabled={isSubmitting}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      formData.isIndian ? "bg-orange-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.isIndian ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-blue-400" />
                    <div>
                      <p className="text-white text-sm font-medium">
                        Published
                      </p>
                      <p className="text-gray-400 text-xs">
                        {formData.published
                          ? "Visible on homepage"
                          : "Hidden from homepage"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        published: !formData.published,
                      })
                    }
                    disabled={isSubmitting}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      formData.published ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.published ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 px-6 py-5 border-t border-gray-700">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="flex-1 cursor-pointer px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="flex-1 cursor-pointer px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
