export const getDateString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const isPdfFile = (file: string) => {
  return file.slice(-3) === 'pdf'
}