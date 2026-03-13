import './PrivacyPolicy.css';

const DataDeletion = () => (
  <div className="privacy-policy-container section">
    <div className="container">
      <div className="privacy-policy-content surface-card">
        <header className="privacy-header">
          <span className="eyebrow">Suporte ao titular</span>
          <h1>Exclusao de Dados</h1>
          <p className="app-info">
            <strong>Horarius</strong>
            <br />
            Instrucoes para solicitacao de exclusao de dados pessoais tratados pela plataforma.
          </p>
        </header>

        <section>
          <h2>Como solicitar</h2>
          <ul>
            <li>
              Envie um e-mail para <a href="mailto:contato.horarius@gmail.com">contato.horarius@gmail.com</a>.
            </li>
            <li>Informe seu nome completo.</li>
            <li>Informe o numero de telefone vinculado ao atendimento ou a conta.</li>
            <li>Descreva de forma objetiva que deseja a exclusao dos seus dados pessoais.</li>
          </ul>
        </section>

        <section>
          <h2>Prazo de resposta</h2>
          <p>
            O Horarius respondera a solicitacao em ate 15 dias uteis. Se necessario, a equipe
            podera pedir informacoes adicionais para validar a identidade do titular antes de
            concluir a exclusao.
          </p>
        </section>

        <section>
          <h2>Observacoes</h2>
          <ul>
            <li>
              Alguns dados podem ser mantidos pelo prazo necessario para cumprimento de obrigacoes
              legais, regulatorias ou para prevencao de fraude.
            </li>
            <li>
              A exclusao pode impactar o historico de agendamentos e a continuidade de atendimentos
              vinculados ao numero informado.
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
);

export default DataDeletion;
