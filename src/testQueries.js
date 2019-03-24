module.exports = {
  getIds: process.env.GET_IDS_SQL,
  getDataForId: process.env.GET_DATA_SQL.replace(/'__ID__'/, '$1')
};
