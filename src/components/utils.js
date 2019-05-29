import { GOOGLEMAPS_KEY } from "@/store/constants";
import axios from "axios";

export default {
  methods: {
    getCoordinateByLocation(location) {
      if (location !== null) {
        return new Promise((resolve, reject) => {
          axios
            .get(
              "https://maps.googleapis.com/maps/api/geocode/json?address= " +
                location +
                "&key=" +
                GOOGLEMAPS_KEY
            )
            .then(response => {
              if (response.data.status === "OK") {
                // locationObj.latitude =
                //   response.data.results[0].geometry.location.lat;
                // locationObj.longitude =
                //   response.data.results[0].geometry.location.lng;

                // if (response.data.results[0].types[0] === "country") {
                //   locationObj.IsCountry = true;
                // }

                console.log(response);

                resolve(response.data.results[0]);
              }
            })
            .catch(e => {
              console.error(e);
              reject(e);
            });
        });
      }
    }
  }
};
