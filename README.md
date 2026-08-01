# Gimhana Portfolio

React portfolio with a PHP 8/MySQL backend and a session-authenticated admin panel.

## Requirements

- XAMPP with Apache, PHP 8.1+ and MySQL
- Node.js and npm for rebuilding the React frontend

## Database setup

1. Start Apache and MySQL in XAMPP.
2. Open `http://localhost/phpmyadmin`.
3. Select **Import** and import `database.sql`.
4. Confirm the database `gimhana_portfolio` was created.

The development database settings are in `api/config.php`:

```text
host: 127.0.0.1
database: gimhana_portfolio
username: root
password: (empty)
```

For another environment, set `PORTFOLIO_DB_HOST`, `PORTFOLIO_DB_PORT`,
`PORTFOLIO_DB_NAME`, `PORTFOLIO_DB_USER`, and `PORTFOLIO_DB_PASSWORD`.

On shared hosting, create `api/config.local.php` with the server database
credentials. This file is loaded automatically and ignored by Git. Upload it
privately alongside the other API files; never expose it through a public
repository.

For the Vercel frontend, `.env.production` points to the same-origin proxy:

```text
/api/index.php
```

`vercel.json` rewrites that path to the remote PHP API at
`https://sudesh.sudeshmaths.com/backend/api/`. This avoids third-party-cookie
and browser tracking-prevention problems during admin authentication.

Upload the local `api` directory so that `index.php`, `bootstrap.php`, and
`config.php` remain available under the remote `/backend/api/` directory.

Set `PORTFOLIO_ALLOWED_ORIGINS` on the backend to a comma-separated list of
frontend origins, for example:

```text
https://gimhan.me,https://www.gimhan.me,https://gimhana-teal.vercel.app,http://localhost:3000
```

## First admin login

Open `http://localhost/Gimhana/admin`.

```text
Username: admin
Password: ChangeMe123!
```

Change this default before publishing. Generate a new password hash:

```powershell
php -r "echo password_hash('YOUR-NEW-PASSWORD', PASSWORD_DEFAULT), PHP_EOL;"
```

Then replace the `admins.password_hash` value in phpMyAdmin. Passwords are
verified on the PHP server and are never stored in the React application.

## Frontend development

```powershell
npm install
npm start
```

The development proxy forwards `/Gimhana/api` to XAMPP. The default API path
can be overridden with `REACT_APP_API_URL`.

Create a deployable build with:

```powershell
npm run build
```

Copy the contents of `build` into the Apache-served project directory when
deploying the compiled frontend.

## Backend endpoints

All endpoints are handled by `api/index.php`.

- `GET ?action=health`
- `GET ?action=projects`
- `GET ?action=project&id={id}`
- `GET ?action=session`
- `POST ?action=login`
- `POST ?action=logout`
- `POST ?action=projects` — authenticated
- `PUT ?action=project&id={id}` — authenticated
- `DELETE ?action=project&id={id}` — authenticated

Mutating requests require both the authenticated session cookie and the CSRF
token returned by the login/session endpoint.
