export const UserQueries = {
  // Get
  GetUsers: 'SELECT * FROM user',
  GetUserById: 'SELECT * FROM user WHERE id = ?',
  GetUserByEmail: 'SELECT * FROM user WHERE email = ?',
  GetUsersEmployee: 'SELECT * FROM user WHERE role = 1 OR role = 2',
  GetUsersCustomer: 'SELECT * FROM user WHERE role = 3',

  // Delete
  DeleteUser: 'DELETE FROM user WHERE id = ?',

  // Create
  CreateUser: "INSERT INTO user (`email`, `first_name`, `last_name`, `password`, `phone_number`, `address_line1`, `address_line2`, `city`, `province`, `postal_code`, `country`) VALUES (?)",

  // Update
  UpdateUser: "UPDATE user SET password = ?, first_name = ?, last_name = ?, phone_number = ?, address_line1 = ?, address_line2 = ?, city = ?, province = ?, postal_code = ?, country = ?, role = ?, is_active = ? WHERE id = ?",
};
