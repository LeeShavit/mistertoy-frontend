import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';


import { toyService } from "../services/toy.service";
import { showErrorMsg } from "../services/event-bus.service";

export function ToyDetails() {

    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    const [msgToEdit, setMsgToEdit]= useState(toyService.getEmptyMsg())
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.get(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Toy details-> failed to load toy', err)
            showErrorMsg('Toy not found')
            navigate('/')
        }
    }

    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsgToEdit((msg) => ({ ...msg, [field]: value }))
      }

    async function onAddMsg(ev) {
        ev.preventDefault()
        try {
            const savedMsg = await toyService.addToyMsg(toy._id, msgToEdit)
            setToy(prevToy => ({
                ...prevToy,
                msgs: [...prevToy.msgs || [], savedMsg]
            }))
        } catch (err) {
            console.log('Toy msgs-> failed to save msg', err)
            showErrorMsg('msg not saved')
        }
    }

    async function onRemoveMsg(msgId) {
        try {
            await toyService.removeToyMsg(toy._id, msgId)
            const newMsgs = toy.msgs.filter(msg => msg.id !== msgId)
            setToy(prevToy => ({ ...prevToy, msgs: newMsgs }))
        } catch (err) {
            console.log('Toy msgs-> failed to remove msg', err)
            showErrorMsg('msg not removed')
        }
    }

    function getFullDate(ts) {
        const date = new Date(ts)
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h3>{toy.name} {toy.price}</h3>
            <h6>Labels: {toy.labels.join(', ')}</h6>
            <h6>Created: {getFullDate(toy.createdAt)} </h6>
            <div className={`stock ${toy.inStock ? "in" : "out-of"}`}>{toy.inStock ? 'In Stock!' : 'Out Of Stock'}</div>
            {toy.msgs && <ul>
                {toy.msgs.map((msg) => (
                    <li key={msg.id} className="msg">
                        <p>{msg.txt}</p>
                        <p>by: {msg.by.fullname}</p>
                        <button onClick={() => onRemoveMsg(msg.id)}>x</button>
                    </li>
                ))}
            </ul>}
            <form className="toy-add-msg" onSubmit={onAddMsg}>
                <input
                    type="text"
                    name="txt"
                    value={msgToEdit.txt}
                    placeholder="Enter msg"
                    onChange={handleMsgChange}
                    required
                    autoFocus
                />
                <button>Add message</button>
            </form>
            <Link className="btn" to={`/toy/edit/${toy._id}`}><EditIcon /></Link>
            <Link className="btn" to='/toy'><ArrowBackIcon /></Link>
        </section>
    )
}
