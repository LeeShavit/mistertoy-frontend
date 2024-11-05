import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import AddIcon from '@mui/icons-material/Add';

import { loadToys, removeToy } from "../store/actions/toy.actions.js";
import { toyService } from "../services/toy.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { ToyList } from "../cmps/ToyList.jsx";
import { Link } from "react-router-dom";



export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed successfully')
        } catch (err) {
            showErrorMsg('Failed to remove toy')
        }
    }

    if (!toys || toys.length === 0) return <div>Loading..</div>
    return (
        <main className="toy-index">
            <ToyFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <Link to='/toy/edit' className="btn"><AddIcon /></Link>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </main>
    )
}