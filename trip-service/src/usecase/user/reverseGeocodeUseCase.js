import axios from "axios";

export class ReverseGeoCodeUseCase {
  constructor() {}
  async execute(coords) {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${coords[0]}&latitude=${coords[1]}&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
      );
      return response.data.features[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
