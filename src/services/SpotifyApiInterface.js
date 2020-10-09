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

  async spotifyFetchRequest(url) {
    const options = this.setSpotifyFetchOptions();

    const response = await fetch(url, options)
      .then((response) => response.json())
      // let's handle the error appropriately
      .catch((err) => console.log(err));
    return response;
  }
}

module.exports = SpotifyApiInterface;
