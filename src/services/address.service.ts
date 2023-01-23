import { AddressQueries } from "../models/address.queries";
import { execute } from "../database";

export const createAddress = (values:any) => {
    return execute(AddressQueries.CreateAddress, [values]);
  };

