/* Marcas dos negócios fictícios que a demo do celular encena — só o que o
   Lucide não tem. O set não traz dente, e "consultório odontológico" sem dente
   vira um ícone genérico qualquer; tesoura, flor e patinha vêm do Lucide e
   ficam na mesma grade 24 / traço 2 deste desenho, então convivem sem
   destoar. */

type MarkProps = {
  className?: string;
  strokeWidth?: number;
};

/* Coroa com o vinco no meio em cima e duas raízes separadas embaixo — é a
   silhueta que lê como dente a 17px; um contorno arredondado sem o vinco
   viraria uma nuvem. */
export const IconTooth = ({ className, strokeWidth = 1.9 }: MarkProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5.2C13.8 3.5 16.2 2.8 18 3.7 19.9 4.6 21 6.4 21 8.6c0 1.8-.5 3.3-1.1 4.9-.5 1.5-.8 2.8-1 4.3-.2 1.4-.7 2.3-1.7 2.3-1.1 0-1.6-1-1.9-2.6-.3-1.6-.6-3-1.6-3h-3.4c-1 0-1.3 1.4-1.6 3-.3 1.6-.8 2.6-1.9 2.6-1 0-1.5-.9-1.7-2.3-.2-1.5-.5-2.8-1-4.3C3.5 11.9 3 10.4 3 8.6c0-2.2 1.1-4 3-4.9 1.8-.9 4.2-.2 6 1.5Z" />
  </svg>
);
