import React, { useState } from 'react';
import AgregarArticulo from './AgregarArticulo';
import TituloListaDeCompras from './TituloListaDeCompras';
import '../App.css';

function ListaDeCompras() {
  const [articulo, setArticulo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [lista, setLista] = useState([]);
  const [editando, setEditando] = useState(-1);

  function agregarArticulo() {
    if (articulo.trim() !== '' && cantidad > 0) {
      var nuevaLista = lista.slice();

      if (editando === -1) {
        var nuevoArticulo = { articulo: articulo, cantidad: cantidad, comprado: false };
        nuevaLista.push(nuevoArticulo);
      } else {
        nuevaLista[editando].articulo = articulo;
        nuevaLista[editando].cantidad = cantidad;
        setEditando(-1);
      }
  
      setLista(nuevaLista); 
      setArticulo(''); 
      setCantidad(''); 
    } else{
      alert('Los campos no pueden estar vacios y la cantidad debe ser mayor o igual a 1')
    }
  }

  function comprarArticulo(indice) {
    var nuevaLista = lista.slice();

    if (nuevaLista[indice].comprado === true) {
      nuevaLista[indice].comprado = false;
    } else {
      nuevaLista[indice].comprado = true;
    }
  
    var noComprados = nuevaLista.filter(function(item) { return item.comprado === false; });
    var comprados = nuevaLista.filter(function(item) { return item.comprado === true; });
  
    var listaOrdenada = noComprados.concat(comprados);
    setLista(listaOrdenada);
  }
  

  function eliminarArticulo(indice) {
    var nuevaLista = lista.slice();
    nuevaLista.splice(indice, 1); 
    setLista(nuevaLista);
  }

  function editarArticulo(indice) {
    var articuloAEditar = lista[indice].articulo; 
    var cantidadAEditar = lista[indice].cantidad; 
    setArticulo(articuloAEditar); 
    setCantidad(cantidadAEditar); 
    setEditando(indice); 
  }
  
  function manejarCambioArticulo(evento) {
    setArticulo(evento.target.value);
  }

  function manejarCambioCantidad(evento) {
    setCantidad(evento.target.value);
  }

  return (
    <div className="contenedor">
      <TituloListaDeCompras />
  
      <AgregarArticulo
        articulo={articulo}
        cantidad={cantidad}
        manejarCambioArticulo={manejarCambioArticulo}
        manejarCambioCantidad={manejarCambioCantidad}
        manejarAgregarArticulo={agregarArticulo}
        editando={editando}
      />

      <h3>Articulos para comprar: </h3>
      <ul>
        {lista.map(function (item, indice) {
          if (item.comprado === false) {
            return (
              <li key={indice} className="lista">
                <input 
                  type="checkbox" 
                  checked={item.comprado} 
                  onChange={function () { comprarArticulo(indice); }} 
                />
                {item.articulo} - {item.cantidad}
                
                <div className="botones">
                  <button onClick={function () { editarArticulo(indice); }}>Editar</button>
                  <button onClick={function () { eliminarArticulo(indice); }}>Eliminar</button>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>

      <h3>Articulos comprados: </h3>
      <ul>
        {lista.map(function (item, indice) {
          if (item.comprado === true) {
            return (
              <li key={indice} className="lista" style={{ textDecoration: 'line-through' }}>
                <input 
                  type="checkbox" 
                  checked={item.comprado} 
                  onChange={function () { comprarArticulo(indice); }} 
                />
                {item.articulo} - {item.cantidad}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}
export default ListaDeCompras;
