import { appApi } from '@/5_shared/api/app.api'
import { API_URL, FEED_LIMIT } from '@/5_shared/consts/app.consts'
import { IssueExpandedSchema } from '@/5_shared/gen'

class FeedApi {

    private FeedApiKey = ['FeedApi']

    qkGetFeedTotalCount = () => [this.FeedApiKey, 'getFeedTotalCount']

    async getFeedTotalCount() {
        const resp = await appApi.issues.countIssuesApiIssuesCountGet({})
        return resp.count
    }

    async createReward(opts: { issueUrl: string, rewardAmount: number, lockedUntilMins: number }) {
        const resp = await appApi.rewards.postRewardApiRewardsPost({
            requestBody: {
                issue_html_url: opts.issueUrl,
                reward_sats: opts.rewardAmount,
                locked_until_mins: opts.lockedUntilMins
            }
        })
        return resp
    }

    async checkPull(opts: { 'repo_full_name': string, 'pull_request_number': number }) {
        const resp = await appApi.rewards.checkPullApiRewardsCheckPullPost({
            requestBody: {
                'repo_full_name': opts.repo_full_name,
                'pull_request_number': opts.pull_request_number
            }
        })
        return resp
    }

    async getFeedList(page: number) {
        const resp = await fetch(
            `${API_URL}/api/issues/?distinct_issues=true&skip=${FEED_LIMIT * ((page ?? 1) - 1)}&limit=${FEED_LIMIT}`,
            {
                next: {
                    tags: ['feed'],
                },
                cache: 'no-cache'
            }
        )
        const data: IssueExpandedSchema[] = await resp.json()
        return data
    }
}

const feedApi = new FeedApi()

export { feedApi }