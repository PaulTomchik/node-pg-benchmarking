module.exports = {
  getIds: 'SELECT DISTINCT id FROM benchmarking_data LIMIT 1000',
  getDataForId: `
    SELECT id, bin, metric
      FROM benchmarking_data
      WHERE (id = $1)
  `
};
