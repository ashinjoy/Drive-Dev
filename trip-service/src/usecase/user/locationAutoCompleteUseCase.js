import axios from "axios";
export class LocationAutoCompleteUseCase {
  async execute(search) {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${search}&country=in&proximity=ip&access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=6&autocomplete=true`
      );
      return response.data?.features;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
