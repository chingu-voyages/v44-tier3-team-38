export const business = [
  {
    "id": "Sa_qcnc7ZgzSOylf3plTRA",
    "alias": "c-level-san-diego",
    "name": "C Level Lounge",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/rE2Ti2kPJTW_xv2FkW-8Lg/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/c-level-san-diego?adjust_creative=Zqvcm4Z5s8STEMpblm_u6w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Zqvcm4Z5s8STEMpblm_u6w",
    "review_count": 4186,
    "categories": [
      {
        "alias": "newamerican",
        "title": "American (New)"
      },
      {
        "alias": "seafood",
        "title": "Seafood"
      },
      {
        "alias": "steak",
        "title": "Steakhouses"
      }
    ],
    "rating": 4.5,
    "coordinates": {
      "latitude": 32.724134606782236,
      "longitude": -117.1886497832098
    },
    "transactions": [],
    "price": "$$",
    "location": {
      "address1": "880 Harbor Island Dr",
      "address2": "",
      "address3": "",
      "city": "San Diego",
      "zip_code": "92101",
      "country": "US",
      "state": "CA",
      "display_address": [
        "880 Harbor Island Dr",
        "San Diego, CA 92101"
      ]
    },
    "phone": "+16192986802",
    "display_phone": "(619) 298-6802",
    "distance": 8073.986848481983
  }
];




// import { businesses } from "./exampleFile";

// interface Business {
//   id: string;
//   alias: string;
//   name: string;
//   // Other properties
//   coordinates: {
//     latitude: number;
//     longitude: number;
//   };
// }

// const businesses: Business[] = [
//   // ... list of businesses
// ];

// // Create a mapping based on latitude and longitude
// const businessMap = new Map<string, Business>();

// businesses.forEach((business) => {
//   const { latitude, longitude } = business.coordinates;
//   const key = `${latitude},${longitude}`;
//   businessMap.set(key, business);
// });

// // Example usage
// const latitude = 32.724134606782236;
// const longitude = -117.1886497832098;
// const key = `${latitude},${longitude}`;
// const business = businessMap.get(key);

// if (business) {
//   // Found a business at the given latitude and longitude
//   console.log(business);
// } else {
//   // No business found at the given latitude and longitude
//   console.log("Business not found");
// }
