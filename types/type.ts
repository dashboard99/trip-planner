export interface PlaceType {
  id: string;
  image: string;
  description: string;
  title: string;
}

export interface LocationType {
  place_id: string;
  osm_id: string;
  osm_type: string;
  licence: string;
  lat: string;
  lon: string;
  boundingbox: string[];
  class: string;
  type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: Address;
}

interface Address {
  name: string;
  country: string;
  country_code: string;
  state: string;
}
