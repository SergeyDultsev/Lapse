import { useState } from 'react';
import { useSendPost } from '@entities/post/model/post.queries';

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
        localStorage.setItem(
            'post-draft',
            JSON.stringify({})
        );

        return sendMutation.mutateAsync(postData);
    };
    
    return {
        postData,
        setPost,
        savePost,
        sendPost,
    };
};