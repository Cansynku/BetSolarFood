import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useState, createContext, useContext, useEffect } from 'react';

const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    // Cargar las palabras almacenadas en el localStorage al inicio
    const storedWords = localStorage.getItem('words');
    if (storedWords) {
      setWords(JSON.parse(storedWords));
    }
  }, []);

  const addWord = (word) => {
    setWords((prevWords) => [...prevWords, word]);
  };

  useEffect(() => {
    // Guardar las palabras en el localStorage cada vez que cambian
    localStorage.setItem('words', JSON.stringify(words));
  }, [words]);

  return (
    <AppStateContext.Provider value={{ words, addWord }}>
      {children}
    </AppStateContext.Provider>
  );
};

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

        <form onSubmit={handleFormSubmit}>
          <label>
            Ingresa una palabra por favor:
            <input type="text" value={userInput} onChange={handleInputChange} />
          </label>
          <button type="submit">Guardar palabra</button>
        </form>

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

export default function AppWithState() {
  return (
    <AppStateProvider>
      <HomePage />
    </AppStateProvider>
  );
}
