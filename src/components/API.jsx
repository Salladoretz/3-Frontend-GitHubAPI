import React, { useState } from 'react'
import axios from 'axios'
import css from './API.module.css'


const API = () => {

    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')
    const [results, setResults] = useState([])
    const [totalCount, setTotalCount] = useState('')

    async function getRepositories() {
        const response = await axios.get(`https://api.github.com/search/repositories?q=${search}&order=asc&per_page=10`)
        setStatus(response.status)
        let listRepositories = response.data.items.map(item => {
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                owner: item.owner.login,
                created_at: new Date(item.created_at),
                link: item.html_url
            }
        })
        setResults(listRepositories)
        setTotalCount(response.data.total_count)
    }

    return (
        <div className={css.main}>
            <fieldset className={css.search}>
                <legend>Поиск на GitHub</legend>
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
            </fieldset>
            <fieldset className={css.results}>
                <legend>Список репозиториев</legend>
                {status === '' || status === 200 ? '' : <p className={css.results__error}>Что-то пошло не так!</p>}
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
                        <div className={css.results__created}>{item.created_at.toLocaleString('ru-RU')}</div>
                    </div>)}
            </fieldset>
            <fieldset className={css.count}>
                <legend>Всего репозиториев</legend>
                <p className={css.count__total}>
                    {totalCount.toLocaleString('ru-RU')}
                </p>
            </fieldset>
        </div>
    )
}

export default API