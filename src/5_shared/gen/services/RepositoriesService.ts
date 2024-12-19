/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CountResponse } from '../models/CountResponse';
import type { RepositorySchema } from '../models/RepositorySchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class RepositoriesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List Repositories
     * @returns RepositorySchema Successful Response
     * @throws ApiError
     */
    public listRepositoriesApiRepositoriesGet({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<Array<RepositorySchema>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/repositories/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Count Repositories
     * @returns CountResponse Successful Response
     * @throws ApiError
     */
    public countRepositoriesApiRepositoriesCountGet(): CancelablePromise<CountResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/repositories/count',
        });
    }
    /**
     * Get Repository By Id
     * Fetches a repository by its ID
     *
     * Throws
     * - **404** if the repository is not found
     * @returns RepositorySchema Successful Response
     * @throws ApiError
     */
    public getRepositoryByIdApiRepositoriesRepositoryIdGet({
        repositoryId,
    }: {
        repositoryId: string,
    }): CancelablePromise<RepositorySchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/repositories/{repository_id}',
            path: {
                'repository_id': repositoryId,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
}
