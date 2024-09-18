/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserSchema } from '../models/UserSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Authenticated User
     * @returns UserSchema Successful Response
     * @throws ApiError
     */
    public getAuthenticatedUserApiUsersMeGet(): CancelablePromise<UserSchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/users/me',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get User
     * Fetches a user by its ID or GitHub username.
     *
     * Throws
     * - **400** if none parameters were provided.
     * - **404** if the user does not exist.
     * @returns UserSchema Successful Response
     * @throws ApiError
     */
    public getUserApiUsersGet({
        userId,
        username,
    }: {
        userId?: (string | null),
        username?: (string | null),
    }): CancelablePromise<UserSchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/users/',
            query: {
                'user_id': userId,
                'username': username,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
}
