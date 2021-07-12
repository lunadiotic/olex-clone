const getPagination = (page, size) => {
  const limit = size ? +size : 3
  const offset = page ? page * limit : 0

  return { limit, offset }
}

const getPagingData = (result, page, limit) => {
  const { count: totalItems, rows: data } = result
  const currentPage = page ? +page + 1 : 1
  const totalPages = Math.ceil(totalItems / limit)

  return { totalItems, data, totalPages, currentPage }
}

module.exports = {
  getPagination,
  getPagingData,
}
