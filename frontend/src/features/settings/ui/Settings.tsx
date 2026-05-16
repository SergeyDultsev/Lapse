'use client';

import React from 'react';
import styles from './Settings.module.scss';
import { 
    ButtonBase, 
} from '@/shared';

const Settings: React.FC = () => {
    return (
      <section>
          <h3 className={styles['settings-title']}>
              Настройки
          </h3>

          <hr className={styles['border']} />

          <div className={styles['settings-list']}>

              <div className={styles['settings-item']}>
                  <div className={styles['settings-item__info']}>
                      <h4 className={styles['settings-item__title']}>
                          Имя пользователя
                      </h4>
                      <p className={styles['settings-item__descr']}>
                          Сергей Дульцев
                      </p>
                  </div>
                  <ButtonBase
                      variant="primary"
                      size={'sm'}
                  >
                      Изменить имя
                  </ButtonBase>
              </div>

              <div className={styles['settings-item']}>
                  <div className={styles['settings-item__info']}>
                      <h4 className={styles['settings-item__title']}>
                          Электронная почта
                      </h4>
                      <p className={styles['settings-item__descr']}>
                          dultsev@gmail.com
                      </p>
                  </div>
                  <ButtonBase
                      variant="primary"
                      size={'sm'}
                  >
                      Изменить почту
                  </ButtonBase>
              </div>


              <div className={styles['settings-item']}>
                  <div className={styles['settings-item__info']}>
                      <h4 className={styles['settings-item__title']}>
                          Тема сайта
                      </h4>
                      <p className={styles['settings-item__descr']}>
                          Как сайт выглядит на вашем устройстве
                      </p>
                  </div>
                  <ButtonBase
                      variant="primary"
                      size={'sm'}
                  >
                      Светлая
                  </ButtonBase>
              </div>

              <div className={styles['settings-item']}>
                  <div className={styles['settings-item__info']}>
                      <h4 className={styles['settings-item__title']}>
                          Удалить аккаунт
                      </h4>
                      <p className={styles['settings-item__descr']}>
                          Вы можете восстановится аккаунт в течении 30 дней
                      </p>
                  </div>
                  <ButtonBase
                      variant="danger"
                      size={'sm'}
                  >
                      Удалить
                  </ButtonBase>
              </div>

          </div>
      </section>  
    );
};

export default Settings;