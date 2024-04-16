export const priorityIncidente = (priority: number) => {

  const priorityMap: { [key: number]: string } = {
    0: "Não Classificada",
    1: "Informação",
    2: "Atenção",
    3: "Média",
    4: "Alta",
    5: "Desastre"
  };

  return priorityMap[priority] || "Prioridade Inválida";
}
