import { AddressQueries } from "../models/address.queries";
import { execute } from "../database";
import { Address } from "../types/address";

export const createAddress = (addValues:any) => {
    return execute<Address>(AddressQueries.CreateAddress, [addValues]);
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