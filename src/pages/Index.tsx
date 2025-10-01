import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Awards from "@/components/sections/Awards";
import Contact from "@/components/sections/Contact";

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (logoClicks >= 5) {
      navigate("/admin");
      setLogoClicks(0);
    }
  }, [logoClicks, navigate]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const handleLogoClick = () => {
    setLogoClicks((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen">
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} onLogoClick={handleLogoClick} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Awards />
      <Contact />
    </div>
  );
};

export default Index;
