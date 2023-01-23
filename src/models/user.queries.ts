export const UserQueries = {
  GetUsers: 'SELECT * FROM user',
  GetUserById: 'SELECT * FROM user WHERE id = ?',
  DeleteUser: 'DELETE FROM user WHERE id = ?',
  CreateUser: 'INSERT INTO user (`email`, `password`, `first_name`, `last_name`, `phone_number`, `address`) VALUES (?)',
};
