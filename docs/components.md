# VDM's components

Component name:
- be

Description:
- Main server side application designed to handle all request to VDM's API made by processing or VMD's client side application. Can be run in multiple instances.

Docker image:
- gisat/be-core:dev

Configuration file:
- ../config/be/config.js

Volumes:
- ../config/be/config.js -> /usr/src/app/config.js - read only
- mapproxy-conf -> /home/mapproxy/conf - persistant shared volume
- mapproxy-datasource -> /home/mapproxy/datasource - persistant shared volume
- mapproxy-cache -> /home/mapproxy/cache - persistant shared volume
- mapproxy-seed -> /home/mapproxy/seed - persistant shared volume

Environment variables:
- BE_PG_NORMAL_USER
- BE_PG_NORMAL_PASSWD
- BE_PG_SUPER_USER
- BE_PG_SUPER_PASSWD
- BE_S3_SECRET_ACCESS_KEY
- BE_S3_ACCESS_KEY_ID
- BE_S3_VIRTUAL_HOSTING
- BE_S3_ENDPOINT

Port:
- 9850

---

Component name:
- be-background

Description:
- Helper server side application designed to run long running processes like ingestion of products. Can be run in multiple instances.

Docker image:
- gisat/be-core:dev

Configuration file:
- ../config/be/config-background.js

Volumes:
- ../config/be/config-background.js -> /usr/src/app/config.js - read only
- mapproxy-conf -> /home/mapproxy/conf - persistant shared volume
- mapproxy-datasource -> /home/mapproxy/datasource - persistant shared volume
- mapproxy-cache -> /home/mapproxy/cache - persistant shared volume
- mapproxy-seed -> /home/mapproxy/seed - persistant shared volume

Environment variables:
- BE_PG_NORMAL_USER
- BE_PG_NORMAL_PASSWD
- BE_PG_SUPER_USER
- BE_PG_SUPER_PASSWD
- BE_S3_SECRET_ACCESS_KEY
- BE_S3_ACCESS_KEY_ID
- BE_S3_VIRTUAL_HOSTING
- BE_S3_ENDPOINT

Port:
- 9850

---

Component name:
- be-fixtures

Description:
- Helper server side application designed to process statistics. Should be run as single instance.

Docker image:
- gisat/be-core:dev

Configuration file:
- ../config/be/config-fixtures.js

Volumes:
- ../config/be/config-fixtures.js -> /usr/src/app/config.js - read only
- mapproxy-conf -> /home/mapproxy/conf - persistant shared volume
- mapproxy-datasource -> /home/mapproxy/datasource - persistant shared volume
- mapproxy-cache -> /home/mapproxy/cache - persistant shared volume
- mapproxy-seed -> /home/mapproxy/seed - persistant shared volume

Environment variables:
- BE_PG_NORMAL_USER
- BE_PG_NORMAL_PASSWD
- BE_PG_SUPER_USER
- BE_PG_SUPER_PASSWD
- BE_S3_SECRET_ACCESS_KEY
- BE_S3_ACCESS_KEY_ID
- BE_S3_VIRTUAL_HOSTING
- BE_S3_ENDPOINT

Port:
- 9850

---

Component name:
- app

Description:
- Client side application - viewer. Can run in multiplne instances

Docker image:
- gisat/app-esa_world_cereal_product_viewer:dev

Configuration file:
- ../config/app/runtimeConfig.js

Volumes:
- ../config/app/runtimeConfig.js -> /srv/www/app/static/js/runtimeConfig.js - read only

Port:
- 9000

---

Component name:
- pg

Description:
- PostgreSQL server - database. Should run as single instace.

Docker image:
- gisat/postgis:13

Configuration file:
- ../config/postgresql/postgresql.conf

Volumes:
 - pg-data -> /var/lib/postgresql/data - persistant volume
- ../config/postgresql/postgresql.conf -> /etc/postgresql/postgresql.conf - read only

Port:
- 5432

---

Component name:
- redis

Description:
- Redis server used to share information between instances of backend applications. Should run as single instance.

Docker image:
- redis

Configuration file:
- no configuration needed

Volumes:
- no volumes needed

Port:
- 6379

---

Component name:
- mapproxy

Description:
- Mapproxy with mapserver. Used to produce WMS layers from imported products. Can run in multiple instances.

Docker image:
- gisat/mapproxy

Configuration file:
- no configuration needed

Volumes:
- mapproxy-conf -> /home/mapproxy/conf - persistant shared volume
- mapproxy-datasource -> /home/mapproxy/datasource - persistant shared volume
- mapproxy-cache -> /home/mapproxy/cache - persistant shared volume
- mapproxy-seed -> /home/mapproxy/seed - persistant shared volume

Port:
- 8051

---

Component name:
- mapproxy-api

Description:
- API for internal purposes only. Allows control seeding processes of WMS layers. Should run as single instance.

Docker image:
- gisat/mapproxy:seed-api

Configuration file:
- no configuration needed

Volumes:
- mapproxy-conf -> /home/mapproxy/conf - persistant shared volume
- mapproxy-datasource -> /home/mapproxy/datasource - persistant shared volume
- mapproxy-cache -> /home/mapproxy/cache - persistant shared volume
- mapproxy-seed -> /home/mapproxy/seed - persistant shared volume

Port:
- 9870