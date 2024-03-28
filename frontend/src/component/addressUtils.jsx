import axios from "axios";
import { locationIQtk } from "../consts";

export const addressHandler = async (searchKw) => {
 try {
    const response = await axios.get(
      `https://api.locationiq.com/v1/autocomplete?key=${locationIQtk}&limit=3&q=${searchKw}`
    );
    return response.data;
 } catch (err) {
    alert("Location Error.");
    return [];
 }
};