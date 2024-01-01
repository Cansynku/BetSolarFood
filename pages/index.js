import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useState, createContext, useContext } from 'react';

// Crear un contexto para el estado global
const AppStateContext = createContext();

// Proveedor de contexto para envolver la aplicación
const AppStateProvider = ({ children }) => {
  const [words, setWords] = useState([]);

  const addWord = (word) => {
    setWords((prevWords) => [...prevWords, word]);
  };

  return (
    <AppStateContext.Provider value={{ words, addWord }}>
      {children}
    </AppStateContext.Provider>
  );
};

// Hook personalizado para utilizar el contexto
const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

function HomePage() {
  const { words, addWord } = useAppState();
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addWord(userInput);
    setUserInput('');
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        {/* Formulario para ingresar la palabra */}
        <form onSubmit={handleFormSubmit}>
          <label>
            Ingresa una palabra:
            <input type="text" value={userInput} onChange={handleInputChange} />
          </label>
          <button type="submit">Guardar palabra</button>
        </form>

        {/* Mostrar la palabra ingresada */}
        {words.length > 0 && (
          <div>
            <h2>Palabras ingresadas:</h2>
            <ul>
              {words.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Envolver la aplicación con el proveedor de contexto
export default function AppWithState() {
  return (
    <AppStateProvider>
      <HomePage />
    </AppStateProvider>
  );
}

