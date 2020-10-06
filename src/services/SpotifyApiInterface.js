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

    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
}

module.exports = SpotifyApiInterface;
