/**
 * API
 */

export { getPostsByUserId } from './api/getPostsByUserId';

export { getPostById } from './api/getPostById';

/**
 * UI
 */
export { default as PostCard } from './ui/post-card/PostCard';
export { default as PostsNotFound } from './ui/posts-not-found/PostsNotFound';

/**
 * model
 */
export { postKeys } from './model/post.key';

export {
    usePostsUser,
    usePost,
} from './model/post.queries';

export type { IPost, IPostList } from './model/types';
