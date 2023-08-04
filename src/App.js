import { useState } from 'react';
import './App.css';
import Logo from './resources/Logo.png';
import { Swapi } from './components/Swapi';

function App() {
  const [search, setSearch] = useState('');

  const handleSearch = (event)=>{
    event.preventDefault(); 
    setSearch(event.target.searched.value); 
  }

  return (
    <div className="App center">
      <section id='data-section' className='center'>
        <header id='header-form' className='center'>
          <img src={Logo} alt='Icono de tropas de asalto, Star Wars' id='logo' className='logos' title='Star Wars Icon' />
          <h1 id='title-form'>Swapi Star Wars</h1>
        </header>
        <main id='main-content-form' className='center'>
          <form action="#" onSubmit={e => handleSearch(e)} id='form' className='center'>
            <div className="input-group mb-3">
              <input type="text"
                className="form-control"
                placeholder="Busca un personaje"
                id='searched'
                name='searched'/>
              <button className="btn btn-outline-secondary" type="submit" id="send-button">Buscar</button>
            </div>
            {
              search !== '' && (<span id='set-info'>Para volver a buscar, vacía el input</span>)
            }
          </form>
        </main>

        <footer id='footer-form' className='center'>
          <p className='text-center'>
            Realizado por Julián Castrillón Sánchez <br />
            Desarrollador Front-End <br />
            juliancastrillon681@gmail.com <br />
            Contacto directo: +57 319 211 0866 <br />
            &copy; Todos los derechos reservados.</p>
        </footer>
      </section>

      <section id='section-results' className='center'>
        {
          search !== '' && (<Swapi search={search} />) 
        }
      </section>
    </div>
  );
}

export default App;
