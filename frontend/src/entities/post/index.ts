/**
 * API
 */

export { getPostsByUserId } from './api/getPostsByUserId';

export { getPostById } from './api/getPostById';

/**
 * UI
 */
export { default as PostList } from './ui/post-list/PostList';
export { default as PostItem } from './ui/post-item/PostItem';

/**
 * model
 */
export { postKeys } from './model/post.key';

export {
    usePostsUser,
    usePost,
} from './model/post.queries';

export type { IPost, IPostList } from './model/types';
