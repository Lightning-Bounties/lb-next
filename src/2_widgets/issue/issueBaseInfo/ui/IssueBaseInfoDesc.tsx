'use client';

import { FC } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useUserStore } from '@/4_entities/user';
import { useShallow } from 'zustand/react/shallow';

const IssueBaseInfoDesc: FC<{ data: string }> = ({ data }) => {
    const darkTheme = useUserStore(useShallow((state) => state.darkTheme));
    return (
        <MarkdownPreview
            source={data ?? ''}
            style={{ padding: 16, borderRadius: 9 }}
            wrapperElement={{
                'data-color-mode': darkTheme ? 'dark' : 'light',
            }}
        />
    );
};

export default IssueBaseInfoDesc;
