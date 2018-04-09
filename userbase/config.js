module.exports = {
  development: {
    ports: {
      portal: 3100,
      authentication: 3200,
      accounts: 3400,
      transactions: 3600,
      bills: 3800,
      support: 4000,
      userbase: 4100
    }
  },
  production: {
    ports: {
      portal: 30200,
      authentication: 30100,
      accounts: 30120,
      transactions: 30140,
      bills: 30160,
      support: 30180,
      userbase: 30050
    }
  }
};
