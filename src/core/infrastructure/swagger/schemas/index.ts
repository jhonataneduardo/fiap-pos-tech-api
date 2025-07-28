import { commonSchemas } from './common';
import { customerSchemas } from './customer';
import { vehicleSchemas } from './vehicle';
import { saleSchemas } from './sale';

export const schemas = {
    ...commonSchemas,
    ...customerSchemas,
    ...vehicleSchemas,
    ...saleSchemas
};