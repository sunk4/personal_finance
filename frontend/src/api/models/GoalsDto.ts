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

/**
 * 
 * @export
 * @interface GoalsDto
 */
export interface GoalsDto {
    /**
     * 
     * @type {string}
     * @memberof GoalsDto
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof GoalsDto
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof GoalsDto
     */
    updatedAt?: Date;
    /**
     * 
     * @type {UserDto}
     * @memberof GoalsDto
     */
    user?: UserDto;
    /**
     * 
     * @type {string}
     * @memberof GoalsDto
     */
    goalName?: string;
    /**
     * 
     * @type {number}
     * @memberof GoalsDto
     */
    targetAmount?: number;
    /**
     * 
     * @type {number}
     * @memberof GoalsDto
     */
    currentAmount?: number;
    /**
     * 
     * @type {number}
     * @memberof GoalsDto
     */
    remainingAmount?: number;
    /**
     * 
     * @type {Date}
     * @memberof GoalsDto
     */
    startDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof GoalsDto
     */
    targetDate?: Date;
}

/**
 * Check if a given object implements the GoalsDto interface.
 */
export function instanceOfGoalsDto(value: object): value is GoalsDto {
    return true;
}

export function GoalsDtoFromJSON(json: any): GoalsDto {
    return GoalsDtoFromJSONTyped(json, false);
}

export function GoalsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): GoalsDto {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'createdAt': json['createdAt'] == null ? undefined : (new Date(json['createdAt'])),
        'updatedAt': json['updatedAt'] == null ? undefined : (new Date(json['updatedAt'])),
        'user': json['user'] == null ? undefined : UserDtoFromJSON(json['user']),
        'goalName': json['goalName'] == null ? undefined : json['goalName'],
        'targetAmount': json['targetAmount'] == null ? undefined : json['targetAmount'],
        'currentAmount': json['currentAmount'] == null ? undefined : json['currentAmount'],
        'remainingAmount': json['remainingAmount'] == null ? undefined : json['remainingAmount'],
        'startDate': json['startDate'] == null ? undefined : (new Date(json['startDate'])),
        'targetDate': json['targetDate'] == null ? undefined : (new Date(json['targetDate'])),
    };
}

export function GoalsDtoToJSON(json: any): GoalsDto {
    return GoalsDtoToJSONTyped(json, false);
}

export function GoalsDtoToJSONTyped(value?: GoalsDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'createdAt': value['createdAt'] == null ? undefined : ((value['createdAt']).toISOString()),
        'updatedAt': value['updatedAt'] == null ? undefined : ((value['updatedAt']).toISOString()),
        'user': UserDtoToJSON(value['user']),
        'goalName': value['goalName'],
        'targetAmount': value['targetAmount'],
        'currentAmount': value['currentAmount'],
        'remainingAmount': value['remainingAmount'],
        'startDate': value['startDate'] == null ? undefined : ((value['startDate']).toISOString()),
        'targetDate': value['targetDate'] == null ? undefined : ((value['targetDate']).toISOString()),
    };
}

