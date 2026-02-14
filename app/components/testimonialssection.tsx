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
      "https://images.unsplash.com/photo-1507917591994-14ae08a0b319?w=400&h=400&fit=crop",
    rating: 5,
    text: "HikinHigh exceeded all expectations. The itinerary was well-planned, the accommodation comfortable, and the guides were genuinely passionate about conservation.",
    tour: "Auli Trek",
    isIndian: false,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
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
    <section className="w-full py-20 px-4 md:px-8 bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-bold italic mb-2 tracking-wide">
            What Our Adventurers Say
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Real Stories From Our Community
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied travelers who've discovered their next
            adventure with HikinHigh
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {getVisibleTestimonials().map((testimonial, idx) => (
              <div
                key={testimonial.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-blue-200 animate-fade-in"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin size={12} />
                            {testimonial.location}, {testimonial.country}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-100 px-2 py-1 rounded-full shrink-0">
                      <p className="text-xs font-bold text-blue-700">
                        {testimonial.isIndian ? "🇮🇳" : "🌍"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-4 grow">
                    "{testimonial.text}"
                  </p>

                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full inline-block">
                      {testimonial.tour}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 transition-all cursor-pointer shadow-sm hover:shadow-md group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft
                size={24}
                className="transition-transform group-hover:-translate-x-1"
              />
            </button>

            <div className="flex gap-2 flex-wrap justify-center">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 transition-all cursor-pointer shadow-sm hover:shadow-md group"
              aria-label="Next testimonial"
            >
              <ChevronRight
                size={24}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 text-sm mb-4">
              {currentIndex + 1} of {TESTIMONIALS.length} testimonials
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
