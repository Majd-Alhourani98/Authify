const buildDatabaseURL = (username, password, dbname, baseURL) => {
  return baseURL.replace('<USERNAME>', username).replace('<PASSWORD>', password).replace('<DBNAME>', dbname);
};

module.exports = { buildDatabaseURL };
