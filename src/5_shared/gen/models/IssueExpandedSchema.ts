/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RepositoryData } from './RepositoryData';
import type { UserData } from './UserData';
export type IssueExpandedSchema = {
    created_at: string;
    modified_at: string;
    id: string;
    repository_id: string;
    github_id: number;
    issue_number: number;
    title: string;
    body?: (string | null);
    html_url?: (string | null);
    is_closed: boolean;
    winner_id?: (string | null);
    claimed_at?: (string | null);
    last_rewarder_id?: (string | null);
    second_last_rewarder_id?: (string | null);
    third_last_rewarder_id?: (string | null);
    repository_data: RepositoryData;
    winner_data: (UserData | null);
    last_rewarder_data: (UserData | null);
    second_last_rewarder_data: (UserData | null);
    third_last_rewarder_data: (UserData | null);
    total_rewards: number;
    total_reward_sats: number;
    unlocked_total_rewards: number;
    unexpired_total_rewards: number;
};

