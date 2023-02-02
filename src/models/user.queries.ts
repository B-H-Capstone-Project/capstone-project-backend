export const UserQueries = {
  GetUsers: "SELECT * FROM user",
  GetUserById: "SELECT * FROM user WHERE id = ?",
  GetUserByEmail: "SELECT * FROM user WHERE email = ?",
  DeleteUser: "DELETE FROM user WHERE id = ?",
  CreateAddress:
    "INSERT INTO address (`unit_number`, `address_line`, `postal_code`, `city`, `province`, `country`) VALUES (?)",
  CreateUser:
    "INSERT INTO user (`email`, `password`, `first_name`, `last_name`, `phone_number`, `address_id`) VALUES (?)",
  UpdateUser:
    "UPDATE user SET email = ?, password = ?, first_name = ?, last_name = ?, phone_number = ?, address_id = ? WHERE id = ?",
};
