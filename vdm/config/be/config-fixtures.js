const ptr4 = {
	url: 'https://vdm.{{ .Values.domain }}/backend', // url on which server is accessible --> use env var ?
	urlMapServer: "http://localhost:8050", // url on which MapServer is accessible
	masterPort: 9850,
	isBehindKong: true, // allow auto login based on X-User-Info header which is provided by KongHQ, potential security risk if used without KongHQ
	mapserver: {
		url: "http://localhost:8050", // url on which MapServer is accessible
		mapsPath: "/etc/mapserver/maps",
		storagePath: "/etc/mapserver/storage"
	},
	mapproxy: {
		url: "http://mapproxy:8051",
		seedApiUrl: "http://mapproxy-api:9870",
		paths: {
			conf: "/home/mapproxy/conf",
			datasource: "/home/mapproxy/datasource",
			cache: "/home/mapproxy/cache",
			seed: "/home/mapproxy/seed"
		}
	},
	pgConfig: {
		normal: {
			user: process.env.BE_PG_NORMAL_USER,
			password: process.env.BE_PG_NORMAL_PASSWD,
			database: `panther`,
			host: `pg`,
			port: 5432,
			// keep connections open for 1 hour (instead of default 10 seconds)
			// to make better use of query plan cache (which is per connection)
			idleTimeoutMillis: 3600000,
			allowExitOnIdle: true
		},
		superuser: {
			user: process.env.BE_PG_SUPER_USER,
			password: process.env.BE_PG_SUPER_PASSWD,
			database: `postgres`,
			host: `pg`,
			port: 5432
		}
	},
	redisConfig: {
		host: 'redis',
		port: 6379
	},
	pgSchema: {
		analysis: `analysis`,
		data: `data`,
		metadata: `metadata`,
		permissions: `permissions`,
		views: `views`,
		relations: `relations`,
		dataSources: `dataSources`,
		specific: `specific`,
		application: `application`,
		various: `various`,
		user: `user`
	},
	jwt: {
		secret: 'changeMe',
		expiresIn: 604800, // seconds (604800 = 7 days)
	},
	password: {
		iteration_counts: 4
	},
	sso: {
		// https://github.com/jaredhanson/passport-google-oauth2#create-an-application
		google: {
			clientId: null,
			clientSecret: null,
		},
		// https://github.com/jaredhanson/passport-facebook#create-an-application
		facebook: {
			clientId: null,
			clientSecret: null,
		}
	},
	import: {
		raster: {
			paths: {
				mapfile: `/tmp/panther/msmaps`,
				static: `/tmp/panther/static`
			}
		}
	},
	// Directory containing apps. App is a directory with `index.js` file same as the directories in
    // `src/applicatons`. index.js is loaded automatically. Can be `null`.
    externalApplications: __dirname + '/panther-apps',
	projects: {
		worldCereal: {
			s3: {
				AWS_SECRET_ACCESS_KEY: process.env.BE_S3_SECRET_ACCESS_KEY,
				AWS_ACCESS_KEY_ID: process.env.BE_S3_ACCESS_KEY_ID,
				AWS_VIRTUAL_HOSTING: process.env.BE_S3_VIRTUAL_HOSTING,
				AWS_S3_ENDPOINT: process.env.BE_S3_ENDPOINT
			},
			fixtures: true,
			ingestion: false
		}
	}
};

module.exports = ptr4;
