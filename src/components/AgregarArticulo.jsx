import React from 'react';

function AgregarArticulo(props) {
  return (
    <div>
      <input 
        type="text" 
        value={props.articulo} 
        onChange={props.manejarCambioArticulo}
        placeholder="Ingresa un articulo"
      />
      <input 
        type="number" 
        value={props.cantidad} 
        onChange={props.manejarCambioCantidad}
        placeholder="Ingresa la cantidad"
        min="1"
      />
      <button onClick={props.manejarAgregarArticulo}>
        {props.editando === -1 ? 'Agregar' : 'Guardar'}
      </button>
    </div>
  );
}

export default AgregarArticulo;