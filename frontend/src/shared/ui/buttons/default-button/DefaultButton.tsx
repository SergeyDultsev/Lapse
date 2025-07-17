'use client'

import React from "react";
import styles from './DefaultBitton.module.scss'

interface DefaultButtonProps {
  description: string,
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ description }) => {
  return (
      <button className={styles['default-button']}>{description}</button>
  );
};

export default DefaultButton;