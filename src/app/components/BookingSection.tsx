import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
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
  CheckCircle,
  XCircle,
} from "lucide-react";

export function BookingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean; type: 'success' | 'error'; title: string; message: string } | null>(null);

  // Auto-dismiss notification
  useEffect(() => {
    if (notification?.show) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      // Usando FormSubmit.co para envio sem backend/senha
      const response = await fetch("https://formsubmit.co/ajax/yourpage.business.tech@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "📅 Nova Solicitação de Agendamento",
          _template: "table", // Formata o email bonitinho em tabela
          ...data
        }),
      });

      if (response.ok) {
        setNotification({
          show: true,
          type: 'success',
          title: 'Solicitação Enviada',
          message: 'Recebemos seu pedido. Em breve um de nossos advogados entrará em contato.'
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Falha no envio');
      }
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        title: 'Erro no Envio',
        message: 'Não foi possível enviar sua solicitação. Verifique sua conexão e tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
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
                      name="name"
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
                      name="email"
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
                      name="phone"
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
                        name="date"
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
                        name="time"
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
                      name="message"
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

      {/* Notification Popup (Centralizado e Chamativo) */}
      <AnimatePresence>
        {notification?.show && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop escuro com blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotification(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Card do Popup */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-card border border-border p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center overflow-hidden"
            >
              {/* Efeito de brilho no fundo */}
              <div className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-b ${
                 notification.type === 'success' ? 'from-green-500/10' : 'from-red-500/10'
              } to-transparent pointer-events-none`} />

              <div className="relative z-10 flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg ${
                    notification.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}
                >
                  {notification.type === 'success' ? (
                    <CheckCircle className="w-12 h-12" />
                  ) : (
                    <XCircle className="w-12 h-12" />
                  )}
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-3">{notification.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {notification.message}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotification(null)}
                  className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Entendido
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
