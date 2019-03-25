import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  companies: {
    8487: {
      customerId: 8487,
      name: "LSL Digital",
      logo: "lsldigital.svg",
      locationText: "Work for 3D Recruit Education",
      founded: 2015,
      phone: "(230) 213 2323",
      size: "500+ employees",
      industry: "Fintech, Engineering",
      website: "http://lsl.digital",
      address: "8, Rue baie des Oursins Baie du Tombeau, 7CU0092",
      twitter: "http://twitter.com/lsldigital",
      facebook: "https://www.facebook.com/lsldigital/",
      linkedin: "https://www.linkedin.com/company/lsl-digital/",
      about:
        "<p>LSL Digital was created out of need to fulfill the growing demand of La Sentinelle for development and infrastructure support.</p> <p>Since 2018, LSL Digital has started serving customers beyond the walls of La Sentinelle Group. Today, LSL Digital positions itself as a solutions provider and assists businesses towards their digital transformation.</p> <p>We started operations in 2015 and we're today a 17-members staff team; comprising of sales, development & operations. The main objectives of the division being to develop and sustain digital services & products for the group, while also cond.</p>",
      location: {
        lat: -20.2452272,
        lng: 57.4896214
      },
      backgroundImage: "lsldigital-bg.jpg"
    },
    8488: {
      customerId: 8488,
      name: "Mauritius Commercial Bank",
      logo: "mcb.png",
      locationText: "Work for 3D Recruit Education",
      founded: 1965,
      phone: "(230) 213 2323",
      size: "500+ employees",
      industry: "Fintech, Engineering",
      website: "http://lsl.digital",
      address: "8, Rue baie des Oursins Baie du Tombeau, 7CU0092",
      twitter: "http://twitter.com/lsldigital",
      facebook: "https://www.facebook.com/lsldigital/",
      linkedin: "https://www.linkedin.com/company/lsl-digital/",
      about:
        "<p>LSL Digital was created out of need to fulfill the growing demand of La Sentinelle for development and infrastructure support.</p> <p>Since 2018, LSL Digital has started serving customers beyond the walls of La Sentinelle Group. Today, LSL Digital positions itself as a solutions provider and assists businesses towards their digital transformation.</p> <p>We started operations in 2015 and we're today a 17-members staff team; comprising of sales, development & operations. The main objectives of the division being to develop and sustain digital services & products for the group, while also cond.</p>",
      location: {
        lat: -20.2452272,
        lng: 57.4896214
      },
      backgroundImage: "lsldigital-bg.jpg"
    },
    8489: {
      customerId: 8489,
      name: "Agile Media Ltd.",
      logo: "lsldigital.svg",
      locationText: "Work for 3D Recruit Education",
      founded: 2015,
      phone: "(230) 213 2323",
      size: "500+ employees",
      industry: "Fintech, Engineering",
      website: "http://lsl.digital",
      address: "8, Rue baie des Oursins Baie du Tombeau, 7CU0092",
      twitter: "http://twitter.com/lsldigital",
      facebook: "https://www.facebook.com/lsldigital/",
      linkedin: "https://www.linkedin.com/company/lsl-digital/",
      about:
        "<p>LSL Digital was created out of need to fulfill the growing demand of La Sentinelle for development and infrastructure support.</p> <p>Since 2018, LSL Digital has started serving customers beyond the walls of La Sentinelle Group. Today, LSL Digital positions itself as a solutions provider and assists businesses towards their digital transformation.</p> <p>We started operations in 2015 and we're today a 17-members staff team; comprising of sales, development & operations. The main objectives of the division being to develop and sustain digital services & products for the group, while also cond.</p>",
      location: {
        lat: -20.2452272,
        lng: 57.4896214
      },
      backgroundImage: "lsldigital-bg.jpg"
    }
  }
};

const namespaced = true;

export default {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
