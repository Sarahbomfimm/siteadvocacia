import { Moon, Sun, Calendar, Scale, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  onBookClick: () => void;
}

export function Header({ isDark, toggleTheme, onBookClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="pt-1">
              <h1 className="text-xl tracking-tight">Justiça & Direito</h1>
              <p className="text-xs text-muted-foreground">Assessoria Jurídica</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["Início", "Sobre", "Serviços", "Equipe", "Depoimentos"].map(
              (item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </motion.a>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Alternar tema"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(10, 74, 110, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookClick}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Consulta Jurídica</span>
              <span className="sm:hidden">Agendar</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {["Início", "Sobre", "Serviços", "Equipe", "Depoimentos"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                  className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
