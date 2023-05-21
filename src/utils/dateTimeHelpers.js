export const formatDate = (ISODate) => {
  const date = new Date(ISODate);
  return date.toLocaleDateString('pt-BR');
};