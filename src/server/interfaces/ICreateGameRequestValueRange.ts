import { DimensionEnum } from '../enums/DimensionEnum';

export interface ICreateGameRequestValueRange {
    values: ListValueFormat;
    range?: string;
    majorDimension?: DimensionEnum;
}

/**
 * This is an array of arrays,
 * the outer array representing all the data and
 * each inner array representing a major dimension.
 * Each item in the inner array corresponds with one cell.
 */
export type ListValueFormat = Array<Array<any>>;