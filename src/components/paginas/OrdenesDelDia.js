import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import OrdenDelDia from '../ui/OrdenDelDia';

const OrdenesDelDia = () => {

    // context con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);

    // state con las ordenes
    const [ordenes, guardarOrdenes] = useState([]);

    useEffect(() => {
        const obtenerOrdenes = () => {
            firebase.db.collection('ordenes').where('completado', "==", true).onSnapshot(manejarSnapshot);
        }
        obtenerOrdenes();
    }, []);

    function manejarSnapshot(snapshot) {
        const ordenes = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        guardarOrdenes(ordenes);
    } 

    return ( 
        <>
            <h1 className="text-3xl font-bold mb-4">Ordenes Despachadas del Día</h1>

            <div className="sm:flex sm:flex-wrap -mx-3">
                {ordenes.map(orden => (
                    <OrdenDelDia
                        key={orden.id}
                        orden={orden}
                    />
                ))}
            </div>
        </>
     );
}
 
export default OrdenesDelDia;