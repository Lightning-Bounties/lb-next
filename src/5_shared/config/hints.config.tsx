import { ReactNode } from 'react';

type HintsConfig = Partial<{
    title: ReactNode;
    body: ReactNode;
    buttonText: ReactNode;
}>;

type HintsConfigMap = {
    [key: string]: HintsConfig;
};

const hintsConfig: HintsConfigMap = {
    rewardForm: {
        title: 'Create a new bounty',
        body: (
            <div>
                First make sure you&apos;ve deposited sats to your account on
                LB.{' '}
                <i>
                    For more help on this see{' '}
                    <a
                        href="https://docs.lightningbounties.com/docs/posting-a-bounty/deposit-funds-to-post-a-bounty"
                        target="blank"
                    >
                        this section in docs
                    </a>
                    .
                </i>
                <br />
                <br />
                Next find the Github Issue you want to add.{' '}
                <i>
                    You might create this issue, or it might already be created.
                    Even if another github user create the issue, you can still
                    post it.
                </i>
                <br />
                <br />
                Finally, paste the full URL to that issue into the form, and
                chose the amount os sats you want to attach to this bounty (
                <i>
                    must be less than the total amount of available sats in your
                    account
                </i>
                ). Click &quot;Create&quot; to post the bounty.
                <br />
                <br />
                See this{' '}
                <a
                    href="https://docs.lightningbounties.com/docs/posting-a-bounty/post-a-bounty"
                    target="blank"
                >
                    section in docs
                </a>{' '}
                for more help.
            </div>
        ),
        buttonText: 'OK',
    },
    anonRewardCheckbox: {
        title: 'Anonymous Rewards',
        body: (
            <div>
                Check this box to hide your name/profile from appearing on this
                reward.
                <br />
                <br />
                You can still expire your reward (after the lock-time have
                elapsed) just like with a normal reward.
                <br />
                <br />
                <b>TODO</b> - add to{' '}
                <a
                    href="https://docs.lightningbounties.com/docs/posting-a-bounty/post-a-bounty"
                    target="blank"
                >
                    docs
                </a>
                .
            </div>
        ),
        buttonText: 'OK',
    },
    anonRewardCheckboxOneTimeReward: {
        title: 'Always Anonymous',
        body: (
            <div>
                You will always create an anonymous reward when adding to reward
                from a signed out state.
                <br />
                <br />
                If you would like your profile to be present and/or the ability
                to take back your award please register and sign-in.
            </div>
        ),
        buttonText: 'OK',
    },
    lockTimeSelector: {
        title: 'Bounty Lock Times',
        body: (
            <div>
                This is how long your bounty will stay <i>locked</i>. After the
                lock time is over, you can <i>expire</i> the reward and return
                the sats to your own wallet if they haven&apos;t been claimed.
                <br />
                <br />
                If your lock time is too short, bounty hunters might be
                reluctant to work on your issue, fearing the bounty may expire
                before they can claim the reward. If your lock time is too long,
                you may have your sats stuck longer than you like on an issue
                that may not be gaining traction.
                <br />
                <br />
                As a rule of thumb, we suggest the default of 2 weeks for your
                first bounty.
                <br />
                <br />
                <b>TODO</b> - add to{' '}
                <a
                    href="https://docs.lightningbounties.com/docs/posting-a-bounty/post-a-bounty"
                    target="blank"
                >
                    docs
                </a>
                .
            </div>
        ),
        buttonText: 'Got it',
    },
    lockTimeSelectorOneTimeReward: {
        title: 'No Lock/Expiry on One-Time Rewards',
        body: (
            <div>
                You are making an anonymous one-time additional reward: you
                can&apos;t set a lock time.
                <br />
                <br />
                Since you are not logged-in, this reward will not be tied to an
                account and you will not be able to be able to expire this award
                and recover the funds. Thus there is no lock time available for
                this reward action.
                <br />
                <br />
                If you want to be able expire this award, you can log-in and
                post the reward as{' '}
                <a
                    href="https://docs.lightningbounties.com/docs/posting-a-bounty/post-a-bounty"
                    target="blank"
                >
                    anonymous (TODO)
                </a>
                .
                <br />
                <br />
                If this bounty is closed, without completion, your reward will
                be rolled onto other bounties. See the docs for more details on{' '}
                <a
                    href="https://docs.lightningbounties.com/docs/posting-a-bounty/post-a-bounty"
                    target="blank"
                >
                    rolling forward one-time rewards (TODO)
                </a>
                .
            </div>
        ),
        buttonText: 'Got it',
    },
    rewardCardFromFeed: {
        title: 'Example of a Bounty Card',
        body: (
            <div>
                If there&apos;s no icon on the right listed as
                &quot;Winner&quot; than its open to be claimed! Learn more about
                how to do that in the docs{' '}
                <a
                    href="https://docs.lightningbounties.com/docs/solve-a-bounty/working-on-the-bounty"
                    target="blank"
                >
                    here
                </a>
                .
                <br />
                <br />
                Click on the top (org/repo) - to open the full issue on GitHub.
                <br />
                <br />
                Click on the middle (issue title) - to open the full information
                on this bounty, and get a URL link to this bounty.
            </div>
        ),
        buttonText: 'Cool',
    },
    depositForm: {
        title: 'Deposit Sats to your Account',
        body: (
            <div>
                Enter the amount of sats you want to deposit and click
                &quot;Generate&quot;.
                <br />
                <br />
                An invoice will appear on the right, pay it with a lightning
                wallet and the sats will be show as available in your balance.
                <br />
                <br />
                If this is new concept for you: find out more of how to do this
                and setup your first wallet in our docs{' '}
                <a
                    href="https://docs.lightningbounties.com/docs/posting-a-bounty/deposit-funds-to-post-a-bounty"
                    target="_blank"
                >
                    here
                </a>
                .
            </div>
        ),
        buttonText: 'OK',
    },
    verifyOnBranta: {
        title: 'Optional: Verify your Invoice on Branta',
        body: (
            <div>
                Use this link to verify the invoice you&apos;re about to pay is
                correct.
                <br />
                <br />
                Lightning Bounties uses Branta for third-party address
                verification. For extra safety, you can open the Branta verify
                link in a new tab to see the address.
                <br />
                <br />
                For even further safety, the link can be opened on another
                separate phone or computer. See Branta&apos;s{' '}
                <a
                    href="https://docs.branta.pro/address-verification"
                    target="_blank"
                >
                    documentation
                </a>{' '}
                for more information.
            </div>
        ),
        buttonText: 'OK',
    },
    depositQR: {
        title: 'How to Pay an Invoice',
        body: (
            <div>
                Use any lightning wallet to pay the invoice.
                <br />
                <br />
                You can scan the QR code with a mobile wallet.
                <br />
                Or, copy the invoice (below the QR code) and paste it into your
                wallet.
            </div>
        ),
        buttonText: 'OK',
    },
    withdrawForm: {
        title: 'Withrdaw sats from LB wallet',
        body: (
            <div>
                Use this form to withdraw sats from your account on LB.
                <br />
                <br />
                Generate a BOLT-11 Invoice with your desired amount of sats to
                withdraw from your lightning wallet, paste the invoice into the
                form and click &quot;Withdraw&quot;.
            </div>
        ),
        buttonText: 'OK',
    },
    checkPullForm: {
        title: 'Claim Reward workflow',
        body: (
            <div>
                Use this form to claim the reward after you&apos;ve submitted
                your pull request and added a PR message which references this
                issue.{' '}
                <i>
                    For more help on this see{' '}
                    <a
                        href="https://docs.lightningbounties.com/docs/solve-a-bounty/working-on-the-bounty"
                        target="blank"
                    >
                        this section in docs
                    </a>
                    .
                </i>
                <br />
                <br />
                Simply enter the the number of the pull request and click the
                &quot;Check&quot; button. For example, for PR #11 enter
                &quot;11&quot;.
            </div>
        ),
        buttonText: 'OK',
    },
};

export { hintsConfig };
