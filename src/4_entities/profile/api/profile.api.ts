import { appApi } from "@/5_shared/api/app.api";

class ProfileApi {
  async getUserFullData(userId: string) {
    const userBaseInfo = await appApi.users.getUserApiUsersGet({
      userId: userId,
    });
    const userRewards = await appApi.rewards.listRewardsApiRewardsGet({
      rewarderId: userId,
    });

    return {
      userInfo: userBaseInfo,
      userRewards: userRewards,
    };
  }
}

const profileApi = new ProfileApi();
export { profileApi };
