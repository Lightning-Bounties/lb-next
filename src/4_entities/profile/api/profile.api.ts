import { appApi } from "@/5_shared/api/app.api";

class ProfileApi {
  async getUserFullData(userId: string) {
    const userBaseInfo = await appApi.users.getUserApiUsersGet({
      userId: userId,
    });
    const userRewards = await appApi.rewards.listRewardsApiRewardsGet({
      rewarderId: userId,
    });

    const userBounties = await appApi.issues.listIssuesApiIssuesGet({
      winnerId: userId
    });

    return {
      userInfo: userBaseInfo,
      userRewards: userRewards,
      userBounties: userBounties
    };
  }
}

const profileApi = new ProfileApi();
export { profileApi };
