# Visualization data Module (VDM) Deployment 

This document explain how to deploy the VDM component in the World Cereal context.

## Index

- [1. Requirements](#requirements)
- [2. Init](#init)
- [3. vdm](#vdm) 
- [4. Ingresses](#ingresses)


## Requirements

1. The World Cereal cluster is deployed.
2. The System cluster ([ewoc-platform](https://github.com/WorldCereal/ewoc_platform)) was installed successfully (creates the `vdm` namespace and the `aws-registry` secret (image pull secret).

## Init

Go to the root of the repository.

To deploy the vdm component, the first action is to set all parameters in the `export-env.sh` file.
All variable regarding S3 *MUST* be set because it's used to generate vdm-aws secret that is mounted in the backend pods to communicate with S3 storage.

| Name                      | Description                                     |
|---------------------------|-------------------------------------------------|
| CS_REGISTRY               | Image registry address to pull image from.      |
| HOSTNAME                  | Current domain name.                            |
| BE_S3_SECRET_ACCESS_KEY   | S3 secret for accessing refrence data from.     |
| BE_S3_ACCESS_KEY_ID       | S3 access key for accessing refrence data from. |
| BE_S3_VIRTUAL_HOSTING     | S3 usage or not                                 |
| BE_S3_ENDPOINT            | S3 URL                                          |

When all variable are set, run the following commands:
```
source export-env.sh
make init
```
This will create the S3 secret in the vdm namespace.

| Name                      | Description                                      |
|---------------------------|--------------------------------------------------|
| vdm-aws                   | Generate S3 credential secret                    |


## VDM

The VDM consists of 8 deployments:
- `app-wcpdr` which is the frontend of the application.
- 2 `mapproxy` deployments (`mapproxy` and `mapproxy-api`)
- 3 backend deployments: `be` (be-core), `be-background` and `be-fixtures`
- a PostgreSQL deployment
- a `redis` deployment

All mapproxy and backend containers share 4 volumes mounted in /home/mapproxy/.
It uses the `vdm-db` secret to connect to te PostgreSQL database and the `vdm-aws` secret to connect to the S3 storage.

For more details, see [VDM's components](https://github.com/WorldCereal/gisat-env-world-cereal/blob/develop/docs/components.md)

To deploy it:
```
make vdm
```

## Ingresses

Ingresses for the VDM should have been created when installing [ewoc-platform](https://github.com/WorldCereal/ewoc_platform). Make sure you see `vdm` and `vdmapi` when executing: `kubectl get ingress -n vdm`

