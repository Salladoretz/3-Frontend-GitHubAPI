import React, { useState } from 'react'
import axios from 'axios'
import css from './API.module.css'


const API = () => {

    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [totalCount, setTotalCount] = useState('')
    console.log(search)

    async function getRepositories() {
        const response = await axios.get(`https://api.github.com/search/repositories?q=${search}&order=asc&per_page=10`)
        let listRepositories = response.data.items.map(item => {
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                owner: item.owner.login,
                created_at: item.created_at,
                link: item.html_url
            }
        })
        setResults(listRepositories)
        setTotalCount(response.data.total_count)
        console.log(response.data)
    }

    return (
        <div>
            <h1>Поиск на GitHub</h1>
            <div className={css.search}>
                <input
                    className={css.search__input}
                    type="text"
                    placeholder='... введите слово ...'
                    onChange={event => setSearch(event.target.value)}
                    value={search}
                />
                <button
                    className={css.search__button}
                    type='button'
                    onClick={() => getRepositories()}
                >
                    Поиск
                </button>
            </div>
            <fieldset className={css.results}>
                <legend>Список репозиториев</legend>
                {results.map(item =>
                    <div
                        className={css.results__item}
                        key={item.id}>
                        <div className={css.results__name}>
                            <a
                                href={item.link}
                                rel='noreferrer'
                                target='_blank'
                            >
                                {item.name}
                            </a>
                        </div>
                        <div className={css.results__description}>{item.description}</div>
                        <div className={css.results__owner}>{item.owner}</div>
                        <div className={css.results__created}>{item.created_at}</div>
                    </div>)}
            </fieldset>
            <div className={css.count}>
                <p>Всего репозиториев</p>
                {totalCount}
            </div>
        </div>
    )
}

export default API