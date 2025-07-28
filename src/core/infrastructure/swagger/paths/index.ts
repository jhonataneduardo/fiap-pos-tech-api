import { healthPaths } from './health';
import { customerPaths } from './customer';
import { vehiclePaths } from './vehicle';
import { salePaths } from './sale';

export const paths = {
    ...healthPaths,
    ...customerPaths,
    ...vehiclePaths,
    ...salePaths
};