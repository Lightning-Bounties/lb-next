/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CountResponse } from '../models/CountResponse';
import type { IssueExpandedSchema } from '../models/IssueExpandedSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class IssuesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List Issues
     * @returns IssueExpandedSchema Successful Response
     * @throws ApiError
     */
    public listIssuesApiIssuesGet({
        skip,
        limit = 100,
        repositoryIds,
        isClosed,
        winnerId,
    }: {
        skip?: number,
        limit?: number,
        repositoryIds?: Array<string>,
        isClosed?: (boolean | null),
        winnerId?: (string | null),
    }): CancelablePromise<Array<IssueExpandedSchema>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/issues/',
            query: {
                'skip': skip,
                'limit': limit,
                'repository_ids': repositoryIds,
                'is_closed': isClosed,
                'winner_id': winnerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Count Issues
     * @returns CountResponse Successful Response
     * @throws ApiError
     */
    public countIssuesApiIssuesCountGet({
        repositoryIds,
        isClosed,
        winnerId,
    }: {
        repositoryIds?: Array<string>,
        isClosed?: (boolean | null),
        winnerId?: (string | null),
    }): CancelablePromise<CountResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/issues/count',
            query: {
                'repository_ids': repositoryIds,
                'is_closed': isClosed,
                'winner_id': winnerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Issue By Id
     * Fetches an issue by its ID.
     *
     * Throws:
     * - **404** if issue not found.
     * @returns IssueExpandedSchema Successful Response
     * @throws ApiError
     */
    public getIssueByIdApiIssuesIssueIdGet({
        issueId,
    }: {
        issueId: string,
    }): CancelablePromise<IssueExpandedSchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/issues/{issue_id}',
            path: {
                'issue_id': issueId,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
}
