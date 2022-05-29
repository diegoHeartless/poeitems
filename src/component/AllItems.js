import React, {useEffect, useState} from "react";
import axios from "axios";
import OneItem from "./item";

export default function AllItems() {
    const [result, setResult] = useState([]);
    const sendToBack = () => {
        const data = {
            method: 'get',
            url: 'test1',
            baseURL: 'http://localhost:8080',

        }
        axios(data).then(resu => {
            console.log(resu)
            setResult(resu.data)
        }).catch(e => {

        })
    }
    useEffect(() => {
        sendToBack()
        console.log(result)
    }, []);
    const te = () => {
        console.log(result)
        let allitem = [];
        result.forEach((param) => {
            allitem.push(<OneItem props={param}/>)
        })
        return allitem
    }
    return te()
}