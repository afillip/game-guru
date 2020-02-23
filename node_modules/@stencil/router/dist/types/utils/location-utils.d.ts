import { LocationSegments } from '../global/interfaces';
export declare const createKey: (keyLength: number) => string;
export declare const resolvePathname: (to: string, from?: string) => string;
export declare const valueEqual: (a: any, b: any) => boolean;
export declare const locationsAreEqual: (a: LocationSegments, b: LocationSegments) => boolean;
export declare const createLocation: (path: string | LocationSegments, state: any, key: string, currentLocation?: LocationSegments | undefined) => LocationSegments;
