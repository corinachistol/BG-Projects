import { labelList } from "../../data/labelsList";
import {Filter} from './model.js';

export function getFilters() {
    return labelList.map( item =>{
        // console.log(item) 
        return new Filter(item) } )
}