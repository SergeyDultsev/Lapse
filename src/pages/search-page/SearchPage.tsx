'use client'

import React from "react";
import styles from './SearchPage.module.scss'
import {observer} from "mobx-react-lite";
import InputDefault from "@shared/ui/input/InputDefault";
import ButtonDefault from "@shared/ui/button/ButtonDefault";
import UserSummaryList from "@widgets/cart-info/user-summary-list/UserSummaryList";
import iUser from "@/entities/user/model/types/iUser";
import searchStore from "@pages/search-page/store/SearchStore";

const SearchPage: React.FC = observer(() => {
    const users: iUser[] = searchStore.searchUserData;

    return (
        <main className="main">
            <section className={styles['search']}>
                <div className={styles['search__header']}>
                    <InputDefault
                        className={styles['search__header__input']}
                        style={{ fontSize: '14px', fontWeight: '600', padding: '11px 20px', maxHeight: '40px' }}
                        placeholder={'Поиск'}
                    />
                    <ButtonDefault
                        type={'button'}
                        active={false}
                    >
                        Найти
                    </ButtonDefault>
                </div>
                <div className={styles['search__body']}>
                    <UserSummaryList users={users}/>
                </div>
            </section>
        </main>
    );
})

export default SearchPage;