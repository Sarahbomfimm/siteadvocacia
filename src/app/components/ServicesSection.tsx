import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Scale,
  Gavel,
  Briefcase,
  Users,
  Building,
  Home,
  FileText,
  ShieldCheck,
  Globe,
  Lock,
  Landmark,
  Handshake,
} from "lucide-react";

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const services = [
    {
      icon: Scale,
      title: "Direito Civil",
      description: "Resolução de conflitos e assessoria em contratos, obrigações e responsabilidade civil.",
      color: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: Gavel,
      title: "Direito Penal",
      description: "Defesa técnica especializada em processos criminais e inquéritos policiais.",
      color: "from-red-500/10 to-pink-500/10",
    },
    {
      icon: Briefcase,
      title: "Direito do Trabalho",
      description: "Assessoria completa para empresas e empregados em questões laborais.",
      color: "from-purple-500/10 to-indigo-500/10",
    },
    {
      icon: Users,
      title: "Direito de Família",
      description: "Mediação e processos de divórcio, guarda, inventário e partilha de bens.",
      color: "from-green-500/10 to-emerald-500/10",
    },
    {
      icon: Building,
      title: "Direito Imobiliário",
      description: "Segurança jurídica em transações imobiliárias, locações e regularizações.",
      color: "from-cyan-500/10 to-blue-500/10",
    },
    {
      icon: Landmark,
      title: "Direito Tributário",
      description: "Planejamento tributário e defesa em execuções fiscais e autos de infração.",
      color: "from-orange-500/10 to-amber-500/10",
    },
    {
      icon: Globe,
      title: "Direito Digital",
      description: "Consultoria em LGPD, crimes cibernéticos e termos de uso para plataformas.",
      color: "from-teal-500/10 to-green-500/10",
    },
    {
      icon: ShieldCheck,
      title: "Compliance",
      description: "Implementação de programas de integridade e ética corporativa.",
      color: "from-pink-500/10 to-rose-500/10",
    },
    {
      icon: Handshake,
      title: "Mediação",
      description: "Resolução alternativa de conflitos visando acordos rápidos e eficazes.",
      color: "from-indigo-500/10 to-purple-500/10",
    },
    {
      icon: Home,
      title: "Direito do Consumidor",
      description: "Defesa dos direitos do consumidor em face de práticas abusivas.",
      color: "from-emerald-500/10 to-teal-500/10",
    },
    {
      icon: Lock,
      title: "Propriedade Intelectual",
      description: "Registro de marcas, patentes e proteção de direitos autorais.",
      color: "from-blue-500/10 to-indigo-500/10",
    },
    {
      icon: FileText,
      title: "Direito Administrativo",
      description: "Assessoria em licitações e defesas junto a órgãos públicos.",
      color: "from-violet-500/10 to-purple-500/10",
    },
  ];

  return (
    <section id="servicos" ref={ref} className="py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
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
              Nossas Áreas de Atuação
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl mb-6"
          >
            Soluções jurídicas{" "}
            <span className="text-primary">especializadas</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Oferecemos suporte jurídico abrangente em diversas áreas, sempre buscando 
            a melhor estratégia para o seu caso.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-300">
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                  >
                    <service.icon className="w-7 h-7 text-primary" />
                  </motion.div>

                  <h3 className="text-xl mb-3">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="h-1 bg-primary rounded-full mt-6"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Não encontrou o que procura? Entre em contato conosco.
          </p>
          <motion.a
            href="#agendamento"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Fale com um Especialista
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
