import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  Send,
  MapPin,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Clock as ClockIcon,
} from "lucide-react";

export function BookingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Solicitação enviada com sucesso! Em breve um de nossos advogados entrará em contato.");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="agendamento" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                Agende sua Consulta Jurídica
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl mb-6">
              Proteja seus direitos com uma{" "}
              <span className="text-primary">assessoria especializada</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Preencha o formulário ao lado e nossa equipe entrará em contato
              para confirmar sua consulta. Estamos prontos para defender seus interesses.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Endereço",
                  content: "Av. Paulista, 2000 - São Paulo, SP",
                },
                {
                  icon: PhoneIcon,
                  title: "Telefone",
                  content: "(11) 99999-9999",
                },
                {
                  icon: MailIcon,
                  title: "E-mail",
                  content: "contato@justicaedireito.com.br",
                },
                {
                  icon: ClockIcon,
                  title: "Horário de Atendimento",
                  content: "Segunda a Sexta: 9h - 18h",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.content}</div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 lg:p-10 rounded-3xl bg-card border border-border shadow-2xl"
            >
              <h3 className="text-2xl mb-8">Preencha seus dados</h3>

              <div className="space-y-6">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label className="block text-sm mb-2">Nome completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-secondary/50 border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Seu nome completo"
                    />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label className="block text-sm mb-2">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-secondary/50 border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label className="block text-sm mb-2">Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-secondary/50 border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </motion.div>

                {/* Date and Time */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <label className="block text-sm mb-2">Data preferida</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="date"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-secondary/50 border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <label className="block text-sm mb-2">Horário preferido</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="time"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-secondary/50 border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <label className="block text-sm mb-2">Mensagem (opcional)</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                    <textarea
                      rows={4}
                      className="w-full pl-12 pr-4 py-3.5 bg-secondary/50 border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Conte-nos o motivo da consulta..."
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 12px 32px rgba(10, 74, 110, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Agendar Consulta</span>
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-center text-muted-foreground">
                  Ao agendar, você concorda com nossa política de privacidade
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
