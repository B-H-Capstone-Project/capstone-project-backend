import { AddressQueries } from "../models/address.queries";
import { execute } from "../database";

export const createAddress = (values:any) => {
    return execute(AddressQueries.CreateAddress, [values]);
  };

  export const deleteAddress = (addressId:any) => {
    return execute(AddressQueries.DeleteAddress, addressId);
  }

  export const getAddressById = (addressId:any) => {
    return execute(AddressQueries.GetAddressById, [addressId]);
  }

  export const updateAddress = (values:any, addressId:any) => {
    return execute(AddressQueries.UpdateAddress, [...values, addressId]);
  }

  export default { getAddressById, deleteAddress, createAddress, updateAddress};