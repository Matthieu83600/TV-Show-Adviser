import { useEffect, useState } from 'react';
import { TVShowAPI } from './api/tv-show';
import { BACKDROP_BASE_URL } from './config';
import { TVShowDetails } from './components/TVShowDetails/TVShowDetails';
import { Logo } from './components/Logo/Logo';
import logo from './assets/images/logo.png';
import './global.css';
import s from './style.module.css';


export function App() {
    const [currentTVShow, setCurrentTVShow] = useState();
    async function fetchPopulars() {
        const populars = await TVShowAPI.fetchPopulars();
        if(populars.length > 0) {
            setCurrentTVShow(populars[0]);
        }
    }
    useEffect(() => {
        fetchPopulars()
    }, []);
    // console.log('***', currentTVShow);
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
                        <input style={{width: "100%"}} type='text' />
                    </div>
                </div>
            </header>
            <section className={s.tv_show_details}>
                {currentTVShow && 
                    <TVShowDetails tvShow={currentTVShow} />
                }
            </section>
            <section className={s.recommendations}></section>
        </main>
    )
}