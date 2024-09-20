import { useEffect } from 'react';
import { TVShowListItem } from '../TVShowListItem/TVShowListItem';
import s from './style.module.css';

export function TVShowList({ tvShowList, onClickItem }) {
    // Scrollbar horizontal
    useEffect(() => {
        const listElement = document.querySelector(`.${s.list}`);
        listElement.addEventListener("wheel", (event) => {
        event.preventDefault();
        listElement.scrollLeft += event.deltaY;
        });
        return () => {
        listElement.removeEventListener("wheel", () => {});
        };
    }, []);
    return (
        <>
        <div className={s.title}>You may also like :</div>
        <div className={s.list}>
            {tvShowList.map((tvShow) => {
                return (
                    <span key={tvShow.id} className={s.tv_show_list_item}>
                        <TVShowListItem tvShow={tvShow} onClick={onClickItem} />
                    </span>
                );
            })};
        </div>
        </>
    );
};