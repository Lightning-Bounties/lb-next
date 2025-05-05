import { appApi } from '@/5_shared/api/app.api';

class ProfileApi {
    private ProfileApiKey = ['ProfileApi'];

    qkGetProfileRewardsHistory(userId: string) {
        return [this.ProfileApiKey, 'getProfileRewardsHistory', userId];
    }

    async getProfileRewardsHistory(userId: string) {
        const resp = await appApi.rewards.listRewardsApiRewardsGet({
            rewarderId: userId,
        });
        return resp;
    }

    qkGetProfilePaymentsHistory() {
        return [this.ProfileApiKey, 'getProfilePaymentsHistory'];
    }

    async getProfilePaymentsHistory(limit: number = 100) {
        const resp = await appApi.wallets.getWalletHistoryApiWalletHistoryGet({
            limit: limit,
        });
        return resp;
    }

    qkGetUserWallet() {
        return [this.ProfileApiKey, 'getUserWallet'];
    }

    async getUserWallet() {
        const resp = await appApi.wallets.getMyWalletApiWalletGet();
        return resp;
    }

    async createPaymentLink(opts: { amount: number }) {
        const resp = await appApi.wallets.depositSatsApiWalletDepositPost({
            requestBody: {
                amount_sats: opts.amount,
            },
        });
        return resp;
    }

    async withdrawFunds(opts: { paymentLink: string }) {
        const { success } =
            await appApi.wallets.withdrawSatsApiWalletWithdrawPost({
                requestBody: {
                    invoice: opts.paymentLink,
                },
            });
        return success;
    }

    async expireReward(rewardId: string) {
        const resp =
            await appApi.rewards.expireRewardApiRewardsRewardIdExpirePost({
                rewardId: rewardId,
            });
        return resp;
    }
}

const profileApi = new ProfileApi();
export { profileApi };
