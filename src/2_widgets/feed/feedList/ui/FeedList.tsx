import { Flex } from 'antd'
import { FC } from 'react'
import { feedApi, FeedCard, FeedCardGuide } from '@/4_entities/feed'

const FeedList: FC<{ page?: number }> = async ({ page }) => {

    try {
        const data = await feedApi.getFeedList(page ?? 1)

        return (
            <Flex vertical gap="small">
                {data.map((item, index) =>
                    <FeedCard
                        guideSlot={index === 0
                            ? <FeedCardGuide />
                            : undefined
                        }
                        key={item.id} {...item}
                    />
                )
                }
            </Flex>
        )
    } catch (e) {
        return <>Error</>
    }
}



export { FeedList }