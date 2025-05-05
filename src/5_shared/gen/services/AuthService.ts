/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TokenResponse } from '../models/TokenResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Github Auth
     * @returns void
     * @throws ApiError
     */
    public githubAuthApiAuthGithubGet({
        redirectUri,
    }: {
        redirectUri?: string | null;
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/auth/github',
            query: {
                redirect_uri: redirectUri,
            },
            errors: {
                308: `Successful Response`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Github Callback
     * @returns TokenResponse Successful Response
     * @throws ApiError
     */
    public githubCallbackApiAuthGithubCallbackGet({
        code,
    }: {
        code: string;
    }): CancelablePromise<TokenResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/auth/github/callback',
            query: {
                code: code,
            },
            errors: {
                401: `Unauthorized`,
                422: `Validation Error`,
            },
        });
    }
}
