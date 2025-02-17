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
    rewarder_id?: (string | null);
    reward_sats: number;
    unlocks_at?: (string | null);
    expires_at?: (string | null);
    is_anonymous?: boolean;
    rewarder_data?: (UserData | null);
    issue_data: IssueData;
};

