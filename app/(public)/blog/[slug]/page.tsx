import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  ArrowLeft,
  Clock,
  Eye,
  Calendar,
  Share2,
  ChevronRight,
  BookOpen,
  Tag,
  User,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogData(slug: string) {
  try {
    const blog = await prisma.blog.findFirst({
      where: { slug, published: true },
    });

    if (!blog) return null;

    prisma.blog
      .update({ where: { id: blog.id }, data: { viewCount: { increment: 1 } } })
      .catch(() => {});

    return blog;
  } catch {
    return null;
  }
}

async function getRelatedBlogs(category: string, currentId: string) {
  try {
    return await prisma.blog.findMany({
      where: { published: true, category, id: { not: currentId } },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        category: true,
        createdAt: true,
        author: true,
        viewCount: true,
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, idx) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={idx} className="font-semibold text-slate-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={idx}>{part}</span>
    ),
  );
}

function renderContent(content: string) {
  if (!content) return null;
  const blocks = content.split(/\n\n+/).filter((b) => b.trim());

  return blocks.map((block, i) => {
    const t = block.trim();

    if (t.startsWith("### "))
      return (
        <h3 key={i} className="text-xl font-bold text-slate-900 mt-8 mb-3">
          {t.replace(/^### /, "")}
        </h3>
      );

    if (t.startsWith("## "))
      return (
        <h2
          key={i}
          className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-10 mb-4"
        >
          {t.replace(/^## /, "")}
        </h2>
      );

    if (t.startsWith("# "))
      return (
        <h1 key={i} className="text-3xl font-black text-slate-900 mt-10 mb-4">
          {t.replace(/^# /, "")}
        </h1>
      );

    if (t.startsWith("> "))
      return (
        <blockquote
          key={i}
          className="my-7 pl-5 border-l-4 border-emerald-400 bg-emerald-50 rounded-r-2xl py-4 pr-4"
        >
          <p className="text-slate-700 italic text-lg leading-relaxed font-medium">
            {t.replace(/^> /, "")}
          </p>
        </blockquote>
      );

    const lines = t.split("\n");
    const isBullets = lines.every((l) => /^[-*]\s/.test(l.trim()));
    if (isBullets)
      return (
        <ul key={i} className="my-5 space-y-2 pl-1">
          {lines.map((l, j) => (
            <li
              key={j}
              className="flex items-start gap-3 text-slate-700 leading-relaxed"
            >
              <span className="mt-2.5 shrink-0 w-2 h-2 rounded-full bg-emerald-500" />
              <span>{l.replace(/^[-*]\s+/, "")}</span>
            </li>
          ))}
        </ul>
      );

    return (
      <p key={i} className="text-slate-700 leading-[1.9] text-[1.05rem] my-5">
        {lines.map((line, j) => (
          <span key={j}>
            {renderInline(line)}
            {j < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogData(slug);

  if (!blog) return notFound();

  const related = await getRelatedBlogs(blog.category, blog.id);
  const readTime = estimateReadTime(blog.content);

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-all group text-sm font-semibold"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Adventure Journal
          </Link>
          <span className="hidden sm:block px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold uppercase tracking-wide text-xs">
            {blog.category}
          </span>
        </div>
      </nav>

      <header className="relative overflow-hidden bg-slate-900 min-h-105 md:min-h-125 flex items-end">
        {blog.featuredImage ? (
          <>
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-slate-900/10" />
          </>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900" />
        )}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-14 pt-16 w-full">
          <span className="inline-block bg-emerald-500 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-5">
            {blog.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.1] mb-5 tracking-tight">
            {blog.title}
          </h1>
          {blog.excerpt && (
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl font-light">
              {blog.excerpt}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-black text-sm">
                {(blog.author || "H").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-none">
                  {blog.author || "HikinHigh Team"}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">Author</p>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-700 hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(blog.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {readTime} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Eye size={14} />
              {blog.viewCount.toLocaleString()} views
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10 mb-8">
              {blog.content ? (
                renderContent(blog.content)
              ) : (
                <p className="text-slate-400 italic text-center py-12">
                  Content coming soon.
                </p>
              )}
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap items-center gap-2">
                <Tag size={15} className="text-slate-400" />
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-xs font-semibold rounded-full transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-8 flex gap-5 items-start text-white mb-6">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-2xl">
                {(blog.author || "H").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mb-1">
                  Written by
                </p>
                <p className="font-bold text-lg mb-2">
                  {blog.author || "HikinHigh Team"}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Expert trekking guide and adventure travel writer with years
                  of Himalayan expeditions, cultural immersions, and outdoor
                  adventures. Bringing you the best travel insights from the
                  field.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors"
                >
                  Get in touch <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Share2 size={16} className="text-emerald-500" />
                Found this helpful? Share it!
              </p>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(`https://hikinhigh.com/blog/${blog.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  𝕏 Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${blog.title} https://hikinhigh.com/blog/${blog.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </article>
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:sticky lg:top-20">
              <div className="bg-slate-900 px-5 py-4">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest">
                  Article Info
                </h3>
              </div>
              <div className="p-5 space-y-4">
                {[
                  {
                    icon: <Clock size={14} />,
                    label: "Read time",
                    value: `${readTime} min`,
                  },
                  {
                    icon: <Eye size={14} />,
                    label: "Views",
                    value: blog.viewCount.toLocaleString(),
                  },
                  {
                    icon: <Calendar size={14} />,
                    label: "Published",
                    value: formatDate(blog.createdAt),
                  },
                  {
                    icon: <User size={14} />,
                    label: "Author",
                    value: blog.author || "HikinHigh Team",
                  },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-slate-500 flex items-center gap-2">
                      {icon} {label}
                    </span>
                    <span className="font-bold text-slate-800 text-xs text-right max-w-35 truncate">
                      {value}
                    </span>
                  </div>
                ))}

                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wider">
                    Category
                  </p>
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                    {blog.category}
                  </span>
                </div>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="pt-1 border-t border-slate-100">
                    <p className="text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wider">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {blog.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 bg-slate-100 text-slate-600 text-[11px] font-medium rounded"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="px-5 pb-5 space-y-2">
                <Link
                  href="/activities"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  Explore Activities <ChevronRight size={16} />
                </Link>
                <Link
                  href="/hotel"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-colors"
                >
                  Browse Hotels <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-emerald-600" />
                <h2 className="text-2xl font-black text-slate-900">
                  More from {blog.category}
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-emerald-50 to-slate-100">
                        <BookOpen className="w-8 h-8 text-slate-300" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
                      <Calendar size={11} />
                      {formatDate(post.createdAt)}
                    </p>
                    <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-emerald-600 text-sm font-bold">
                      Read More <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 rounded-3xl overflow-hidden relative bg-slate-900">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 p-8 md:p-14 text-white text-center">
            <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-3">
              HikinHigh Travels
            </p>
            <h2 className="text-2xl md:text-4xl font-black mb-4 leading-tight">
              Ready for your next adventure?
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              From Himalayan treks to Kerala backwaters — let us craft your
              perfect journey. Expert guides, seamless booking, unforgettable
              memories.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/activities"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-colors text-sm"
              >
                Browse Activities
              </Link>
              <Link
                href="/hotel"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors text-sm border border-white/20"
              >
                Find Hotels
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors text-sm border border-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
