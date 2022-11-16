import {getHeaderAndParams} from "../Utils";
import axios from "axios";
export const getData = async (formData,jsonText,paramData,headerData) =>{
    const apiType = formData.type.toLowerCase()
    const apiURL = formData.url
    const apiHeaders = getHeaderAndParams(headerData)
    const apiParams = getHeaderAndParams(paramData)
    try{
        return await axios({
            method:apiType,
            url:apiURL,
            body:jsonText,
            headers:apiHeaders,
            params: apiParams
        })
    }catch (error){
        return error
    }
}