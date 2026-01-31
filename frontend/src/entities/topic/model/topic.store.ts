import { create } from 'zustand/react';
import { ITopic } from '@/entities/topic/model/ITopic';

interface ITopicState extends ITopic {
    setTopic: (topic: ITopic) => void;
    clearTopic: () => void;
}

export const useTopicStore = create<ITopicState>((set) => ({
    id: '',
    title: '',
    description: '',
    countPosts: 0,
    countReaders: 0,

    setTopic: (topic: ITopic) => set(topic),
    clearTopic: () => set({ id: '', title: '', description: '', countPosts: 0, countReaders: 0 }),
}));