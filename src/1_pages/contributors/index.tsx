
import { Flex, Image, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { GithubOutlined } from '@ant-design/icons';

type Contributor = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
};

const ContributorsPage: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributors = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api.github.com/repos/Lightning-Bounties/lb-next/contributors');
        if (!response.ok) {
          throw new Error('Failed to fetch contributors');
        }
        const data: Contributor[] = await response.json();
        setContributors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading) {
    return (
      <Flex vertical align="center" justify="center" style={{ minHeight: '80vh' }}>
        <Typography>Loading contributors...</Typography>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex vertical align="center" justify="center" style={{ minHeight: '80vh' }}>
        <Typography style={{ color: 'red' }}>Error: {error}</Typography>
      </Flex>
    );
  }

  return (
    <Flex vertical gap="large" padding="horizontal" padding="vertical">
      <Flex align="center" gap="middle">
        <GithubOutlined style={{ fontSize: 32 }} />
        <Typography.Title level={3}>Lightning Bounties Contributors</Typography.Title>
      </Flex>
      <Typography.Paragraph>
        This page lists the contributors to the Lightning Bounties lb-next repository.
        Contributors are automatically fetched from the GitHub API.
        To become a contributor, make a contribution (e.g., submit a pull request) to the
        <a href="https://github.com/Lightning-Bounties/lb-next" target="_blank" rel="noopener noreferrer">
          Lightning-Bounties/lb-next
        </a> repository.
      </Typography.Paragraph>
      <Flex wrap flexWrap="row" gap="middle" justify="start">
        {contributors.map((contributor) => (
          <Flex key={contributor.id} vertical align="center" gap="small">
            <Image
              width={64}
              height={64}
              src={contributor.avatar_url}
              alt={contributor.login}
              placeholder={{ visible: true }}
            />
            <Typography.Link
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 500 }}
            >
              {contributor.login}
            </Typography.Link>
            <Typography.Text>{contributor.contributions} contributions</Typography.Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default ContributorsPage;
