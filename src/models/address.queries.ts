export const AddressQueries = {
    CreateAddress: 'INSERT INTO address (`unit_number`, `address_line`, `postal_code`, `city`, `province`, `country`) VALUES (?)',
    DeleteAddress: 'DELETE FROM address WHERE id = ?',
    GetAddressById: 'SELECT * FROM address WHERE id = ?',
    UpdateAddress: 'UPDATE address SET unit_number = ?, address_line = ?, postal_code = ?, city = ?, province = ?, country = ? WHERE id = ?',
};