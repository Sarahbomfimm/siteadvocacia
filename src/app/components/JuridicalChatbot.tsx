import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const validateResponse = (response: string, step: any): boolean => {
  const value = response.toLowerCase();
  switch (step.key) {
    case 'email':
      // Simple regex to check for a valid email format
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    case 'telefone':
      // Checks for at least 8 digits, allowing for common phone characters
      return (value.match(/\d/g) || []).length >= 8;
    case 'area':
      // Checks if the response contains any of the expected keywords
      const keywords = ['civil', 'trabalho', 'penal', 'família', 'imobiliário', 'tributário', 'outra'];
      return keywords.some(keyword => value.includes(keyword));
    case 'nome':
      // Name should have at least 3 characters and contain only letters/spaces.
      return value.length > 2 && /^[a-zA-Z\sÀ-ú]+$/.test(value);
    case 'descricao':
      // Description just needs to not be empty
      return value.length > 0;
    default:
      return true; // Default to true if no specific validation
  }
};

const JuridicalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nome: '',
    email: '',
    telefone: '',
    area: '',
    descricao: ''
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
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
      question: "Qual área do direito você precisa? Selecione uma das opções abaixo:",
      key: 'area',
      type: 'select',
      options: [
        "Direito Civil",
        "Direito do Trabalho",
        "Direito Penal",
        "Direito de Família",
        "Direito Imobiliário",
        "Direito Tributário",
        "Outra"
      ]
    },
    {
      question: "Pode descrever brevemente qual é o seu caso?",
      key: 'descricao',
      type: 'textarea'
    }
  ];

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // A small delay allows the DOM to update before we scroll
    // Só rola para o final se for uma mensagem NOVA ou o bot digitando
    setTimeout(scrollToBottom, 100);
  }, [messages, isBotTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsBotTyping(true);
      setTimeout(() => {
        addBotMessage(steps[0].question);
        setIsBotTyping(false);
      }, 800);
    }
    // Foca no input quando abre, mas NÃO força scroll desnecessário
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // Delay to wait for transition
    }
  }, [isOpen]);

  // Monitorar redimensionamento da janela (teclado mobile abrindo/fechando)
  // Ajusta a altura do container para caber na tela visível (acima do teclado)
  useEffect(() => {
    const visualViewport = window.visualViewport;

    const handleResize = () => {
      if (chatContainerRef.current && visualViewport) {
        // Ajusta a altura explicitamente para a altura visível da viewport
        chatContainerRef.current.style.height = `${visualViewport.height}px`;
      }
    };

    if (visualViewport) {
      visualViewport.addEventListener('resize', handleResize);
      handleResize(); // Ajusta inicialmente
      return () => {
        visualViewport.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen]);

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

  const handleSendMessage = (text?: string) => {
    const userResponse = text || inputValue.trim();
    if (!userResponse || isBotTyping) return;

    addUserMessage(userResponse);
    setInputValue('');

    // Focar no input no próximo ciclo de eventos para garantir que o teclado não feche.
    setTimeout(() => inputRef.current?.focus(), 10);
    
    const currentStepData = steps[currentStep];

    // Valida a resposta do usuário
    if (!validateResponse(userResponse, currentStepData)) {
      setIsBotTyping(true);
      setTimeout(() => {
        addBotMessage(`Desculpe, não entendi sua resposta. Vamos tentar novamente.\n\n${currentStepData.question}`);
        setIsBotTyping(false);
      }, 1000);
      return; // Interrompe o fluxo se a resposta for inválida
    }

    // Armazena a resposta válida
    const updatedInfo = { ...userInfo, [currentStepData.key]: userResponse };
    setUserInfo(updatedInfo);

    setIsBotTyping(true);
    // Ir para próxima pergunta ou finalizar
    setTimeout(() => {
      const nextStep = currentStep + 1;
      if (nextStep < steps.length) {
        setCurrentStep(nextStep);
        addBotMessage(steps[nextStep].question);
      } else {
        // Finaliza a triagem e avança o passo para desabilitar o input
        finalizarTriagem(updatedInfo);
        setCurrentStep(nextStep);
      }
      
      setIsBotTyping(false);
    }, 1200);
  };

  const finalizarTriagem = (info: typeof userInfo) => {
    addBotMessage(
      `Obrigado, ${info.nome}! 🎉\n\nSuas informações foram registradas com sucesso. Nossa equipe analisará seu caso e entrará em contato através do email informado (${info.email}) ou telefone o mais breve possível.`
    );
    // Envia os dados por email (simulação/API)
    sendDataToEmail(info);
  };

  const sendDataToEmail = async (data: typeof userInfo) => {
    // Para enviar email sem abrir aba, é necessário um serviço de backend (API).
    // Abaixo está a simulação do envio para o email solicitado: sarahbomfimm24@gmail.com
    
    console.log("Enviando dados para: sarahbomfimm24@gmail.com", data);
    
    // Exemplo de integração (ex: EmailJS, Formspree, ou API própria):
    // await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(data) });
    
    // Como este é um componente frontend sem backend configurado, simulamos o sucesso:
    setTimeout(() => {
      console.log("Email enviado com sucesso (Simulação)!");
    }, 1000);
  };

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#2d5a8c] to-[#1a3a5c] hover:from-[#1a3a5c] hover:to-[#0f1f35] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-[60] flex items-center justify-center"
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
        ref={chatContainerRef}
        className={`fixed bottom-0 right-0 w-full h-[100dvh] md:w-96 md:h-auto md:max-h-[70vh] md:bottom-24 md:right-6 bg-white rounded-none md:rounded-lg shadow-2xl flex flex-col z-[60] overflow-hidden border-t md:border border-[#e8f0f7] ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
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
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Fechar chat"
            >
              <X className="w-6 h-6 text-white"/>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f5f6f9]">
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
          {isBotTyping && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-[#e8f0f7] text-[#1a1f2e] rounded-bl-none">
                <div className="flex items-center justify-center gap-2 p-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-[#e8f0f7] p-3 bg-white flex gap-2">
          {steps[currentStep] && steps[currentStep].type === 'select' && (steps[currentStep] as any).options ? (
            <div className="flex flex-wrap gap-2 w-full">
              {(steps[currentStep] as any).options.map((option: string) => (
                <button
                  key={option}
                  onClick={() => handleSendMessage(option)}
                  disabled={isBotTyping}
                  className="flex-1 min-w-[45%] px-3 py-2 bg-white border border-[#2d5a8c] text-[#2d5a8c] rounded-lg hover:bg-[#2d5a8c] hover:text-white transition-colors text-sm font-medium"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
          <>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            ref={inputRef}
            // Removido onFocus com scrollToBottom para evitar pulos de tela
            placeholder="Digite sua resposta..."
            className="flex-1 px-3 py-2 border-2 border-[#e8f0f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] text-base text-[#1a1f2e] font-medium placeholder:text-gray-500 bg-white"
            // Não desabilitar durante isBotTyping para manter o teclado aberto no mobile
            disabled={currentStep >= steps.length}
          />
          <button
            onMouseDown={(e) => e.preventDefault()} // Impede que o clique roube o foco do input
            onClick={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            disabled={currentStep >= steps.length || isBotTyping}
            className="bg-[#2d5a8c] hover:bg-[#1a3a5c] text-white px-4 py-2 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <Send className="w-4 h-4" />
          </button>
          </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default JuridicalChatbot;
