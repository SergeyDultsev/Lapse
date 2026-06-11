import React from 'react';
import styles from './UserWidget.module.scss';
import UserAvatar from '@entities/user/ui/user-avatar/UserAvatar';

const UserWidget: React.FC = () => {
    return (
        <div className={styles['user-widget']}>
            <UserAvatar />
            <div className={styles['user-widget__user-info']}>
                <strong className={styles['user-widget__username']}>Сергей Дульцев</strong>
                <p className={styles['user-widget__email']}>dultsev@gmail.com</p>
            </div>
        </div>
    );
};

export default UserWidget;