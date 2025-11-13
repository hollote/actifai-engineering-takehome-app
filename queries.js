'use strict';

const pool = require('./db');

async function getSalesByUser(startDate, endDate, userIds, role, sortBy = 'period', interval = 'month') {
  try {
    const params = [];
    const truncInterval = interval || 'month';
    
    let query = `
      SELECT 
        DATE_TRUNC('${truncInterval}', s.date) as period,
        u.id as user_id,
        u.name as user_name,
        u.role as user_role,
        COUNT(s.id)::INTEGER as sales_count,
        SUM(s.amount)::DOUBLE PRECISION as total_revenue,
        ROUND(AVG(s.amount))::INTEGER as average_revenue
      FROM sales s
      JOIN users u ON s.user_id = u.id
    `;

    const whereConditions = [];
    let paramIndex = 1;
    
    if (startDate) {
      whereConditions.push(`s.date >= $${paramIndex}`);
      params.push(startDate);
      paramIndex++;
    }
    
    if (endDate) {
      whereConditions.push(`s.date <= $${paramIndex}`);
      params.push(endDate);
      paramIndex++;
    }
    
    if (userIds && userIds.length > 0) {
      whereConditions.push(`u.id = ANY($${paramIndex})`);
      params.push(userIds);
      paramIndex++;
    }
    
    if (role) {
      whereConditions.push(`u.role = $${paramIndex}`);
      params.push(role);
      paramIndex++;
    }

    if (whereConditions.length > 0) {
      query += ' WHERE ' + whereConditions.join(' AND ');
    }

    query += ` GROUP BY DATE_TRUNC('${truncInterval}', s.date), u.id, u.name, u.role`;

    const sortFields = ['period', 'total_revenue', 'sales_count', 'average_revenue', 'user_id'];
    const sortField = sortFields.includes(sortBy) ? sortBy : 'period';
    query += ` ORDER BY ${sortField} DESC, period`;

    const result = await pool.query(query, params);
    return result.rows;

  } catch (error) {
    throw error;
  }
}

async function getSalesByGroup(startDate, endDate, groupIds, role, sortBy = 'period', interval = 'month') {
  try {
    const params = [];
    const truncInterval = interval || 'month';
    
    let query = `
      SELECT 
        DATE_TRUNC('${truncInterval}', s.date) as period,
        g.id as group_id,
        g.name as group_name,
        COUNT(s.id)::INTEGER as sales_count,
        SUM(s.amount)::DOUBLE PRECISION as total_revenue,
        ROUND(AVG(s.amount))::INTEGER as average_revenue
      FROM sales s
      JOIN users u ON s.user_id = u.id
      JOIN user_groups ug ON u.id = ug.user_id
      JOIN groups g ON ug.group_id = g.id
    `;

    const whereConditions = [];
    let paramIndex = 1;
    
    if (startDate) {
      whereConditions.push(`s.date >= $${paramIndex}`);
      params.push(startDate);
      paramIndex++;
    }
    
    if (endDate) {
      whereConditions.push(`s.date <= $${paramIndex}`);
      params.push(endDate);
      paramIndex++;
    }
    
    if (groupIds && groupIds.length > 0) {
      whereConditions.push(`g.id = ANY($${paramIndex})`);
      params.push(groupIds);
      paramIndex++;
    }
    
    if (role) {
      whereConditions.push(`u.role = $${paramIndex}`);
      params.push(role);
      paramIndex++;
    }

    if (whereConditions.length > 0) {
      query += ' WHERE ' + whereConditions.join(' AND ');
    }

    query += ` GROUP BY DATE_TRUNC('${truncInterval}', s.date), g.id, g.name`;

    const sortFields = ['period', 'total_revenue', 'sales_count', 'average_revenue', 'group_id'];
    const sortField = sortFields.includes(sortBy) ? sortBy : 'period';
    query += ` ORDER BY ${sortField} DESC, period`;

    const result = await pool.query(query, params);
    return result.rows;

  } catch (error) {
    throw error;
  }
}

module.exports = {
  getSalesByUser,
  getSalesByGroup
};
