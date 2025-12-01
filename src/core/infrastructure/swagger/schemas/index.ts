import { commonSchemas } from './common';
import { customerSchemas } from './customer';
import { vehicleSchemas } from './vehicle';

export const schemas = {
    ...commonSchemas,
    ...customerSchemas,
    ...vehicleSchemas
};