import React from 'react';

export interface IPropsAvatar {
    size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<IPropsAvatar> = ({ size }) => {
    return (
        <div></div>
    );
};

export default UserAvatar;