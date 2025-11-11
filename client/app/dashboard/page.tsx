"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { flashcardsApi } from "@/lib/api";
import { Category } from "@/types";

export default function Dashboard() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await flashcardsApi.getCategories();
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-200 flex items-center gap-3">
          <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-700 font-medium">
            Loading your flashcards...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Beautiful Background */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-br from-violet-200/30 to-fuchsia-200/30 rounded-full blur-3xl"></div>

        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/80 backdrop-blur-sm"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📚 Flashcards
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/test-history")}
              className="btn btn-secondary"
            >
              📊 Test History
            </button>
            <button onClick={handleLogout} className="btn btn-secondary">
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with more padding */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-black mb-6 mt-5 p-10">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Flashcards
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Choose a category to start learning
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Category Header */}
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300 inline-block">
                    {category.name}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Flashcard Count Badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold shadow-lg">
                    📝 {category.flashcardCount} flashcards
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push(`/flashcards/${category.id}`)}
                    className="btn btn-primary flex-1"
                  >
                    📖 Study
                  </button>
                  <button
                    onClick={() => router.push(`/test/${category.id}`)}
                    className="btn btn-secondary flex-1"
                  >
                    ✅ Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
