import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Award, GraduationCap, Star } from "lucide-react";

export function SpecialistsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const specialists = [
    {
      name: "Dr. Carlos Mendes",
      specialty: "Direito Civil",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBpbiUyMHN1aXR8ZW58MXx8fHwxNzcwOTUzMTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      credentials: "OAB/SP 123.456 | Especialista em Contratos",
      experience: "25 anos de experiência",
      rating: 4.9,
    },
    {
      name: "Dra. Ana Silva",
      specialty: "Direito do Trabalho",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBsYXd5ZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcwOTUzMTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      credentials: "OAB/SP 234.567 | Mestre em Direito Social",
      experience: "18 anos de experiência",
      rating: 5.0,
    },
    {
      name: "Dr. Pedro Costa",
      specialty: "Direito Penal",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwbGF3eWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwOTUzMTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      credentials: "OAB/SP 345.678 | Especialista em Direito Criminal",
      experience: "20 anos de experiência",
      rating: 4.8,
    },
    {
      name: "Dra. Julia Almeida",
      specialty: "Direito de Família",
      image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzA5NTMxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      credentials: "OAB/SP 456.789 | Especialista em Mediação",
      experience: "15 anos de experiência",
      rating: 4.9,
    },
  ];

  return (
    <section id="equipe" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
              Nossa Equipe
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl mb-6"
          >
            Profissionais de{" "}
            <span className="text-primary">excelência</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Advogados altamente qualificados, prontos para oferecer a melhor 
            estratégia jurídica para seus interesses.
          </motion.p>
        </div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialists.map((specialist, index) => (
            <motion.div
              key={specialist.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              className="group"
            >
              <div className="relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  
                  {/* Rating badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-card/90 backdrop-blur-md rounded-full shadow-lg"
                  >
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{specialist.rating}</span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl mb-1">{specialist.name}</h3>
                  <p className="text-primary mb-4">{specialist.specialty}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{specialist.credentials}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Award className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{specialist.experience}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary rounded-lg transition-colors"
                  >
                    Agendar Consulta
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 p-8 rounded-2xl bg-card border border-border">
            <div className="flex -space-x-4">
              {specialists.slice(0, 3).map((specialist, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-card overflow-hidden"
                >
                  <img
                    src={specialist.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-card bg-primary flex items-center justify-center">
                <span className="text-sm text-primary-foreground">+50</span>
              </div>
            </div>
            <div className="text-left">
              <div className="text-2xl mb-1">Mais de 50 especialistas</div>
              <p className="text-sm text-muted-foreground">
                Prontos para defender seus direitos
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
