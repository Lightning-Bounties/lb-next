/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepositRequestSchema } from '../models/DepositRequestSchema';
import type { DepositResponseSchema } from '../models/DepositResponseSchema';
import type { LightningTransactionSchema } from '../models/LightningTransactionSchema';
import type { WalletDetailResponse } from '../models/WalletDetailResponse';
import type { WithdrawRequestSchema } from '../models/WithdrawRequestSchema';
import type { WithdrawResponseSchema } from '../models/WithdrawResponseSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class WalletsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get My Wallet
     * Fetches the wallet details of the user authorized.
     * Creates a new wallet if no wallet found.
     *
     * Throws
     * - **401** if the user is not authorized.
     * - **500** if there was an error fetching / creating the wallet.
     * @returns WalletDetailResponse Successful Response
     * @throws ApiError
     */
    public getMyWalletApiWalletGet(): CancelablePromise<WalletDetailResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/wallet/',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Deposit Sats
     * Creates an incoming invoice to the wallet of the user authorized.
     *
     * Throws
     * - **401** if the user is not authorized.
     * - **404** if the user's wallet not found.
     * - **500** if there was en error making the invoice.
     * @returns DepositResponseSchema Successful Response
     * @throws ApiError
     */
    public depositSatsApiWalletDepositPost({
        requestBody,
    }: {
        requestBody: DepositRequestSchema;
    }): CancelablePromise<DepositResponseSchema> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/wallet/deposit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Validation Error`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Withdraw Sats
     * Pays the invoice passed from the authorized user's wallet.
     *
     * Throws
     * - **400** if there's not enough funds to pay the invoice or the invoice has been already paid.
     * - **401** if the user is not authorized.
     * - **404** if the user's wallet not found.
     * - **500** if there was en error paying the invoice.
     * @returns WithdrawResponseSchema Successful Response
     * @throws ApiError
     */
    public withdrawSatsApiWalletWithdrawPost({
        requestBody,
    }: {
        requestBody: WithdrawRequestSchema;
    }): CancelablePromise<WithdrawResponseSchema> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/wallet/withdraw',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Validation Error`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Get Wallet History
     * @returns LightningTransactionSchema Successful Response
     * @throws ApiError
     */
    public getWalletHistoryApiWalletHistoryGet({
        skip,
        limit = 100,
    }: {
        skip?: number;
        limit?: number;
    }): CancelablePromise<Array<LightningTransactionSchema>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/wallet/history',
            query: {
                skip: skip,
                limit: limit,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
}
