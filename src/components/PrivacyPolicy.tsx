import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-content">
        <header className="privacy-header">
          <h1>Política de Privacidade</h1>
          <p className="app-info">
            <strong>Aplicativo:</strong> Horarius<br />
            <strong>Descrição:</strong> O Horarius é um assistente de inteligência artificial especializado em automação de agendamentos e atendimento ao cliente via WhatsApp. Nossa plataforma é projetada para barbearias, clínicas, salões de beleza e prestadores de serviços em geral que desejam otimizar a gestão de seus atendimentos.
          </p>
          <p className="last-updated">Última atualização: Março de 2026</p>
        </header>

        <section>
          <h2>1. Introdução</h2>
          <p>
            A sua privacidade é importante para nós. Esta Política de Privacidade tem como objetivo informar de forma clara e transparente como o <strong>Horarius</strong> ("nós", "nosso" ou "plataforma") coleta, utiliza, armazena, protege e compartilha os dados pessoais dos usuários e clientes finais que interagem com nosso serviço.
          </p>
          <p>
            Ao utilizar o Horarius — seja como estabelecimento cadastrado ou como cliente final que interage via WhatsApp — você concorda com as práticas descritas nesta política. Caso não concorde com qualquer termo, solicitamos que não utilize nossos serviços.
          </p>
        </section>

        <section>
          <h2>2. Informações que coletamos</h2>
          <p>Para fornecer e aprimorar nossos serviços, podemos coletar as seguintes categorias de dados:</p>
          
          <h3>Dados dos estabelecimentos (usuários da plataforma):</h3>
          <ul>
            <li>Nome do responsável e da empresa</li>
            <li>Número de telefone e WhatsApp comercial</li>
            <li>Endereço do estabelecimento</li>
            <li>Horários de funcionamento</li>
            <li>Catálogo de serviços oferecidos e profissionais vinculados</li>
          </ul>

          <h3>Dados dos clientes finais (consumidores):</h3>
          <ul>
            <li>Nome</li>
            <li>Número de telefone celular (WhatsApp)</li>
            <li>Conteúdo das mensagens trocadas via integração com o WhatsApp</li>
            <li>Histórico de agendamentos (datas, horários e serviços solicitados)</li>
          </ul>

          <h3>Dados coletados automaticamente:</h3>
          <ul>
            <li>Informações de acesso à plataforma (endereço IP, tipo de navegador, sistema operacional)</li>
            <li>Dados de uso e navegação dentro da plataforma</li>
          </ul>
        </section>

        <section>
          <h2>3. Como usamos os dados</h2>
          <p>Os dados coletados são utilizados exclusivamente para as seguintes finalidades:</p>
          <ul>
            <li><strong>Gerenciamento de agendamentos:</strong> Facilitar a criação, confirmação, reagendamento e cancelamento de atendimentos entre clientes e estabelecimentos.</li>
            <li><strong>Comunicação via WhatsApp:</strong> Enviar e receber mensagens de confirmação, lembretes, atualizações de status e respostas automáticas por meio da API oficial do WhatsApp (Meta).</li>
            <li><strong>Atendimento ao cliente:</strong> Permitir que os estabelecimentos interajam de forma eficiente com seus clientes pelo WhatsApp, utilizando o assistente de IA do Horarius.</li>
            <li><strong>Melhoria do serviço:</strong> Analisar padrões de uso para aprimorar funcionalidades, corrigir erros e otimizar a experiência do usuário.</li>
            <li><strong>Segurança:</strong> Garantir a integridade, disponibilidade e proteção da plataforma contra acessos não autorizados ou atividades fraudulentas.</li>
          </ul>
        </section>

        <section>
          <h2>4. Compartilhamento de dados</h2>
          <p>O Horarius <strong>não vende, aluga ou comercializa</strong> dados pessoais de seus usuários. O compartilhamento de informações ocorre apenas nas seguintes situações:</p>
          <ul>
            <li><strong>Com o estabelecimento parceiro:</strong> Os dados do cliente final (nome, telefone e histórico de agendamento) são compartilhados exclusivamente com o estabelecimento onde o atendimento foi ou será realizado.</li>
            <li><strong>Provedores de infraestrutura e tecnologia:</strong> Compartilhamos dados com prestadores de serviço terceirizados estritamente necessários para o funcionamento da plataforma, incluindo serviços de hospedagem em nuvem, banco de dados e a API oficial do WhatsApp Business (Meta). Todos esses provedores estão sujeitos a obrigações contratuais de confidencialidade e proteção de dados.</li>
            <li><strong>Cumprimento legal:</strong> Podemos divulgar dados quando exigido por legislação vigente, ordem judicial, decisão administrativa ou para proteger os direitos, segurança ou propriedade do Horarius e de seus usuários.</li>
          </ul>
        </section>

        <section>
          <h2>5. Armazenamento e segurança</h2>
          <p>
            O Horarius adota medidas técnicas e organizacionais adequadas para proteger os dados pessoais sob nossa responsabilidade. Entre as práticas de segurança implementadas, destacamos:
          </p>
          <ul>
            <li>Criptografia de dados em trânsito (HTTPS/TLS) e em repouso</li>
            <li>Controle de acesso restrito aos sistemas e bases de dados</li>
            <li>Monitoramento contínuo de vulnerabilidades e ameaças</li>
            <li>Backups regulares e procedimentos de recuperação de dados</li>
          </ul>
          <p>
            Apesar de nossos esforços, nenhum sistema é completamente imune a riscos. Em caso de incidente de segurança que possa impactar seus dados, notificaremos os usuários afetados conforme exigido pela legislação aplicável.
          </p>
        </section>

        <section>
          <h2>6. Retenção de dados</h2>
          <p>
            Os dados pessoais são mantidos apenas pelo período estritamente necessário para o cumprimento das finalidades descritas nesta política, ou conforme exigido por obrigações legais e regulatórias. Após esse período, os dados serão eliminados ou anonimizados de forma segura.
          </p>
          <p>
            Dados de agendamentos e histórico de conversas poderão ser retidos por até 12 meses após a última interação, salvo solicitação de exclusão pelo titular dos dados.
          </p>
        </section>

        <section>
          <h2>7. Direitos do usuário</h2>
          <p>Em conformidade com a Lei Geral de Proteção de Dados (LGPD) e demais legislações aplicáveis, você tem o direito de:</p>
          <ul>
            <li><strong>Acesso:</strong> Solicitar uma cópia dos dados pessoais que armazenamos sobre você.</li>
            <li><strong>Correção:</strong> Exigir a retificação de dados incompletos, inexatos ou desatualizados.</li>
            <li><strong>Exclusão:</strong> Solicitar a eliminação de dados pessoais desnecessários, excessivos ou tratados em desconformidade com a legislação.</li>
            <li><strong>Portabilidade:</strong> Solicitar a transferência dos seus dados para outro fornecedor de serviço, quando aplicável.</li>
            <li><strong>Revogação do consentimento:</strong> Retirar o consentimento para o tratamento de dados a qualquer momento, sem comprometer a licitude do tratamento realizado anteriormente.</li>
          </ul>
        </section>

        <section>
          <h2>8. Solicitação de exclusão de dados</h2>
          <p>
            Se você deseja solicitar a exclusão dos seus dados pessoais da nossa plataforma, ou exercer qualquer outro direito previsto nesta política, envie um e-mail para:
          </p>
          <p className="contact-email">
            <a href="mailto:contato.horarius@gmail.com">contato.horarius@gmail.com</a>
          </p>
          <p>
            Na sua solicitação, inclua seu nome completo e o número de telefone associado à sua conta ou interação, para que possamos identificar e processar seu pedido. Responderemos no prazo máximo de 15 dias úteis, conforme previsto na legislação vigente.
          </p>
        </section>

        <section>
          <h2>9. Alterações nesta política</h2>
          <p>
            O Horarius reserva-se o direito de atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossos serviços, tecnologias utilizadas ou na legislação aplicável. Quando realizarmos alterações significativas, notificaremos os usuários por meio de aviso em nossa plataforma ou pelos canais de comunicação cadastrados.
          </p>
          <p>
            Recomendamos que você revise esta política periodicamente para manter-se informado sobre como protegemos seus dados.
          </p>
        </section>

        <section>
          <h2>10. Contato</h2>
          <p>
            Se você tiver dúvidas, sugestões ou reclamações sobre esta Política de Privacidade ou sobre o tratamento dos seus dados pessoais, entre em contato conosco:
          </p>
          <div className="contact-info">
            <p><strong>E-mail:</strong> <a href="mailto:contato.horarius@gmail.com">contato.horarius@gmail.com</a></p>
            <p><strong>Aplicativo:</strong> Horarius</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
