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
 * @interface TransactionDto
 */
export interface TransactionDto {
    /**
     * 
     * @type {string}
     * @memberof TransactionDto
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof TransactionDto
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof TransactionDto
     */
    updatedAt?: Date;
    /**
     * 
     * @type {AccountDto}
     * @memberof TransactionDto
     */
    account?: AccountDto;
    /**
     * 
     * @type {string}
     * @memberof TransactionDto
     */
    transactionType?: TransactionDtoTransactionTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof TransactionDto
     */
    amount?: number;
    /**
     * 
     * @type {Date}
     * @memberof TransactionDto
     */
    transactionDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof TransactionDto
     */
    reference?: string;
    /**
     * 
     * @type {number}
     * @memberof TransactionDto
     */
    newBalance?: number;
    /**
     * 
     * @type {UserDto}
     * @memberof TransactionDto
     */
    user?: UserDto;
}


/**
 * @export
 */
export const TransactionDtoTransactionTypeEnum = {
    Deposit: 'DEPOSIT',
    Withdrawal: 'WITHDRAWAL',
    Transfer: 'TRANSFER',
    Payment: 'PAYMENT',
    Recurring: 'RECURRING'
} as const;
export type TransactionDtoTransactionTypeEnum = typeof TransactionDtoTransactionTypeEnum[keyof typeof TransactionDtoTransactionTypeEnum];


/**
 * Check if a given object implements the TransactionDto interface.
 */
export function instanceOfTransactionDto(value: object): value is TransactionDto {
    return true;
}

export function TransactionDtoFromJSON(json: any): TransactionDto {
    return TransactionDtoFromJSONTyped(json, false);
}

export function TransactionDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionDto {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'createdAt': json['createdAt'] == null ? undefined : (new Date(json['createdAt'])),
        'updatedAt': json['updatedAt'] == null ? undefined : (new Date(json['updatedAt'])),
        'account': json['account'] == null ? undefined : AccountDtoFromJSON(json['account']),
        'transactionType': json['transactionType'] == null ? undefined : json['transactionType'],
        'amount': json['amount'] == null ? undefined : json['amount'],
        'transactionDate': json['transactionDate'] == null ? undefined : (new Date(json['transactionDate'])),
        'reference': json['reference'] == null ? undefined : json['reference'],
        'newBalance': json['newBalance'] == null ? undefined : json['newBalance'],
        'user': json['user'] == null ? undefined : UserDtoFromJSON(json['user']),
    };
}

export function TransactionDtoToJSON(json: any): TransactionDto {
    return TransactionDtoToJSONTyped(json, false);
}

export function TransactionDtoToJSONTyped(value?: TransactionDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'createdAt': value['createdAt'] == null ? undefined : ((value['createdAt']).toISOString()),
        'updatedAt': value['updatedAt'] == null ? undefined : ((value['updatedAt']).toISOString()),
        'account': AccountDtoToJSON(value['account']),
        'transactionType': value['transactionType'],
        'amount': value['amount'],
        'transactionDate': value['transactionDate'] == null ? undefined : ((value['transactionDate']).toISOString()),
        'reference': value['reference'],
        'newBalance': value['newBalance'],
        'user': UserDtoToJSON(value['user']),
    };
}

