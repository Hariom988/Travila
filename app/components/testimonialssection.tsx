"use client";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  country: string;
  image: string;
  rating: number;
  text: string;
  tour: string;
  isIndian: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Delhi",
    country: "India 🇮🇳",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 5,
    text: "HikinHigh made our Himalayan trek unforgettable! The guides were incredibly knowledgeable and safety was their top priority. Highly recommend for anyone wanting authentic mountain experiences.",
    tour: "Roopkund Trek",
    isIndian: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "California",
    country: "United States 🇺🇸",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 5,
    text: "The organization and attention to detail was exceptional. From pre-trek preparation to post-trek support, everything was perfectly coordinated. Worth every penny!",
    tour: "Everest Base Camp Trek",
    isIndian: false,
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Mumbai",
    country: "India 🇮🇳",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    text: "As a solo female traveler, I felt completely safe and supported. The team's professionalism and friendly nature made this the best adventure of my life!",
    tour: "Kedarkantha Trek",
    isIndian: true,
  },
  {
    id: 4,
    name: "Marco Rossi",
    location: "Rome",
    country: "Italy 🇮🇹",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5,
    text: "Incredible experience! The scenic beauty combined with professional guidance made this the highlight of my year. Can't wait to book another trek!",
    tour: "Chopta Trek",
    isIndian: false,
  },
  {
    id: 5,
    name: "Emma Thompson",
    location: "London",
    country: "United Kingdom 🇬🇧",
    image:
      "https://images.unsplash.com/photo-1704660577560-db9a0147ea44?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    text: "HikinHigh exceeded all expectations. The itinerary was well-planned, the accommodation comfortable, and the guides were genuinely passionate about conservation.",
    tour: "Auli Trek",
    isIndian: false,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(TESTIMONIALS[(currentIndex + i) % TESTIMONIALS.length]);
    }
    return result;
  };

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-8 bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 hidden md:block">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <p className="text-blue-600 font-bold italic mb-1 text-sm md:text-base tracking-wide">
            What Our Adventurers Say
          </p>
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4">
            Real Stories From Our Community
          </h2>
          <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto px-4">
            Join thousands of satisfied travelers who've discovered their next
            adventure.
          </p>
        </div>

        <div className="relative px-2 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {getVisibleTestimonials().map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className={`${idx > 0 ? "hidden md:flex" : "flex"} group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex-col h-full hover:border-blue-200`}
              >
                <div className="p-5 md:p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-blue-100 shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-[10px] md:text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={10} className="md:w-3 md:h-3" />
                        {testimonial.location}
                      </p>
                    </div>
                    <div className="bg-blue-50 px-1.5 py-0.5 rounded text-xs">
                      {testimonial.isIndian ? "🇮🇳" : "🌍"}
                    </div>
                  </div>

                  <div className="flex gap-0.5 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-4 grow italic">
                    "{testimonial.text}"
                  </p>

                  <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] md:text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      {testimonial.tour}
                    </span>
                    <span className="text-[10px] text-gray-400 md:hidden">
                      {testimonial.country}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 md:mt-10">
            <button
              onClick={handlePrev}
              className="p-2 md:p-3 cursor-pointer rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 transition-all shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all cursor-pointer duration-300 h-1.5 rounded-full ${
                    idx === currentIndex
                      ? "bg-blue-600 w-6"
                      : "bg-gray-300 w-1.5"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 md:p-3 cursor-pointer rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 transition-all shadow-sm"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
