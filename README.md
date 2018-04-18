# Workshop: Applicatieontwikkeling in Javascript met React

### Stap 1 - Nieuw component maken

**Bestaande code verwijderen**
We beginnen met het verwijderen van bestaande code die we niet gaan gebruiken

```
boodschappenlijst
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── **App.css**
    └── **App.js**
    └── **App.test.js**
    └── index.css
    └── index.js
    └── **logo.svg**
    └── registerServiceWorker.js
```

**Nieuw bestand toevoegen**
We maken een nieuw bestand, deze noemen we `App.js`. Dit is het main component voor onze webapplicatie

```
boodschappenlijst
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── **App.js**
    └── index.css
    └── index.js
    └── registerServiceWorker.js
```

En voegen deze code in:

```javascript
import React from 'react'

class App extends React.Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='container-fluid header'>
          <div className='row'>
            <h1 className="title">Mijn Boodschappenlijst</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default App
```

**Container met een Tabel toevoegen**
We voegen een tabel toe waarin we onze boodschappen gaan laten zien. Deze voeg je direct onder de closing tag van de header container in

```javascript
import React from 'react'

class App extends React.Component {
  render() {
    return (

        ...

        <div className='container-fluid content'>
          <div className='row'>
            <div className='col'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Naam</th>
                    <th>Hoeveelheid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Eiren</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
         </div>

          ...

```

### Stap 2 - Eerste boodschappen toevoegen
**Constructor toevoegen**
In de constructor slaan we de eerste versie van onze State op. Deze plaats je direct onder het benoemen van de component

```javascript
import React from 'react'

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  ...

```

**Boodschappen aan State toevoegen**
We voegen een Array toe met Objecten van onze eerste boodschappen. Deze plaats je in de constructor binnen `this.state`

```javascript
import React from 'react'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      list: [
        {
          product: 'Brood',
          quantity: 1
        },
        {
          product: 'Eieren',
          quantity: 10
        }
      ]
    }
  }

  ...

```

**State met boodschappen weergeven in de tabel**
We gebruiken de Javascript functie `Map()` om de Array met boodschappen weer te geven. Ook voegen we een `key` toe aan iedere rij van de tabel in de tabel container

```javascript
import React from 'react'

class App extends React.Component {

  ...

  render() {
    return (

        ...

        <div className='container-fluid content'>
          <div className='row'>
            <div className='col'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Naam</th>
                    <th>Hoeveelheid</th>
                  </tr>
                </thead>
                <tbody>
                { this.state.list.map( (item, index) => {
                  return (
                    <tr key={ index }>
                      <td>{ item.product }</td>
                      <td>{ item.quantity }</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
         </div>

          ...

```

## Stap 3 - Nieuwe boodschappen toevoegen
**Container met een Formulier toevoegen**
We voegen een formulier toe waarmee we nieuwe boodschappen kunnen toevoegen. Deze container plaats je onder de tabel container

```javascript
import React from 'react'

class App extends React.Component {

  ...

  render() {
    return (

        ...

        <div className='container-fluid form'>
          <form>
            <div className='row'>
              <div className='col'>
                <label>Boodschap:
                  <input type="text" className="form-control" name='product' placeholder='Naam van de boodschap' />
                </label>
              </div>
              <div className='col'>
                <label>Aantal:
                  <input type="text" className="form-control" name='quantity' placeholder='Hoeveelheid' />
                </label>
              </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <input className='btn btn-primary' type="submit" value="Submit" />
                </div>
              </div>
            </form>
          </div>

          ...

```

**Functie maken**
We maken een ES6 functie waarmee we nieuwe boodschappen kunnen toevoegen, en koppelen deze aan het formulier. De functie plaats je onder de constructor

```javascript
import React from 'react'

class App extends React.Component {
  constructor() {
    ...
  }

  handleSubmit = (event) => {
    // We halen ons boodschappenlijst uit de State
    const list = this.state.list;

    // We voegen een product toe aan de array en werken de State bij en versturen een succesbericht
    this.setState({ list: list.concat({ product: event.target.product.value, quantity: event.target.quantity.value}) },  alert('Toegevoegd aan boodschappenlijst!'));

    // Belangrijk: zorgt ervoor dat de pagina niet wordt gerefresht
    event.preventDefault()
  }

  render() {

      ...

```

**Vervolgens koppelen we de functie aan het formulier**
```
<form onSubmit={ (event) => this.handleSubmit(event) }>
```

## Stap 4 - Boodschappen verwijderen
**Knop aan tabel toevoegen**
We voegen een knop aan de tabel toe waarmee we boodschappen kunnen verwijderen

```javascript
import React from 'react'

class App extends React.Component {
  constructor() {
    ...
  }

  handleSubmit = (event) => {
    ...
  }

  render() {
    return (

        ...

        <div className='container-fluid content'>
          <div className='row'>
            <div className='col'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Naam</th>
                    <th>Hoeveelheid</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                { this.state.list.map( (item, index) => {
                  return (
                    <tr key={ index }>
                      <td>{ item.product }</td>
                      <td>{ item.quantity }</td>
                      <td className='action'>
                        <button type="button" class="btn btn-danger">Verwijderen</button>
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        ...

```

**Functie maken**
We maken een ES6 functie waarmee we boodschappen kunnen verwijderen, en koppelen deze aan de knop

```javascript
import React from 'react'

class App extends React.Component {
  constructor() {
    ...
  }

  handleSubmit = (event) => {
    ...
  }

  handleDelete = (index) => {
    // We halen ons boodschappenlijstje uit de State
    const list = this.state.list;

    // We halen een product weg uit de array
    list.splice(index, 1);

    // We werken de State bij en versturen een succesbericht
    this.setState({ list }, alert('Verwijderd uit boodschappenlijst!'));
  }

  render() {
    return (

        ...

        <div className='container-fluid content'>
          <div className='row'>
            <div className='col'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Naam</th>
                    <th>Hoeveelheid</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                { this.state.list.map( (item, index) => {
                  return (
                    <tr key={ index }>
                      <td>{ item.product }</td>
                      <td>{ item.quantity }</td>
                      <td className='action'>
                        <button type="button" class="btn btn-danger" onClick={ (index) => this.handleDelete(index) }>Verwijderen</button>
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        ...

```

## Stap 5 - Bootstrap toevoegen

** Bootstrap CSS inladen**
We gaan Bootstrap 4 toevoegen om de styling mooier te maken. Dit gaan we doen in het bestand `public.html` in de folder `public`

```
boodschappenlijst
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── **index.html**
│   └── manifest.json
└── src
    └── App.js
    └── index.css
    └── index.js
    └── registerServiceWorker.js
```

En voegen we de volgende code toe, direct onder `<meta name="theme-color" content="#000000">`:

```html
<!DOCTYPE html>
<html lang="en">

<head>

  ...

  <meta name="theme-color" content="#000000">

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">

  ...

```

**CSS toevoegen**
 We kunnen vervolgens nog wat CSS toevoegen aan `index.css` om de laatste puntjes op de i te zetten. Hier kun je zelf nog aanpassingen maken om de webapplicatie te stylen
```
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.header {
  background-color: lime;
  padding: 40px 20px;
  color: white;
}

.header .title {
  width: 100%;
  text-align: center;
}

.content td.action {
  text-align: right;;
}

.form label {
  width: 100%;
}
```
