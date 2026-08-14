## Authentication 
System needs to know that a user is one who they claim to be before getting access to resources.

### Basic Auth Methods
1. Basic - User sends username and password to auhtenticate themselves. They get a base64 encoded version of their credentials, which they can send through Authorization key in HTTP headers. Insecure!!

2. Digest authetication - Returns a MD5 hash version of credentials. Needs to be sent in every subsequent request in headers.

3. API key - Sent as X-API-KEY or Authorizatrion in header. Random strings do not save any user information unlike JWT.

### Session based
Stateful authentication, does not scale for large applications.
User send their credentials, servers saves the session ID and is sent to the client to be savesd as a session cookie and sent in every subsequent request. Redis is mostly used, in-memory or persistent memory also used.

### Token based
1. Bearer - Stateless, no database lookup required. Most common is JWT token. It contains encoded data like user email, username, which could be decoded back without needing for a db lookup.

Access token - Short lived 15 min- 1 hr (due to possiblity of exploitation) and used for making API calls to the server.

Refresh token - Long lived, used to get access token when they expire, stored only as HTTPOnly cookies and not in localstorage.

## Outh2
Open Authorization framework - allows a user to grant a third-party application limited access to their resources without sharing their password. Example allow an application access to your Google drive.
The way it works it first takes consent to accesss Google, returns authorization code. Then we exchange code for token to be used to access the Google drive.

## OPDC - Open ID connect
Similar to Oauth. On consent, provider send the authorization code which could be used to exchange with access token and ID (JWT) token. ID token contains users identity data like username.

## SSO - User identity protocol
Access multiple services like Gmail, Youtube, Drive. The identity provider authenticates the user and there are protocols to confirm the sessions for the multiple services. A session storage save the session ID and is sent to the client. This should be sent as a SSO cookie in every subsequent request.