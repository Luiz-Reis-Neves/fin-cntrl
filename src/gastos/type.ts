export interface Gasto {
  id: string | number;
  categoria: string;
  valor: number;
  data: string; 
  descricao: string;
}

// Dados de um gasto antes de ser cadastrado (o id é criado pela GastosLogic)
export type NovoGasto = Omit<Gasto, "id">;

// Valores como saem do formulário, antes da validação e da conversão de tipos
export interface FormularioGasto {
  categoria: string;
  valor: string;
  data: string;
  descricao: string;
}

export interface ErroValidacao {
  campo: keyof FormularioGasto;
  mensagem: string;
}
