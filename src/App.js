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

  handleSubmit = (event) => {
    // We halen ons boodschappenlijst uit de State
    const list = this.state.list;

    // We voegen een product toe aan de array en werken de State bij en versturen een succesbericht
    this.setState({ list: list.concat({ product: event.target.product.value, quantity: event.target.quantity.value}) },  alert('Toegevoegd aan boodschappenlijst!'));

    // Belangrijk: zorgt ervoor dat de pagina niet wordt gerefresht
    event.preventDefault()
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
      <div className='container-fluid'>
        <div className='container-fluid header'>
          <div className='row'>
            <h1 className="title">Mijn Boodschappenlijst</h1>
          </div>
        </div>
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
                        <button type="button" className="btn btn-danger" onClick={ (index) => this.handleDelete(index) }>Verwijderen</button>
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='container-fluid form'>
          <form onSubmit={ (event) => this.handleSubmit(event) }>
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
      </div>
    )
  }
}

export default App
