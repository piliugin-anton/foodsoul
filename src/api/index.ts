import axios, { AxiosInstance } from 'axios'

export default class API {
    instance: AxiosInstance = axios.create({
        baseURL: 'http://localhost:5173/',
        timeout: 5000
    })

    search(query: string): Promise<NominatimResponse[]> {
        return this.instance.get('/search', {
            params: {
                query
            }
        })
        .then((response) => response.data)
    }
}

export interface GeocodeAddress {
    county: string;
    city: string;
    city_district: string;
    construction: string;
    continent: string;
    country: string;
    country_code: string;
    house_number: string;
    neighbourhood: string;
    postcode: string;
    public_building: string;
    state: string;
    suburb: string;
}

export interface NominatimResponse {
    address: GeocodeAddress;
    boundingbox: string[];
    class: string;
    display_name: string;
    importance: number;
    lat: string;
    licence: string;
    lon: string;
    osm_id: number;
    osm_type: string;
    place_id: number;
    place_rank: number;
    svg: string;
    type: string;
    extratags: any;
}