import { useState } from 'react';
import { useDebounce } from '@shared/utils/useDebounce';
import { useSendPost } from '@modules/posts/model/post.queries';

interface IPostData {
    title: string;
    textContent: string;
    image: string;
}

const defaultPost: IPostData = {
    title: '',
    textContent: '',
    image: '',
};

export const useCreatePost = () => {
    const sendMutation = useSendPost();
    const [postData, setPostData] = useState<IPostData>(() => {
        const draftJson = localStorage.getItem('post-draft');

        return draftJson
            ? JSON.parse(draftJson)
            : defaultPost;
    });
    const hasChanged = Boolean(postData.title?.trim() || postData.textContent?.trim());

    const setPost = (fieldName: string, value: string | number) => {
        setPostData(prevPost => (
            {
                ...prevPost,
                [fieldName]: value,
            }
        ));
    };

    const savePost = () => {
        localStorage.setItem(
            'post-draft',
            JSON.stringify(postData)
        );
    };

    const sendPost = () => {
        if (defaultPost.title && postData.title !== '') {
            localStorage.setItem(
                'post-draft',
                JSON.stringify(defaultPost)
            );

            return sendMutation.mutateAsync(postData);
        }

        return null;
    };
    
    const debouncedSavePost = useDebounce(() => {
        if (hasChanged) {
            savePost();
        }
    }, 500);
    
    return {
        postData,
        setPost,
        sendPost,
        debouncedSavePost,
    };
};