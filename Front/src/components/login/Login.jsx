import React, { Component } from 'react'
export default class Login extends Component {
  render() {
    return (
      <form>
        <div className="mb-3">
          <label>Correo</label>
          <input
            type="email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Recuerdame
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Ingresar
          </button>
        </div>
        <p className="forgot-password text-right">
          Aún no tienes una cuenta? <a href="/sign-up">Registrate</a>

        </p>
      </form>
    )
  }
}