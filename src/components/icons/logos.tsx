/* Marcas dos negócios fictícios que a demo do celular encena — só o que o
   Lucide não tem. O set não traz dente, e "consultório odontológico" sem dente
   vira um ícone genérico qualquer; tesoura, flor e patinha vêm do Lucide e
   ficam na mesma grade 24 / traço 2 deste desenho, então convivem sem
   destoar. */

type MarkProps = {
  className?: string;
  strokeWidth?: number;
};

/* Marca do WhatsApp já usada no botão flutuante, centralizada aqui para o selo
   do hero e o CTA compartilharem exatamente o mesmo desenho. */
export const IconWhatsapp = ({ className }: MarkProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.514-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

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
