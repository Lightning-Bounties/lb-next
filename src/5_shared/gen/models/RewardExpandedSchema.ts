/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IssueData } from './IssueData';
import type { UserData } from './UserData';
export type RewardExpandedSchema = {
    created_at: string;
    modified_at: string;
    id: string;
    issue_id: string;
    rewarder_id: string;
    reward_sats: number;
    locked_until: string;
    expired_at?: (string | null);
    rewarder_data: UserData;
    issue_data: IssueData;
};

