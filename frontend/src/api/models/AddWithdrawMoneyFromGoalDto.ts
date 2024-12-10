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
/**
 * 
 * @export
 * @interface AddWithdrawMoneyFromGoalDto
 */
export interface AddWithdrawMoneyFromGoalDto {
    /**
     * 
     * @type {number}
     * @memberof AddWithdrawMoneyFromGoalDto
     */
    currentAmount: number;
}

/**
 * Check if a given object implements the AddWithdrawMoneyFromGoalDto interface.
 */
export function instanceOfAddWithdrawMoneyFromGoalDto(value: object): value is AddWithdrawMoneyFromGoalDto {
    if (!('currentAmount' in value) || value['currentAmount'] === undefined) return false;
    return true;
}

export function AddWithdrawMoneyFromGoalDtoFromJSON(json: any): AddWithdrawMoneyFromGoalDto {
    return AddWithdrawMoneyFromGoalDtoFromJSONTyped(json, false);
}

export function AddWithdrawMoneyFromGoalDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddWithdrawMoneyFromGoalDto {
    if (json == null) {
        return json;
    }
    return {
        
        'currentAmount': json['currentAmount'],
    };
}

export function AddWithdrawMoneyFromGoalDtoToJSON(json: any): AddWithdrawMoneyFromGoalDto {
    return AddWithdrawMoneyFromGoalDtoToJSONTyped(json, false);
}

export function AddWithdrawMoneyFromGoalDtoToJSONTyped(value?: AddWithdrawMoneyFromGoalDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'currentAmount': value['currentAmount'],
    };
}
