import React, { Component } from 'react'
export default class SignUp extends Component {
  render() {
    return (
      <form>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Cedula</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label>Correo</label>
          <input
            type="email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Teléfono</label>
          <input
            type="number"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Contrseña</label>
          <input
            type="password"
            className="form-control"
          />
          
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Registrarme
          </button>
        </div>
        <p className="forgot-password text-right">
        Ya tienes una cuenta? <a href="/sign-in">Inicia sesión</a>
        </p>
      </form>
    )
  }
}