/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckOneTimePaymentRequest } from '../models/CheckOneTimePaymentRequest';
import type { CheckOneTimePaymentResponse } from '../models/CheckOneTimePaymentResponse';
import type { CheckPullRequest } from '../models/CheckPullRequest';
import type { ClaimRewardRequest } from '../models/ClaimRewardRequest';
import type { ClaimRewardResponse } from '../models/ClaimRewardResponse';
import type { CountResponse } from '../models/CountResponse';
import type { CreateOneTimePaymentResponse } from '../models/CreateOneTimePaymentResponse';
import type { CreateOneTimeRewardRequest } from '../models/CreateOneTimeRewardRequest';
import type { CreateRewardRequest } from '../models/CreateRewardRequest';
import type { RewardCompletionSchema } from '../models/RewardCompletionSchema';
import type { RewardExpandedSchema } from '../models/RewardExpandedSchema';
import type { RewardSchema } from '../models/RewardSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class RewardsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Post Reward
     * @returns RewardSchema Successful Response
     * @throws ApiError
     */
    public postRewardApiRewardsPost({
        requestBody,
    }: {
        requestBody: CreateRewardRequest,
    }): CancelablePromise<RewardSchema> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/rewards/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * List Rewards
     * @returns RewardExpandedSchema Successful Response
     * @throws ApiError
     */
    public listRewardsApiRewardsGet({
        skip,
        limit = 100,
        issueId,
        isClosed,
        rewarderId,
        isExpired,
        isLocked,
    }: {
        skip?: number,
        limit?: number,
        issueId?: (string | null),
        isClosed?: (boolean | null),
        rewarderId?: (string | null),
        isExpired?: (boolean | null),
        isLocked?: (boolean | null),
    }): CancelablePromise<Array<RewardExpandedSchema>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/rewards/',
            query: {
                'skip': skip,
                'limit': limit,
                'issue_id': issueId,
                'is_closed': isClosed,
                'rewarder_id': rewarderId,
                'is_expired': isExpired,
                'is_locked': isLocked,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Onetime Payment
     * Create a one-time reward using the system user
     * @returns CreateOneTimePaymentResponse Successful Response
     * @throws ApiError
     */
    public createOnetimePaymentApiRewardsOnetimePost({
        requestBody,
    }: {
        requestBody: CreateOneTimeRewardRequest,
    }): CancelablePromise<CreateOneTimePaymentResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/rewards/onetime',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Check Onetime Payment
     * Check if a one-time payment has been received and create the reward if so
     * @returns CheckOneTimePaymentResponse Successful Response
     * @throws ApiError
     */
    public checkOnetimePaymentApiRewardsOnetimeCheckPost({
        requestBody,
    }: {
        requestBody: CheckOneTimePaymentRequest,
    }): CancelablePromise<CheckOneTimePaymentResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/rewards/onetime/check',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Count Rewards
     * @returns CountResponse Successful Response
     * @throws ApiError
     */
    public countRewardsApiRewardsCountGet({
        issueId,
        isClosed,
        rewarderId,
        isExpired,
        isLocked,
    }: {
        issueId?: (string | null),
        isClosed?: (boolean | null),
        rewarderId?: (string | null),
        isExpired?: (boolean | null),
        isLocked?: (boolean | null),
    }): CancelablePromise<CountResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/rewards/count',
            query: {
                'issue_id': issueId,
                'is_closed': isClosed,
                'rewarder_id': rewarderId,
                'is_expired': isExpired,
                'is_locked': isLocked,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Reward
     * Fetches a reward by its ID.
     *
     * Throws:
     * - **404** if the reward not found.
     * @returns RewardExpandedSchema Successful Response
     * @throws ApiError
     */
    public getRewardApiRewardsRewardIdGet({
        rewardId,
    }: {
        rewardId: string,
    }): CancelablePromise<RewardExpandedSchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/rewards/{reward_id}',
            path: {
                'reward_id': rewardId,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Expire Reward
     * @returns any Successful Response
     * @throws ApiError
     */
    public expireRewardApiRewardsRewardIdExpirePost({
        rewardId,
    }: {
        rewardId: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/rewards/{reward_id}/expire',
            path: {
                'reward_id': rewardId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Check Pull
     * @returns RewardCompletionSchema Successful Response
     * @throws ApiError
     */
    public checkPullApiRewardsCheckPullPost({
        requestBody,
    }: {
        requestBody: CheckPullRequest,
    }): CancelablePromise<Array<RewardCompletionSchema>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/rewards/check-pull',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Claim Reward
     * @returns ClaimRewardResponse Successful Response
     * @throws ApiError
     */
    public claimRewardApiRewardsClaimRewardPost({
        requestBody,
    }: {
        requestBody: ClaimRewardRequest,
    }): CancelablePromise<ClaimRewardResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/rewards/claim-reward',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                422: `Validation Error`,
            },
        });
    }
}
