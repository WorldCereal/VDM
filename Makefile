.PHONY: build delete vdm

init:
	@test -n "$(CLUSTER_VDM_ENV_LOADED)" || { echo 'The VDM env variables should be source before run this script' && exit 1; }
	kubectl create secret generic vdm-aws --type=Opaque --namespace=vdm \
			--from-literal="BE_S3_SECRET_ACCESS_KEY=$(BE_S3_SECRET_ACCESS_KEY)" \
			--from-literal="BE_S3_ACCESS_KEY_ID=$(BE_S3_ACCESS_KEY_ID)" \
			--from-literal="BE_S3_VIRTUAL_HOSTING=$(BE_S3_VIRTUAL_HOSTING)" \
			--from-literal="BE_S3_ENDPOINT=$(BE_S3_ENDPOINT)" \
			--dry-run=client -oyaml | kubectl apply -f-

vdm:
	@test -n "$(CLUSTER_VDM_ENV_LOADED)" || { echo 'The VDM env variables should be source before run this script' && exit 1; }

	@sed "s:VALUE_HOSTNAME:$(HOSTNAME):;s:CS_REGISTRY:$(CS_REGISTRY):;:g" vdm/values.tmpl > vdm-values.yaml

	helm upgrade --install vdm vdm/ --namespace=vdm --values=vdm-values.yaml

delete:
	helm uninstall -n vdm vdm

