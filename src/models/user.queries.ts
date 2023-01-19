export const UserQueries = {
  GetUsers: `SELECT * FROM user`,
  DeleteUser: `DELETE FROM user WHERE id = ?`,
};
