import { healthPaths } from './health';
import { customerPaths } from './customer';
import { vehiclePaths } from './vehicle';

export const paths = {
    ...healthPaths,
    ...customerPaths,
    ...vehiclePaths
};