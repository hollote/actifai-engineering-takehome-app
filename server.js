'use strict';

const helmet = require('helmet');
const express = require('express');
const seeder = require('./seed');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

async function start() {
  // Seed the database
  await seeder.seedDatabase();

  // App
  const app = express();
  app.use(helmet());

  // Health check
  app.get('/health', (req, res) => {
    res.send('Hello World');
  });

  // Write your endpoints here
  const queries = require('./queries');
  const parseIds = require('./lib/parseIds');
  const middleware = require('./middleware');

  const userSortFields = ['period', 'total_revenue', 'sales_count', 'average_revenue', 'user_id'];
  const groupSortFields = ['period', 'total_revenue', 'sales_count', 'average_revenue', 'group_id'];

  app.get('/api/v1/sales/by-user', middleware.validateSalesParams(userSortFields), async (req, res) => {
    try {
      const { start_date, end_date, user_id, role, sort_by, interval } = req.query;

      let userIds = null;
      try {
        userIds = parseIds(user_id);
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }

      const results = await queries.getSalesByUser(start_date, end_date, userIds, role, sort_by, interval);
      
      res.json({
        success: true,
        count: results.length,
        data: results
      });
    } catch (error) {
      console.error('Error in /api/sales/by-user:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  });

  app.get('/api/v1/sales/by-group', middleware.validateSalesParams(groupSortFields), async (req, res) => {
    try {
      const { start_date, end_date, group_id, role, sort_by, interval } = req.query;

      let groupIds = null;
      try {
        groupIds = parseIds(group_id);
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }

      const results = await queries.getSalesByGroup(start_date, end_date, groupIds, role, sort_by, interval);
      
      res.json({
        success: true,
        count: results.length,
        data: results
      });
    } catch (error) {
      console.error('Error in /api/sales/by-group:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  });

  app.listen(PORT, HOST);
  console.log(`Server is running on http://${HOST}:${PORT}`);
}

start();
