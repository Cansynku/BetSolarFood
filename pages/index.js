import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useState } from 'react';

export default function HomePage() {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar cualquier acción que desees con la palabra ingresada, por ejemplo, almacenarla en el estado o en algún otro lugar.

    // En este ejemplo, simplemente mostraremos la palabra debajo del formulario.
    alert(`Palabra ingresada: ${userInput}`);
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app JAVIER!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        {/* Formulario para ingresar la palabra */}
        <form onSubmit={handleFormSubmit}>
          <label>
            Ingresa una palabra por favor:
            <input type="text" value={userInput} onChange={handleInputChange} />
          </label>
          <button type="submit">Guardar palabra</button>
        </form>

        {/* Mostrar la palabra ingresada */}
        {userInput && <p>Palabra ingresada: {userInput}</p>}
      </main>

      <Footer />
    </div>
  );
}
