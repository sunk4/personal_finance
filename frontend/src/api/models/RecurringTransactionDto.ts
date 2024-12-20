/* tslint:disable */
/* eslint-disable */
/**
 * API Documentation
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { UserDto } from './UserDto';
import {
    UserDtoFromJSON,
    UserDtoFromJSONTyped,
    UserDtoToJSON,
    UserDtoToJSONTyped,
} from './UserDto';
import type { AccountDto } from './AccountDto';
import {
    AccountDtoFromJSON,
    AccountDtoFromJSONTyped,
    AccountDtoToJSON,
    AccountDtoToJSONTyped,
} from './AccountDto';

/**
 * 
 * @export
 * @interface RecurringTransactionDto
 */
export interface RecurringTransactionDto {
    /**
     * 
     * @type {string}
     * @memberof RecurringTransactionDto
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof RecurringTransactionDto
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof RecurringTransactionDto
     */
    updatedAt?: Date;
    /**
     * 
     * @type {UserDto}
     * @memberof RecurringTransactionDto
     */
    user?: UserDto;
    /**
     * 
     * @type {AccountDto}
     * @memberof RecurringTransactionDto
     */
    account?: AccountDto;
    /**
     * 
     * @type {string}
     * @memberof RecurringTransactionDto
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof RecurringTransactionDto
     */
    amount?: number;
    /**
     * 
     * @type {string}
     * @memberof RecurringTransactionDto
     */
    frequency: RecurringTransactionDtoFrequencyEnum;
    /**
     * 
     * @type {Date}
     * @memberof RecurringTransactionDto
     */
    startDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof RecurringTransactionDto
     */
    endDate: Date;
}


/**
 * @export
 */
export const RecurringTransactionDtoFrequencyEnum = {
    Daily: 'DAILY',
    Weekly: 'WEEKLY',
    Biweekly: 'BIWEEKLY',
    Monthly: 'MONTHLY',
    Bimonthly: 'BIMONTHLY',
    Quarterly: 'QUARTERLY',
    Semiannually: 'SEMIANNUALLY',
    Annually: 'ANNUALLY'
} as const;
export type RecurringTransactionDtoFrequencyEnum = typeof RecurringTransactionDtoFrequencyEnum[keyof typeof RecurringTransactionDtoFrequencyEnum];


/**
 * Check if a given object implements the RecurringTransactionDto interface.
 */
export function instanceOfRecurringTransactionDto(value: object): value is RecurringTransactionDto {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('frequency' in value) || value['frequency'] === undefined) return false;
    if (!('startDate' in value) || value['startDate'] === undefined) return false;
    if (!('endDate' in value) || value['endDate'] === undefined) return false;
    return true;
}

export function RecurringTransactionDtoFromJSON(json: any): RecurringTransactionDto {
    return RecurringTransactionDtoFromJSONTyped(json, false);
}

export function RecurringTransactionDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): RecurringTransactionDto {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'createdAt': json['createdAt'] == null ? undefined : (new Date(json['createdAt'])),
        'updatedAt': json['updatedAt'] == null ? undefined : (new Date(json['updatedAt'])),
        'user': json['user'] == null ? undefined : UserDtoFromJSON(json['user']),
        'account': json['account'] == null ? undefined : AccountDtoFromJSON(json['account']),
        'name': json['name'],
        'amount': json['amount'] == null ? undefined : json['amount'],
        'frequency': json['frequency'],
        'startDate': (new Date(json['startDate'])),
        'endDate': (new Date(json['endDate'])),
    };
}

export function RecurringTransactionDtoToJSON(json: any): RecurringTransactionDto {
    return RecurringTransactionDtoToJSONTyped(json, false);
}

export function RecurringTransactionDtoToJSONTyped(value?: RecurringTransactionDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'createdAt': value['createdAt'] == null ? undefined : ((value['createdAt']).toISOString()),
        'updatedAt': value['updatedAt'] == null ? undefined : ((value['updatedAt']).toISOString()),
        'user': UserDtoToJSON(value['user']),
        'account': AccountDtoToJSON(value['account']),
        'name': value['name'],
        'amount': value['amount'],
        'frequency': value['frequency'],
        'startDate': ((value['startDate']).toISOString()),
        'endDate': ((value['endDate']).toISOString()),
    };
}

