import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const JuridicalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    nome: '',
    email: '',
    telefone: '',
    area: '',
    descricao: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const steps = [
    {
      question: "Olá! 👋 Bem-vindo à Justiça & Direito. Qual é o seu nome?",
      key: 'nome',
      type: 'text'
    },
    {
      question: "Prazer em te conhecer! Qual é o seu melhor email de contato?",
      key: 'email',
      type: 'email'
    },
    {
      question: "E qual é o seu telefone? (com DDD)",
      key: 'telefone',
      type: 'tel'
    },
    {
      question: "Qual área do direito você precisa? Escolha uma:\n• Direito Civil\n• Direito do Trabalho\n• Direito Penal\n• Direito de Família\n• Direito Imobiliário\n• Direito Tributário\n• Outra",
      key: 'area',
      type: 'select'
    },
    {
      question: "Pode descrever brevemente qual é o seu caso?",
      key: 'descricao',
      type: 'textarea'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(steps[0].question);
    }
    // Foca no input quando o chat abre
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300); // Delay para aguardar a transição
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userResponse = inputValue.trim();
    addUserMessage(userResponse);
    setInputValue('');

    // Validar e armazenar resposta
    // Forçar foco imediato para tentar manter teclado aberto em mobile
    inputRef.current?.focus();
    
    const currentStepData = steps[currentStep];
    const updatedInfo = { ...userInfo, [currentStepData.key]: userResponse };
    setUserInfo(updatedInfo);

    // Ir para próxima pergunta ou finalizar
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        addBotMessage(steps[currentStep + 1].question);
      } else {
        finalizarTriagem(updatedInfo);
      }
      inputRef.current?.focus();
    }, 500);
  };

  const finalizarTriagem = (info: typeof userInfo) => {
    addBotMessage(
      `Obrigado, ${info.nome}! 🎉\n\nRecebemos suas informações:\n\n✓ Email: ${info.email}\n✓ Telefone: ${info.telefone}\n✓ Área: ${info.area}\n\nCom base no seu caso, nossos especialistas entrarão em contato em breve para uma avaliação gratuita.\n\nEm caso de dúvidas, ligue: (11) 99999-9999`
    );

    // Enviar dados para servidor (você implementa a rota)
    sendDataToServer(info);
  };

  const sendDataToServer = async (data: typeof userInfo) => {
    try {
      // Aqui você conectaria com seu backend
      console.log('Dados do chatbot:', data);
      // fetch('/api/triagem-juridica', { method: 'POST', body: JSON.stringify(data) })
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#2d5a8c] to-[#1a3a5c] hover:from-[#1a3a5c] hover:to-[#0f1f35] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        title="Abrir chatbot jurídico"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Janela do Chat */}
      <motion.div
        className="fixed bottom-0 right-0 w-full h-full md:w-96 md:h-auto md:max-h-[70vh] md:bottom-24 md:right-6 bg-white rounded-none md:rounded-lg shadow-2xl flex flex-col z-40 overflow-hidden border-t md:border border-[#e8f0f7]"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2d5a8c] to-[#1a3a5c] text-white p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Triagem Jurídica</h3>
              <p className="text-sm text-blue-100">Assistente de atendimento 24/7</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="md:hidden p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Fechar chat"
            >
              <X className="w-6 h-6 text-white"/>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f5f6f9]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap font-medium ${
                  msg.sender === 'user'
                    ? 'bg-[#2d5a8c] text-white rounded-br-none text-base'
                    : 'bg-[#e8f0f7] text-[#1a1f2e] rounded-bl-none text-base'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#e8f0f7] p-3 bg-white flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            ref={inputRef}
            placeholder="Digite sua resposta..."
            className="flex-1 px-3 py-2 border-2 border-[#e8f0f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] text-base text-[#1a1f2e] font-medium placeholder:text-gray-500 bg-white"
            disabled={currentStep >= steps.length}
          />
          <button
            onClick={(e) => {
              e.preventDefault(); // Evita que o botão roube o foco
              handleSendMessage();
            }}
            disabled={currentStep >= steps.length}
            className="bg-[#2d5a8c] hover:bg-[#1a3a5c] text-white px-4 py-2 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default JuridicalChatbot;
