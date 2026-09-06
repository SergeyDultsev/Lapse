import { useState } from 'react';

export const useCreatePost = () => {
    const [postData, setPostData] = useState({
       title: '', 
       textContent: '',
       image: '',
    });
    
    const setPost = (field: string, value: string) => {
        setPostData({
            ...postData,
            [field]: value,
        });
    };
    
    return {
        postData,
        setPost,
    };
};