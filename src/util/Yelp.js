const apiKey =
  "Am-rqgNUoWNLlcFqGGRiDUYnOjG73MQHj6S2pOloTY0OaOaDWU251R2cRp_kcvk7q_8V-9O3vjRULRGysOusWpLTyPDxVl2ZknyEgXcYm1-G2HNyscZGBC4glHNNX3Yx";

const Yelp = {
  searchYelp(term, location, sortBy) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map((business) => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count,
              url: business.url,
              distance: business.distance,
            };
          });
        }
      });
  },
};

export default Yelp;
