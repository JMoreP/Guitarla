import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitarla from "./components/Guitarla"
import { db } from "./data/db"

function App() {

    const [data, setData] = useState(db)
    const [carrito, setCarrito] = useState([])

    // Funcion para agregar al carrito
    function addToCart(item) {
        const itemExiste = carrito.findIndex(guitarra => guitarra.id === item.id)
        if (itemExiste >= 0) { // Si el item existe, se actualiza la cantidad
            if (carrito[itemExiste].quantity >= 5) return // Limitar la cantidad a 5 unidades
            const updateCarrito = [...carrito] // Se crea un nuevo array con los items existentes
            updateCarrito[itemExiste].quantity++
            setCarrito(updateCarrito) // Se actualiza el carrito
        } else { // Si el item no existe, se agrega al carrito
            setCarrito([...carrito, { ...item, quantity: 1 }]) // Se agrega el item al carrito con cantidad 1
        }
    }

    // Funcion para vaciar el carrito
    function vaciarCarrito(id) {
        setCarrito(prevCarrito => prevCarrito.filter(guitarra => guitarra.id !== id)) // Se vacia el item del carrito, se filtra el carrito para eliminar el item seleccionado
    }

    function incrementarCantidad(id) {
        const updateCarrito = carrito.map(guitarra => {
            if (guitarra.id === id && guitarra.quantity < 5) {
                return {
                    ...guitarra,
                    quantity: guitarra.quantity + 1
                }
            }
            return guitarra
        })
        setCarrito(updateCarrito)
    }

    function decrementarCantidad(id) {
        const updateCarrito = carrito.map(guitarra => {
            if (guitarra.id === id && guitarra.quantity > 1) {
                return {
                    ...guitarra,
                    quantity: guitarra.quantity - 1
                }
            }
            return guitarra
        })
        setCarrito(updateCarrito)
    }

    function eliminarTodo() {
        setCarrito([])
    }

    return (
        <>

            <Header
                carrito={carrito}
                vaciarCarrito={vaciarCarrito}
                incrementarCantidad={incrementarCantidad}
                decrementarCantidad={decrementarCantidad}
                eliminarTodo={eliminarTodo}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitarra) => (
                        <Guitarla
                            key={guitarra.id}
                            guitarra={guitarra}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>

        </>
    )
}

export default App
