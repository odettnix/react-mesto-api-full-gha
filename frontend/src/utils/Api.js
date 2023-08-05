class Api {
  constructor( {baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;

    this.__checkResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  getUserInfo() {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + `/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      } 
    }).then(this.__checkResponse);
  }

  getInitialCards() {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + `/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }  
    })
    .then(this.__checkResponse);
  }

  saveNewUserInfo(userInformaiton) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(userInformaiton)
    })
      .then(this.__checkResponse);
  }

  saveNewUserAvatar(avatar) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(avatar)})
      .then(this.__checkResponse);
  }

  postNewCard(cardInformation) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(cardInformation)})
      .then(this.__checkResponse);
  }

  removeCard(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
      })
      .then(this.__checkResponse);
  }

  putLikeCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      })
      .then(this.__checkResponse);
  }

  deleteLike(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
      })
      .then(this.__checkResponse);
  }
}

export const api = new Api({
    baseUrl: 'https://api.odettnix.nomorepartie.nomoreparties.co',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
});