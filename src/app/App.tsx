import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { SpecialistsSection } from "./components/SpecialistsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { BookingSection } from "./components/BookingSection";
import { Footer } from "./components/Footer";
import JuridicalChatbot from "./components/JuridicalChatbot";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("agendamento");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header isDark={isDark} toggleTheme={toggleTheme} onBookClick={scrollToBooking} />
      <main>
        <HeroSection onBookClick={scrollToBooking} />
        <AboutSection />
        <ServicesSection />
        <SpecialistsSection />
        <TestimonialsSection />
        <BookingSection />
      </main>
      <Footer />
      <JuridicalChatbot />
    </div>
  );
}
