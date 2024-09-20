import { useEffect, useState } from 'react';
import { TVShowAPI } from './api/tv-show';
import { BACKDROP_BASE_URL } from './config';
import { TVShowDetails } from './components/TVShowDetails/TVShowDetails';
import { TVShowList } from './components/TVShowList/TVShowList';
import { Logo } from './components/Logo/Logo';
import logo from './assets/images/logo.png';
import './global.css';
import s from './style.module.css';
import { SearchBar } from './components/SearchBar/SearchBar';


export function App() {
    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);
    async function fetchPopulars() {
        const populars = await TVShowAPI.fetchPopulars();
        if(populars.length > 0) {
            setCurrentTVShow(populars[0]);
        }
    };
    async function fetchRecommendations(tvShowId) {
        const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
        if(recommendations.length > 0) {
            setRecommendationList(recommendations.slice(0, 10));
        }
    };
    useEffect(() => {
        fetchPopulars();
    }, []);
    useEffect(() => {
        if (currentTVShow) {
            fetchRecommendations(currentTVShow.id);
        }   
    }, [currentTVShow]);
    // console.log('***', currentTVShow);
    // console.log('***', recommendationList);
    async function searchTVShow(tvShowName) {
        const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
        if (searchResponse.length > 0) {
            setCurrentTVShow(searchResponse[0]);
        }
    };
    return (
        <main 
            className={s.main_container}
            style={{
                background: 
                    currentTVShow ? 
                    `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}') no-repeat center / cover`
                    : "black"
                }}
            >
            <header className={s.header}>
                <div className='row'>
                    <div className='col-4'>
                        <div>
                            <Logo 
                                image={logo}
                                title="Watowatch"
                                subtitle="Find a show you may like"
                            />
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-4'>
                        <SearchBar onSubmit={searchTVShow}/>
                    </div>
                </div>
            </header>
            <section className={s.tv_show_details}>
                {currentTVShow && 
                    <TVShowDetails tvShow={currentTVShow} />
                }
            </section>
            <section className={s.recommendations}>
                {recommendationList 
                    && recommendationList.length > 0 
                    && <TVShowList onClickItem={setCurrentTVShow} tvShowList={recommendationList} />
                }
            </section>
        </main>
    );
};