'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📚</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Flashcards Pro
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/login')}
              className="px-5 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/register')}
              className="px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Beautiful Glass Background */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Gradient Background with Glass Effect */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-float-delayed"></div>

          {/* Glass overlay */}
          <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-b from-white/70 via-white/50 to-white"></div>

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgb(229 231 235 / 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(229 231 235 / 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-blue-700 font-medium mb-6 text-sm">
              <span>✨</span>
              <span>Learn Smarter, Not Harder</span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
              Master{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Full-Stack Development
              </span>
              <br />
              with Interactive Flashcards
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Learn SQL, .NET, Java, JavaScript, and Python through beautifully crafted flashcards and interactive quizzes.
              Perfect for developers at any level.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center mb-12">
              <button
                onClick={() => router.push('/register')}
                className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105 transition-all text-lg"
              >
                Start Learning Free →
              </button>
              <button
                onClick={() => router.push('/login')}
                className="px-8 py-4 rounded-xl font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all text-lg"
              >
                View Demo
              </button>
            </div>

            {/* Social Proof with Colorful Avatars */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white"></div>
                </div>
                <span className="font-medium">1,000+ developers</span>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                <span className="ml-1 font-medium">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Beautiful Cards */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Glass Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-purple-50/60"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>

        <div className="max-w-7xl mx-auto relative">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything you need to excel</h2>
          <p className="text-xl text-gray-600">Powerful tools designed for modern developers</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: '🎯',
              title: 'Focused Learning',
              desc: 'Curated flashcards covering essential concepts',
              gradient: 'from-blue-500 to-cyan-500',
              bgGradient: 'from-blue-50 to-cyan-50'
            },
            {
              icon: '✅',
              title: 'Test Your Skills',
              desc: 'Interactive quizzes to validate understanding',
              gradient: 'from-purple-500 to-pink-500',
              bgGradient: 'from-purple-50 to-pink-50'
            },
            {
              icon: '📊',
              title: 'Track Progress',
              desc: 'Monitor your learning journey with analytics',
              gradient: 'from-orange-500 to-red-500',
              bgGradient: 'from-orange-50 to-red-50'
            },
            {
              icon: '🔒',
              title: 'Secure & Private',
              desc: 'Protected with JWT authentication and 2FA',
              gradient: 'from-green-500 to-teal-500',
              bgGradient: 'from-green-50 to-teal-50'
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`relative group bg-gradient-to-br ${feature.bgGradient} rounded-2xl p-8 border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <div className="relative">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Technologies Section - Beautiful Cards */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Gradient with floating orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Master <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">5 Core Technologies</span>
          </h2>
          <p className="text-xl text-gray-600">50 carefully crafted flashcards across popular programming languages</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { emoji: '🗄️', name: 'SQL', desc: 'Databases', gradient: 'from-blue-500 to-cyan-500', bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50' },
            { emoji: '⚙️', name: '.NET', desc: 'C# & ASP.NET', gradient: 'from-purple-500 to-violet-500', bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50' },
            { emoji: '☕', name: 'Java', desc: 'Core Java', gradient: 'from-orange-500 to-red-500', bgColor: 'bg-gradient-to-br from-orange-50 to-red-50' },
            { emoji: '💛', name: 'JavaScript', desc: 'Modern JS', gradient: 'from-yellow-500 to-amber-500', bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-50' },
            { emoji: '🐍', name: 'Python', desc: 'Python 3', gradient: 'from-green-500 to-emerald-500', bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50' },
          ].map((tech, i) => (
            <div
              key={i}
              className={`relative group ${tech.bgColor} rounded-2xl p-6 text-center border-2 border-transparent hover:border-gray-200 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer`}
            >
              <div className="text-6xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                {tech.emoji}
              </div>
              <h3 className={`text-xl font-bold mb-1 bg-gradient-to-r ${tech.gradient} bg-clip-text text-transparent`}>
                {tech.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{tech.desc}</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${tech.gradient} text-white text-xs font-semibold shadow-lg`}>
                10 Cards
              </span>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Stats Section - Glass Card */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl p-16 text-center overflow-hidden border border-white/50 shadow-2xl">
          {/* Glass background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-xl"></div>
          <div className="absolute inset-0 bg-white/40"></div>

          {/* Content */}
          <div className="relative">
            <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trusted by developers worldwide
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '1,000+', label: 'Active Learners' },
                { number: '50', label: 'Flashcards' },
                { number: '5', label: 'Technologies' },
                { number: '4.9/5', label: 'Rating' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Beautiful gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 via-fuchsia-100/50 to-pink-100/50"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative">

        <h2 className="text-5xl font-bold mb-6">
          Ready to level up your skills?
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          Join 1,000+ developers mastering full-stack development today
        </p>
        <button
          onClick={() => router.push('/register')}
          className="px-10 py-5 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105 transition-all text-xl"
        >
          Get Started for Free →
        </button>
        <p className="text-sm text-gray-500 mt-4">No credit card required • Free forever</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-2xl">📚</div>
            <span className="font-bold text-lg">Flashcards Pro</span>
          </div>
          <p className="text-gray-600 mb-4">
            Built with Next.js 14, .NET 9, PostgreSQL & Tailwind CSS
          </p>
          <p className="text-gray-500 text-sm">© 2024 Flashcards Pro. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(-20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
