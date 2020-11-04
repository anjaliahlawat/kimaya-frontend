
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize
  const arr = [...items.slice(startIndex, startIndex + pageSize)] 
  return arr
}