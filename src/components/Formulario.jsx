import {useState, useEffect} from 'react';
import Error from './Error';

function Formulario({pacientes,setPacientes,paciente,setPaciente}) {
    const [nombre, setNombre]= useState('');
    const [propietario, setPropietario]= useState('');
    const [email, setEmail]= useState('');
    const [fecha, setFecha]= useState('');
    const [sintomas, setSintomas]= useState('');
    const [error, setError] = useState(false);

    useEffect(()=>{
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }

    },[paciente])

    

    const generarId= () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36)

        return random + fecha

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //VALIDACION FORMULARIO
        if([nombre,propietario,email,fecha,sintomas].includes('')){
            console.log('Hay alguno un campo vacio')
            setError(true)
        }else{
            console.log("Enviando Formulario")
            setError(false)
        }

        //Objeto de paciente

        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
        }

        if(paciente.id){
            //editando el registro
            objetoPaciente.id=paciente.id
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
            setPacientes(pacientesActualizados)
            setPaciente({})

        }else{
            ///Nuevo registro
            objetoPaciente.id=generarId();
            setPacientes([...pacientes,objetoPaciente]);

        }


        // REINICIAR EL FORM
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');

    }


    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center ">Seguimmiento Paciente</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Paciente Y {''}
                <span className="text-indigo-600 font-bold">
                    Administralos
                </span>
            </p>
            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 p-3">
                {error &&  <Error mensaje='Todos los Campos son obligatorios'/>   }
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota</label>
                    <input 
                        type='text'
                        name=''
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="mascota" 
                        placeholder="Nombre de la mascota"
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}   
                        />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
                    <input 
                        type='text'
                        name=''
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="propietario"
                        placeholder="Nombre del propietario"
                        value={propietario} 
                        onChange={(e) => setPropietario(e.target.value)} 
                        />
                        
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
                    <input 
                        type='email'
                        name=''
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"  
                        id="email" 
                        placeholder="email contacto"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta</label>
                    <input 
                        type='date' 
                        name='' 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"  
                        id="alta" 
                        placeholder="Nombre del propietario"
                        value={fecha} 
                        onChange={(e) => setFecha(e.target.value)} 
                        />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Sintomas</label>
                    <textarea 
                        id="sintomas" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        placeholder="Describe los sintomas "
                        value={sintomas} 
                        onChange={(e) => setSintomas(e.target.value)} 
                        />
                </div>
                <input type="submit" 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" 
                    value={paciente.id ? 'Editar paciente' : 'Agregar Paciente'}/>
            </form>
        </div>
    )
}

export default Formulario
