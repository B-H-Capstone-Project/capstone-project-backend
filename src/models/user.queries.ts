export const UserQueries = {
  // Get
  GetUsers: "SELECT * FROM user",
  GetUserById: "SELECT * FROM user WHERE id = ?",
  GetUserByEmail: "SELECT * FROM user WHERE email = ?",
  GetUsersEmployee: "SELECT * FROM user WHERE role = 1 OR role = 2",
  GetUsersCustomer: "SELECT * FROM user WHERE role = 3",

  // Delete
  DeleteUser: "DELETE FROM user WHERE id = ?",

  // Create
  // CreateAddress: "INSERT INTO address (`unit_number`, `address_line`, `postal_code`, `city`, `province`, `country`) VALUES (?)",
  CreateUser: "INSERT INTO user (`email`, `is_active`, `first_name`, `last_name`, `password`, `role`, `phone_number`, `address_line1`, `address_line2`, `city`, `province`, `country`) VALUES (?)",

  // Update
  UpdateUser: "UPDATE user SET password = ?, first_name = ?, last_name = ?, phone_number = ?, address_line1 = ?, address_line2 = ?, city = ?, province = ?, postal_code = ?, country = ? WHERE id = ?",
};
