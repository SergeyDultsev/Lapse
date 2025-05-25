'use client'

import React from "react";
import styles from './SearchPage.module.scss'
import {observer} from "mobx-react-lite";
import searchStore from "@features/search/store/SearchStore";
import InputDefault from "@shared/ui/input/InputDefault";
import ButtonDefault from "@shared/ui/button/ButtonDefault";
import UserList from "@widgets/cart-info/user-list/UserList";
import iUser from "@/entities/user/model/types/iUser";
import SearchStore from "@features/search/store/SearchStore";
import AlertBlock from "@widgets/alert-block/AlertBlock";

const SearchPage: React.FC = observer(() => {
    const users: iUser[] = searchStore.searchUserData;

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
                {users.length !== 0 ? (
                    <div className={styles['search__body']}>
                        <UserList users={users}/>
                    </div>
                ) : (
                    <AlertBlock
                        alertTitle={"Пользователей не найдено"}
                    />
                )}
            </section>
        </main>
    );
})

export default SearchPage;