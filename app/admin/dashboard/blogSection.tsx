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
  BookOpen,
  ChevronDown,
  Tag,
  Upload,
  Globe,
  FileText,
  FolderEdit,
  ArrowRight,
} from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  author: string;
  tags: string[];
  published: boolean;
  viewCount: number;
  createdAt: string;
}

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  author: string;
  tags: string;
  published: boolean;
}

const DEFAULT_CATEGORIES = [
  "Travel Tips",
  "Destination Guide",
  "Travel Stories",
  "How-To",
  "Reviews",
];

const EMPTY_FORM: BlogFormData = {
  title: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  category: "Travel Tips",
  author: "HikinHigh Team",
  tags: "",
  published: false,
};

type ActiveView = "posts" | "categories";

export function BlogSection() {
  const [activeView, setActiveView] = useState<ActiveView>("posts");

  // Posts state
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");

  // Form / modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData>(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Feedback
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Categories state
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [newCategory, setNewCategory] = useState("");
  const [renamingCategory, setRenamingCategory] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs?all=true&limit=100", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch {
      setApiError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/blogs/categories?all=true", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success && data.categories?.length > 0) {
        // merge with defaults so we always have something
        const merged = Array.from(
          new Set([...DEFAULT_CATEGORIES, ...data.categories]),
        ) as string[];
        setCategories(merged);
      }
    } catch {
      // keep defaults
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // ── Filter ──────────────────────────────────────────────
  const filtered = blogs.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === "all" || b.category === categoryFilter;
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "published" ? b.published : !b.published);
    return matchSearch && matchCat && matchStatus;
  });

  // ── Modal helpers ────────────────────────────────────────
  const openAdd = () => {
    setFormData({ ...EMPTY_FORM, category: categories[0] || "Travel Tips" });
    setEditingId(null);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEdit = (blog: Blog) => {
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage,
      category: blog.category,
      author: blog.author,
      tags: blog.tags.join(", "),
      published: blog.published,
    });
    setEditingId(blog.id);
    setFormError("");
    setIsModalOpen(true);
  };

  // ── CRUD ────────────────────────────────────────────────
  const handleSave = async () => {
    if (!formData.title.trim()) {
      setFormError("Title is required");
      return;
    }
    if (!formData.excerpt.trim()) {
      setFormError("Excerpt is required");
      return;
    }
    if (!formData.content.trim()) {
      setFormError("Content is required");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const url = editingId ? `/api/blogs/${editingId}` : "/api/blogs";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");

      showSuccess(editingId ? "Blog updated!" : "Blog created!");
      setIsModalOpen(false);
      await fetchBlogs();
      await fetchCategories();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      showSuccess("Blog deleted!");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      await fetchCategories();
    } catch {
      setApiError("Failed to delete blog");
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    setUpdatingId(blog.id);
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ published: !blog.published }),
      });
      if (!res.ok) throw new Error("Failed");
      setBlogs((prev) =>
        prev.map((b) =>
          b.id === blog.id ? { ...b, published: !b.published } : b,
        ),
      );
      showSuccess(blog.published ? "Blog unpublished!" : "Blog published!");
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
          featuredImage: ev.target!.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // ── Category management ──────────────────────────────────
  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setCategories((prev) => [...prev, trimmed]);
    setNewCategory("");
    showSuccess(`Category "${trimmed}" added!`);
  };

  const handleDeleteCategory = async (cat: string) => {
    const postsInCat = blogs.filter((b) => b.category === cat).length;
    if (postsInCat > 0) {
      if (
        !window.confirm(
          `"${cat}" has ${postsInCat} post(s). Deleting it won't delete the posts but they'll keep the old category name. Continue?`,
        )
      )
        return;
    } else {
      if (!window.confirm(`Delete category "${cat}"?`)) return;
    }
    setCategories((prev) => prev.filter((c) => c !== cat));
    showSuccess(`Category "${cat}" removed!`);
  };

  const handleRenameCategory = async (oldCat: string) => {
    const trimmed = renameValue.trim();
    if (!trimmed || trimmed === oldCat) {
      setRenamingCategory(null);
      return;
    }

    setCategoryLoading(true);
    try {
      const res = await fetch("/api/blogs/categories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ oldCategory: oldCat, newCategory: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setCategories((prev) => prev.map((c) => (c === oldCat ? trimmed : c)));
      setBlogs((prev) =>
        prev.map((b) =>
          b.category === oldCat ? { ...b, category: trimmed } : b,
        ),
      );
      showSuccess(data.message);
      setRenamingCategory(null);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Failed to rename");
    } finally {
      setCategoryLoading(false);
    }
  };

  return (
    <>
      {/* ── View toggle ───────────────────────────────────── */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveView("posts")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
            activeView === "posts"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
          }`}
        >
          <FileText size={16} /> Blog Posts
        </button>
        <button
          onClick={() => setActiveView("categories")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
            activeView === "categories"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
          }`}
        >
          <FolderEdit size={16} /> Manage Categories
        </button>
      </div>

      {/* ── Alerts ───────────────────────────────────────── */}
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

      {/* ══════════════════════════════════════════════════ */}
      {/* POSTS VIEW                                         */}
      {/* ══════════════════════════════════════════════════ */}
      {activeView === "posts" && (
        <>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-3 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 text-sm"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm whitespace-nowrap cursor-pointer"
            >
              <Plus size={18} /> Add Blog
            </button>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-400">Loading blogs...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 mb-4">
                  {searchTerm ? "No blogs match your search" : "No blogs yet"}
                </p>
                {!searchTerm && (
                  <button
                    onClick={openAdd}
                    className="text-blue-400 hover:text-blue-300 cursor-pointer"
                  >
                    Write your first blog post
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-700 border-b border-gray-600">
                      <th className="px-6 py-4 text-left font-semibold text-gray-200">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-200">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-200">
                        Author
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-200">
                        Views
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-200">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-200">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-200">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filtered.map((blog) => (
                      <tr
                        key={blog.id}
                        className="hover:bg-gray-750 transition"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium line-clamp-1">
                              {blog.title}
                            </p>
                            <p className="text-gray-500 text-xs mt-0.5">
                              /{blog.slug}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-indigo-900/40 text-indigo-300 text-xs rounded">
                            {blog.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          {blog.author}
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          {blog.viewCount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            onClick={() => handleTogglePublish(blog)}
                            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
                              blog.published
                                ? "bg-green-900/30 text-green-300 hover:bg-green-900/50"
                                : "bg-yellow-900/30 text-yellow-300 hover:bg-yellow-900/50"
                            }`}
                          >
                            {updatingId === blog.id
                              ? "..."
                              : blog.published
                                ? "Published"
                                : "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-xs">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEdit(blog)}
                              className="p-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleTogglePublish(blog)}
                              disabled={updatingId === blog.id}
                              className={`p-2 cursor-pointer rounded transition ${blog.published ? "bg-gray-700 hover:bg-yellow-700 text-gray-300" : "bg-gray-700 hover:bg-green-700 text-gray-300"}`}
                              title={blog.published ? "Unpublish" : "Publish"}
                            >
                              {blog.published ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(blog.id, blog.title)}
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

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-400">Loading...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center bg-gray-800 rounded-lg">
                <p className="text-gray-400">No blogs found</p>
              </div>
            ) : (
              filtered.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
                >
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() =>
                      setExpandedId(expandedId === blog.id ? null : blog.id)
                    }
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-indigo-900/40 text-indigo-300 text-xs rounded">
                          {blog.category}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${blog.published ? "bg-green-900/30 text-green-300" : "bg-yellow-900/30 text-yellow-300"}`}
                        >
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <h3 className="text-white font-medium truncate">
                        {blog.title}
                      </h3>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition ml-2 ${expandedId === blog.id ? "rotate-180" : ""}`}
                    />
                  </div>
                  {expandedId === blog.id && (
                    <div className="border-t border-gray-700 p-4 space-y-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(blog)}
                          className="flex-1 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition flex items-center justify-center gap-2"
                        >
                          <Edit2 size={16} /> Edit
                        </button>
                        <button
                          onClick={() => handleTogglePublish(blog)}
                          disabled={updatingId === blog.id}
                          className={`flex-1 cursor-pointer py-2 rounded text-sm font-medium transition ${blog.published ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}`}
                        >
                          {blog.published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id, blog.title)}
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
        </>
      )}

      {activeView === "categories" && (
        <div className="mx-auto max-w-2xl lg:max-w-full">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
            <h3 className="text-white font-semibold text-lg mb-1">
              Blog Categories
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Add, rename, or remove categories. Renaming updates all existing
              posts automatically.
            </p>

            {/* Add new category */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                placeholder="New category name..."
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
              />
              <button
                onClick={handleAddCategory}
                disabled={!newCategory.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-40 cursor-pointer"
              >
                <Plus size={16} /> Add
              </button>
            </div>

            {/* Category list */}
            <div className="space-y-2">
              {categories.map((cat) => {
                const postCount = blogs.filter(
                  (b) => b.category === cat,
                ).length;
                const isRenaming = renamingCategory === cat;

                return (
                  <div
                    key={cat}
                    className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />

                    {isRenaming ? (
                      <input
                        type="text"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRenameCategory(cat);
                          if (e.key === "Escape") setRenamingCategory(null);
                        }}
                        autoFocus
                        className="flex-1 px-3 py-1 bg-gray-600 border border-blue-500 rounded text-white text-sm focus:outline-none"
                      />
                    ) : (
                      <span className="flex-1 text-white text-sm font-medium">
                        {cat}
                      </span>
                    )}

                    <span className="text-gray-400 text-xs whitespace-nowrap">
                      {postCount} post{postCount !== 1 ? "s" : ""}
                    </span>

                    {isRenaming ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleRenameCategory(cat)}
                          disabled={categoryLoading}
                          className="p-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs cursor-pointer transition"
                        >
                          {categoryLoading ? "..." : <CheckCircle size={14} />}
                        </button>
                        <button
                          onClick={() => setRenamingCategory(null)}
                          className="p-1.5 bg-gray-600 hover:bg-gray-500 text-white rounded cursor-pointer transition"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setRenamingCategory(cat);
                            setRenameValue(cat);
                          }}
                          className="p-1.5 bg-gray-600 hover:bg-blue-600 text-gray-300 hover:text-white rounded transition cursor-pointer"
                          title="Rename"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat)}
                          className="p-1.5 bg-gray-600 hover:bg-red-600 text-gray-300 hover:text-white rounded transition cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700/40 rounded-lg p-4">
            <div className="flex gap-2 text-yellow-300 text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>
                <strong>Renaming</strong> a category updates all blog posts with
                that category in the database instantly.{" "}
                <strong>Deleting</strong> a category only removes it from this
                list — existing posts keep their old category name until edited.
              </p>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-3xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <FileText size={20} className="text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {editingId ? "Edit Blog Post" : "New Blog Post"}
                </h2>
              </div>
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

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
                  placeholder="An Unforgettable Journey to the Himalayas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Excerpt <span className="text-red-400">*</span>{" "}
                  <span className="text-gray-500 font-normal">
                    (shown on listing cards)
                  </span>
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  disabled={isSubmitting}
                  rows={2}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50 resize-none"
                  placeholder="A short teaser that appears on the blog listing page..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  disabled={isSubmitting}
                  rows={10}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50 font-mono resize-y"
                  placeholder="Write your full blog content here..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
                    placeholder="HikinHigh Team"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Tag size={14} className="inline mr-1" />
                  Tags{" "}
                  <span className="text-gray-500 font-normal">
                    (comma-separated)
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
                  placeholder="trekking, himalaya, adventure"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Featured Image
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={
                      formData.featuredImage.startsWith("data:")
                        ? ""
                        : formData.featuredImage
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featuredImage: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
                    placeholder="https://images.unsplash.com/... or upload below"
                  />
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition text-gray-400 text-sm">
                    <Upload size={16} /> Upload image file
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isSubmitting}
                      className="hidden"
                    />
                  </label>
                  {formData.featuredImage && (
                    <div className="relative">
                      <img
                        src={formData.featuredImage}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, featuredImage: "" })
                        }
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-blue-400" />
                  <div>
                    <p className="text-white text-sm font-medium">
                      Publish immediately
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formData.published
                        ? "Visible to all visitors"
                        : "Save as draft — not visible to visitors"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, published: !formData.published })
                  }
                  disabled={isSubmitting}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${formData.published ? "bg-blue-600" : "bg-gray-600"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.published ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
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
                {editingId ? "Update Post" : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
