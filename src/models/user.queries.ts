export const UserQueries = {
  // Get
  GetUsers: 'SELECT * FROM user',
  GetUserById: 'SELECT * FROM user WHERE id = ?',
  GetUserByEmail: 'SELECT * FROM user WHERE email = ?',
  GetUsersEmployee: 'SELECT * FROM user WHERE role = 1 OR role = 2',
  GetUsersCustomer: 'SELECT * FROM user WHERE role = 3',

  // Get New User (week)
  GetNewEmployees: 'SELECT * FROM user WHERE created_date >= DATE_SUB(NOW(), INTERVAL 1 WEEK) AND role = 1 OR role = 2;',
  GetNewCustomers: 'SELECT * FROM user WHERE created_date >= DATE_SUB(NOW(), INTERVAL 1 WEEK) AND role = 3',

  // Get % of New User
  GetNewEmployeesPercentage: `SELECT CONCAT(ROUND(((COUNT(CASE WHEN WEEK(created_date) = WEEK(NOW()) THEN 1 ELSE NULL END) - COUNT(CASE WHEN WEEK(created_date) = WEEK(NOW()) - 1 THEN 1 ELSE NULL END)) / COUNT(CASE WHEN WEEK(created_date) = WEEK(NOW()) - 1 THEN 1 ELSE NULL END)) * 100), '%') AS increase_percentage FROM user WHERE WEEK(created_date) >= WEEK(NOW()) - 1 AND role = 1 OR role = 2;`,
  GetNewCustomersPercentage: `SELECT CONCAT(ROUND(((COUNT(CASE WHEN WEEK(created_date) = WEEK(NOW()) THEN 1 ELSE NULL END) - COUNT(CASE WHEN WEEK(created_date) = WEEK(NOW()) - 1 THEN 1 ELSE NULL END)) / COUNT(CASE WHEN WEEK(created_date) = WEEK(NOW()) - 1 THEN 1 ELSE NULL END)) * 100), '%') AS increase_percentage FROM user WHERE WEEK(created_date) >= WEEK(NOW()) - 1 AND role = 3;`,

  // Delete
  DeleteUser: 'DELETE FROM user WHERE id = ?',

  // Create
  CreateUser:
    'INSERT INTO user (`email`, `first_name`, `last_name`, `password`, `phone_number`, `address_line1`, `address_line2`, `city`, `province`, `postal_code`, `country`, `role`, `is_active`) VALUES (?)',

  // Update
  UpdateUser: "UPDATE user SET password = ?, first_name = ?, last_name = ?, phone_number = ?, address_line1 = ?, address_line2 = ?, city = ?, province = ?, postal_code = ?, country = ?, role = ?, is_active = ? WHERE id = ?",

  //Google User
  NewGoogleUser: "INSERT INTO user (`email`, `first_name`, `last_name`, `password`, `phone_number`, `address_line1`, `address_line2`, `city`, `province`, `postal_code`, `country`, `profile`, `is_verified`) VALUES(?)",

  VerifySignup: 'UPDATE user SET is_verified = 1 WHERE email = ?',

  UpdatePassword: 'UPDATE user SET password = ? WHERE email = ?',
};


