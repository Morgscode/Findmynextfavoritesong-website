class SpotifyApiInterface {
  constructor(token) {
    this.token = token;
  }

  setSpotifyFetchOptions() {
    const fetchOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token.toString()}`,
      },
    };

    return fetchOptions;
  }

  spotifyFetchRequest(url) {
    const options = this.setSpotifyFetchOptions();

    const response = fetch(url, options)
      .then((response) => response.json())
      //.then((data) => console.log(data))
      // let's handle the error appropriately
      .catch((err) => console.log(err));
    return response;
  }
}

module.exports = SpotifyApiInterface;
