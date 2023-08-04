import React, { useEffect, useState } from 'react'
import { Loading } from './Loading';

/* 
    Prueba: 
    Utilizar la API pública de Star Wars para la obtención de datos. 
    El sitio web debe permitir al usuario ingresar el nombre de un personaje y mostrar: 
    - El nombre. ✅ 
    - El género. ✅
    - Fecha de nacimiento. ✅ 
    - Lista de películas en las que aparece. ✅ 
*/

const url = 'https://swapi.dev/api/people/?format=json'; // rootLink; 

export const Swapi = ({ search }) => {
    const [people, setPeople] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [films, setFilms] = useState([]);
    const [resFilms, setResFilms] = useState([]);

    useEffect(() => {
        petitionFetch(url);
    }, [])

    useEffect(() => {
        if (people.length !== 0) {
            const allFilms = people[0].films;
            setFilms(allFilms);
        }
    }, [people])

    useEffect(() => {
        if (films.length !== 0) {
            const fetchFilmsData = async () => {
                const filmsData = await Promise.all(
                    films.map(async film => {
                        const response = await fetch(film);
                        if (!response.ok) {
                            throw new Error(`OCURRIÓ UN ERROR HTTP: ${response.status}`);
                        }
                        const data = await response.json();
                        return data.title;
                    })
                );
                const resultsFilms = filmsData;
                setResFilms(resultsFilms);
            };

            fetchFilmsData();
        }
    }, [films])

    const petitionFetch = (direction) => {
        setTimeout(async () => {
            await fetch(direction)
                .then(response => {
                    if (!response.ok)
                        throw new Error(`OCURRIÓ UN ERROR HTTP: ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    if (data.length !== 0) {
                        setPeople(data.results.filter(charac => charac.name.toLowerCase().includes(search.toLowerCase())));
                        setLoading(false);
                    }
                })
                .catch(error => { setError(error.message) });
        }, 1000)

    }

    if (error !== '')
        return <>{alert(`Ocurrió un error al traer los datos: ${error}`)}</>
    else if (loading === true) {
        return (
            <div className='loading-content'>
                <Loading />
            </div>
        )
    }
    else if (loading !== true && error === '') {
        return (
            <div className='results-interface'>
                <h2>{people[0].name}</h2>
                <p><span>Género:</span> {people[0].gender === 'male' ? 'Masculino' : 'Femenino'}</p>
                <p><span>Fecha de nacimiento:</span> {people[0].created.substring(0, 10)}</p>
                <p><span>Películas:</span></p>
                <ol>{resFilms.map(film => { return <li key={film}>{film}</li> })}</ol>
            </div>
        )
    }
}
