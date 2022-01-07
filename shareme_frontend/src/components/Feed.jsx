import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {client} from '../client'
import { feedQuery, searchQuery } from '../utils/data';
import MansonryLayout from './MansonryLayout';
import Spinner from './Spinner';

const Feed = () => {
    const  [loading, setLoading] = useState(true)
    const [pins, setPins] = useState(null)
    const {categoryId}=useParams(false)
    useEffect(() => {
       setLoading(true);
       if(categoryId){
         const query =searchQuery(categoryId)
         client.fetch(query)
         .then((data)=>{
             setPins(data)
             setLoading(false)
         })
       }else{
        client.fetch(feedQuery)
        .then((data)=>{
            setPins(data)
            setLoading(false)
        })
       }
    }, [categoryId])

    if (loading) return <Spinner message="we are adding new ideas to your feed!"/>
        if(!pins?.length) return <h2>No Pins Available</h2>
    return (
        <div>
            {pins && <MansonryLayout  pins={pins}/>}
        </div>
    )
}

export default Feed
