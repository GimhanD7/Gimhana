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

## Namecheap production deployment

[Deploy portfolio to Namecheap](.github/workflows/deploy-namecheap.yml) builds
React and publishes it together with the PHP API to the document root of
`https://gimhan.web.lk`. The frontend uses the same-origin `/api/index.php`
endpoint. The workflow runs on pushes to `main` and can also be run manually
from that branch.

1. In Namecheap cPanel, add `gimhan.web.lk` under **Domains** and record its
   absolute document root. At the authoritative DNS provider for the domain,
   point the A record to the Namecheap shared hosting IP. Enable HTTPS after
   DNS resolves, and select PHP 8.1 or newer with `pdo_mysql` and `mbstring`.
2. In **Database Wizard**, create the database and a database user, and grant
   the user access to that database. In phpMyAdmin, select the new database.
   To migrate existing portfolio content, import a data export from the
   existing database and copy its `api/uploads` files to the new web root.
   Update stored image URLs that point to the old upload host or path. For
   a fresh install, use a copy of `database.sql` with the `CREATE DATABASE`
   and `USE` statements removed. Replace the bundled admin password hash
   with one for a unique password before importing. Keep the cPanel account
   prefix in the actual database and user names.
3. Create `api/config.production.php` under the Namecheap document root
   using cPanel File Manager. Store the actual database credentials there.

   ```php
   <?php
   return [
       'host' => 'localhost',
       'port' => '3306',
       'name' => 'cpaneluser_portfolio',
       'user' => 'cpaneluser_portfolio',
       'password' => 'YOUR_DATABASE_PASSWORD',
   ];
   ```

4. Enable shell access, authorize a dedicated SSH public key in cPanel, and
   confirm `rsync` is available on the hosting server. If the document root
   has an existing `.htaccess`, back it up and incorporate any required
   cPanel PHP handler or existing directives into `deploy/namecheap.htaccess`
   before the first deploy. The workflow publishes that file to the root.
5. In GitHub, open **Settings → Environments** and create
   `namecheap-production`. Add the following environment settings.

   | Setting | Type | Value |
   | --- | --- | --- |
   | `NAMECHEAP_HOST` | Variable | Hosting server hostname from Namecheap |
   | `NAMECHEAP_USER` | Variable | cPanel SSH username |
   | `NAMECHEAP_DOCUMENT_ROOT` | Variable | Absolute document root from cPanel, such as `/home/cpaneluser/gimhan.web.lk` |
   | `NAMECHEAP_SSH_PRIVATE_KEY` | Secret | Private key for the authorized deployment key, usable without a passphrase |
   | `NAMECHEAP_KNOWN_HOSTS` | Secret | Verified OpenSSH known-hosts entry for `[NAMECHEAP_HOST]:21098`, using the actual hostname |

6. Publish the workflow to `main`, then run **Deploy portfolio to Namecheap**
   from **Actions** if needed. It checks the React projects route, database
   connectivity, and the projects JSON endpoint after upload. Deploys retain
   the server database configuration and existing uploaded images. Database
   imports are a one-time cPanel operation.

See Namecheap's guides for [domains](https://www.namecheap.com/support/knowledgebase/article/897/29/how-to-create-an-addon-domain/),
[SSH](https://www.namecheap.com/support/knowledgebase/article.aspx/1016/89/how-to-access-a-hosting-account-via-ssh/),
and [database imports](https://www.namecheap.com/support/knowledgebase/article.aspx/9143/2180/how-to-import-and-export-a-database-via-phpmyadmin-access-denied-create-database-db_name-error/).

## Existing Vercel setup

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
https://gimhan.web.lk,https://www.gimhan.web.lk,https://gimhana-teal.vercel.app,http://localhost:3000
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
