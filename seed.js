'use strict';

const pool = require('./db');
const fs = require("fs");
const groupsSqlInsert = fs.readFileSync("seedGroups.sql").toString();
const userGroupsSqlInsert = fs.readFileSync("seedUserGroups.sql").toString();
const usersSqlInsert = fs.readFileSync("seedUsers.sql").toString();
const salesSqlInsert = fs.readFileSync("seedSales.sql").toString();

// Create tables
const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(50) NOT NULL,
	    "role" VARCHAR(50) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

const createGroupsTableQuery = `
    CREATE TABLE IF NOT EXISTS "groups" (
	    "id" SERIAL,
	    "name" VARCHAR(50) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

const createUserGroupsTableQuery = `
    CREATE TABLE IF NOT EXISTS "user_groups" (
	    "user_id" INT,
	    "group_id" INT,
	    FOREIGN KEY(user_id) REFERENCES users(id),
	    FOREIGN KEY(group_id) REFERENCES groups(id)
    );`;

const createSalesTableQuery = `
    CREATE TABLE IF NOT EXISTS "sales" (
      "id" SERIAL,
	    "user_id" SERIAL,
	    "amount" INTEGER,
	    "date" DATE,
	    FOREIGN KEY(user_id) REFERENCES users(id),
	    PRIMARY KEY ("id")
    );`;

const seedDatabase = async function() {

  const usersTableExistsResult = await pool.query("SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users');");
  const usersTableExists = usersTableExistsResult.rows[0].exists;

  // Check if users table exists already. If so, we assume the seeders have already run successfully
  if (usersTableExists) {
    console.log('Skipping seeders.');
    return;
  } else {
    console.log('Seeding database...');
  }

  await pool.query(createUsersTableQuery);
  console.log('Created users table.');

  await pool.query(usersSqlInsert);
  console.log('Seeded users table.');

  await pool.query(createGroupsTableQuery);
  console.log('Created groups table.');

  await pool.query(groupsSqlInsert);
  console.log('Seeded groups table.');

  await pool.query(createUserGroupsTableQuery);
  console.log('Created user_groups table.');

  await pool.query(userGroupsSqlInsert);
  console.log('Seeded user_group table.');

  await pool.query(createSalesTableQuery);
  console.log('Created sales table.');

  await pool.query(salesSqlInsert);
  console.log('Seeded sales table.');

  // Create indexes for better query performance
  await pool.query('CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(date);');
  console.log('Created index on sales.date');

  await pool.query('CREATE INDEX IF NOT EXISTS idx_sales_user_id ON sales(user_id);');
  console.log('Created index on sales.user_id');

  await pool.query('CREATE INDEX IF NOT EXISTS idx_user_groups_user_id ON user_groups(user_id);');
  console.log('Created index on user_groups.user_id');

  await pool.query('CREATE INDEX IF NOT EXISTS idx_user_groups_group_id ON user_groups(group_id);');
  console.log('Created index on user_groups.group_id');

}

module.exports = {
  seedDatabase
}
