function maxPageSizeValidation(pageSize) {
  if (pageSize > 25) {
    throw new Error("max page size can't be more than 25");
  } else if (pageSize < 2) {
    throw new Error("page size can't be less than 2");
  }
  return pageSize;
}

function setPage(pageSize, page) {
  return pageSize * page;
}

module.exports = { maxPageSizeValidation, setPage };
