export const getDateString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const isPdfFile = (file: string) => {
  return file.slice(-3) === 'pdf'
}

// 193.201.175.41 or md.xline.net.ua