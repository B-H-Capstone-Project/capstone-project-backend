import { AddressQueries } from "../models/address.queries";
import { execute } from "../database";
import { Address } from "../types/address";

export const createAddress = (addValues:any) => {
    return execute<Address>(AddressQueries.CreateAddress, [addValues]);
  };

