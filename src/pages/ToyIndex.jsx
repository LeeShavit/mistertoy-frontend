import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";

import { loadToys, removeToy, saveToy } from "../store/actions/toy.actions.js";
import { toyService } from "../services/toy.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { ToyList } from "../cmps/ToyList.jsx";



export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const [filterBy, setFilterBy]= useState(toyService.getDefaultFilter())

    useEffect(()=>{
        console.log(filterBy)
        loadToys(filterBy)
    },[filterBy])

    function onRemoveToy(toyId){
        removeToy(toyId)
        .then(()=>{
            showSuccessMsg('Toy removed successfully')
        })
        .catch(()=>{
            showErrorMsg('Failed to remove toy')
        })
    }

    
    if(!toys || toys.length===0) return <div>Loading..</div>
    return (
        <>
        <ToyFilter filterBy={filterBy} setFilterBy={setFilterBy}/>
        <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
        </>
    )
}