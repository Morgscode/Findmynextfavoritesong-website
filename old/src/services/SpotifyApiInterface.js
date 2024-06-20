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

  async spotifyGetFetchRequest(url) {
    const options = this.setSpotifyFetchOptions();
    const response = await fetch(url, options);
    if (response.status == 200) {
      return response.json();
    } else {
      return (response.error = 1);
    }
  }

  async spotifyPutFetchRequest(url) {
    let options = this.setSpotifyFetchOptions();
    options.method = "PUT";
    const response = await fetch(url, options);
    if (response.status == 200) {
      return response.json();
    } else {
      return (response.error = 1);
    }
  }
}

module.exports = SpotifyApiInterface;
