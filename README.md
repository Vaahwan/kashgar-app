# Kashgar-app
Kashgar app

## MongoDB backend setup

The backend uses the official MongoDB driver. Server Components, Server Actions,
and Node.js Route Handlers can import `getDatabase` from `@/lib/mongodb` and call
`await getDatabase()` to access collections. Never import this helper into Client
Components; it is protected by `server-only`.

### Configure Atlas

1. In Atlas **Database Access**, create a database user with `readWrite` access
	limited to the `kashgar` database. This is separate from your Atlas login.
2. In **Network Access**, allow your development machine's public IP. For
	deployment, allow the backend's outbound IPs or use private networking.
	Avoid allowing all IP addresses as a default.
3. Open **Connect → Drivers** for `cluster0.o1fynni.mongodb.net` and copy its
	connection string.
4. Set `MONGODB_URI` in `.env.local`, replacing the database username/password.
	Percent-encode special characters in credentials. Set `MONGODB_DB=kashgar`.
	If setting up a fresh clone, copy `.env.example` to `.env.local` first.
5. Run `npm run db:check` to connect and ping the database. Restart the dev server
	after updating environment variables.

`.env.local` is ignored by Git. Never use a `NEXT_PUBLIC_` prefix for database
credentials. Configure these environment variables separately on the deployment
platform; do not commit credentials or paste them into chat.

Connections are lazy and pooled, so builds work without database credentials.
Failed connections can be retried on later requests. A successful ping does not
create collections or verify write permissions; MongoDB creates the database and
collections on the first write. Existing UI data is not yet connected to MongoDB.
