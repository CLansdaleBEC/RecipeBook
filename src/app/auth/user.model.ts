export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}


  // can access this like: user.token and user cannot override this
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
    }
    return this._token;
  }
}
