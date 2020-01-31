exports.seed = function(knex) {
  return knex('users').insert([
      {
          username: 'anthony',
          password: "lopez",
      },
  ]);
};