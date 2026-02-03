import React from 'react';
import './Features.css';

const features = [
  {
    title: "Integração com WhatsApp",
    description: "Conecte-se diretamente com seus clientes no aplicativo de mensagens mais popular do mundo.",
    icon: "📱"
  },
  {
    title: "Assistente de Chat com IA",
    description: "Um bot inteligente que entende o contexto e lida com solicitações de agendamento complexas.",
    icon: "🤖"
  },
  {
    title: "Número Dedicado",
    description: "Fornecemos um número comercial profissional exclusivo para seus agendamentos automatizados.",
    icon: "📞"
  },
  {
    title: "Disponibilidade 24/7",
    description: "Nunca perca um agendamento. Seu assistente trabalha dia e noite, finais de semana e feriados.",
    icon: "⏰"
  },
  {
    title: "Confirmação Instantânea",
    description: "Os clientes recebem confirmação de reserva imediata e lembretes automaticamente.",
    icon: "⚡"
  },
  {
    title: "Dashboard de Análise",
    description: "Acompanhe seus agendamentos, horários de pico e crescimento de clientes em tempo real.",
    icon: "📊"
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">Por que escolher o <span className="text-highlight">Horarius</span>?</h2>
        <p className="section-subtitle">Tudo o que você precisa para automatizar sua agenda e expandir seus negócios.</p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
