import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const FeedIcon = (props: Partial<CustomIconComponentProps>) => {
    return (
        <Icon
            {...props}
            component={() => (
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                    <rect
                        x="1.5"
                        y="1.5"
                        width="9"
                        height="9"
                        rx="1.5"
                        stroke="currentColor"
                    />
                    <rect
                        x="13.5"
                        y="1.5"
                        width="9"
                        height="9"
                        rx="1.5"
                        stroke="currentColor"
                    />
                    <rect
                        x="13.5"
                        y="13.5"
                        width="9"
                        height="9"
                        rx="1.5"
                        stroke="currentColor"
                    />
                    <rect
                        x="1.5"
                        y="13.5"
                        width="9"
                        height="9"
                        rx="1.5"
                        stroke="currentColor"
                    />
                </svg>
            )}
        />
    );
};
export { FeedIcon };
