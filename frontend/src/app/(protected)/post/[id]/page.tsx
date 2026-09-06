import { Suspense } from 'react';
import { LoaderBase } from '@/shared';
import { getPostById } from '@entities/post';

export function generateMetadata({ params }: {
    params: Promise<{ id: string }>,
}) {
    const { id } = params;
    
    const post = await getPostById(id);
    
    return {
        title: post.title || 'Заголовок поста',
        description: post.body || 'Описание поста',
    };
}

async function PostContext ({ id }: { id: string }) {
    return (
        <div></div>
    );
}

export default async function Post({ params }: {
   params: Promise<{ id: string }>, 
}) {
    const { id } = params;

    return (
        <Suspense fallback={<LoaderBase />}>
            <PostContext id={id}/>
        </Suspense>
    );
}