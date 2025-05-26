'use client'

import React from "react";
import styles from './SearchPage.module.scss'
import {observer} from "mobx-react-lite";
import searchStore from "@features/search/store/SearchStore";
import InputDefault from "@shared/ui/input/InputDefault";
import ButtonDefault from "@shared/ui/button/ButtonDefault";
import IUser from "@/entities/user/model/types/iUser";
import SearchStore from "@features/search/store/SearchStore";
import AvatarDefault from "@assets/img/avatar.jpg";


const SearchPage: React.FC = observer(() => {
    const users: IUser[] = searchStore.searchUserData;

    return (
        <main className="main">
            <section className={styles['search']}>
                <div className={styles['search__header']}>
                    <InputDefault
                        className={styles['search__header__input']}
                        value={SearchStore.query}
                        onChange={e => SearchStore.setQuery(e.target.value)}
                        style={{ fontSize: '14px', fontWeight: '600', padding: '11px 20px', maxHeight: '40px' }}
                        placeholder={'Поиск'}
                    />
                    <ButtonDefault
                        type={'button'}
                        active={false}
                        onClick={e => SearchStore.getSearchData()}
                    >
                        Найти
                    </ButtonDefault>
                </div>
                <section className={styles['search-list']}>
                    {users.map((user: IUser) =>
                        <article className={styles['search-item']}>
                            <div className={styles["search-item__info"]}>
                                {user.avatar_url ? (
                                    <img className={styles["search-item__info__avatar"]}
                                         src={user.avatar_url}
                                         alt="avatar"
                                         loading="lazy"
                                    />
                                ) : (
                                    <img className={styles["search-item__info__avatar"]}
                                         src={AvatarDefault.src}
                                         alt="avatar"
                                         loading="lazy"
                                    />
                                )}
                                <h2 className={styles["search-item__info__item"]}>{user.full_name}</h2>
                                <p className={styles["search-item__info__item"]}>{user.subscriber_count} подписок</p>
                                <p className={styles["search-item__info__item"]}>{user.subscriptions_count} подписчиков</p>
                            </div>
                        </article>
                    )}
                </section>
            </section>
        </main>
    );
})

export default SearchPage;