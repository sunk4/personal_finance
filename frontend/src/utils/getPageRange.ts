const getPageRange = (
  currentPage: number,
  totalPages: number,
  range: number = 2
) => {
  const start = Math.max(0, currentPage - range);
  const end = Math.min(totalPages - 1, currentPage + range);
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
};

export default getPageRange;
