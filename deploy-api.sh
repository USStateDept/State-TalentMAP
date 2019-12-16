#!/bin/bash
# UI Deployment script

TODAY=`date +"%Y-%m-%d-%H%M%S"`
DEPLOYMENT_TYPE="tst"
ZIP_PATH="./talentmap-api.zip"
BACKUP_PATH="/tmp/backup"
TEST_PATH="/talentmap-dev-2"
PRD_PATH="/talentmap"
IVV_PATH="/ivv"
UAT_PATH="/uat"
PYTHON_PATH="/var/www/venv/bin/activate"

echo ${TODAY}

# Default case is for moving to IVV
DEPLOYMENT_BASE="/data/www"
PATH_REPLACE_FROM="talentmap"
PATH_REPLACE_TO="ivv"

usage()
{
    echo "USAGE: deploy.sh --type=tst -z=./my.zip -b=/tmp"
    echo "  -type=* |  --type=*               tst, ivv, uat, prd (default: ${DEPLOYMENT_TYPE})"
    echo "  -z=*    |  --zipPath=*            relative path to the deployment zip (default: ${ZIP_PATH})"
    echo "  -b=*    |  --backupPath=*         relative path to back up old deployment folder (default: ${BACKUP_PATH})"
    echo "  -t=*    |  --tstPath=*            path for TST deployment, relative to deploymentBase (default: ${TEST_PATH})"
    echo "  -i=*    |  --ivvPath=*            path for IVV deployment, relative to deploymentBase (default: ${IVV_PATH})"
    echo "  -u=*    |  --uatPath=*            path for UAT deployment, relative to deploymentBase (default: ${UAT_PATH})"
    echo "  -p=*    |  --prdPath=*            path for PRD deployment, relative to deploymentBase (default: ${PRD_PATH})"
    echo "  -d=*    |  --deploymentBase=*     relative path to common folder for all deployments (default: ${DEPLOYMENT_BASE})"
    echo "  -prf=*  |  --pathReplFrom=*       relative path that code is being replaced from (default: ${PATH_REPLACE_FROM})"
    echo "  -prt=*  |  --pathReplTo=*         relative path that code is being replaced to (default: ${PATH_REPLACE_TO})"
    echo "  -h      |  --help                 display help"
    exit 1
}

migrate()
{
    source ${PYTHON_PATH}
    source setup_environment.sh
    python manage.py migrate
    service httpd restart
    service httpd status
}

for i in "$@"
do
case $i in
  -type=* | --type=* )
                          DEPLOYMENT_TYPE="${i#*=}"
                          shift
                          ;;
  -z=* | --zipPath=* )
                          ZIP_PATH="${i#*=}"
                          shift
                          ;;
  -b=* | --backupPath=* )
                          BACKUP_PATH="${i#*=}"
                          shift
                          ;;
  -t=* | --tstPath=* )
                          TEST_PATH="${i#*=}"
                          shift
                          ;;
  -i=* | --ivvPath=* )
                          IVV_PATH="${i#*=}"
                          shift
                          ;;
  -u=* | --uatPath=* )
                          UAT_PATH="${i#*=}"
                          shift
                          ;;
  -p=* | --prdPath=* )
                          PRD_PATH="${i#*=}"
                          shift
                          ;;
  -d=* | --deploymentBase=* )
                          DEPLOYMENT_BASE="${i#*=}"
                          shift
                          ;;
  -prf=* | --pathReplFrom=* )
                          PATH_REPLACE_FROM="${i#*=}"
                          shift
                          ;;
  -prt=* | --pathReplTo=* )
                          PATH_REPLACE_TO="${i#*=}"
                          shift
                          ;;
  -h | --help )           usage
                          exit
                          ;;
  * )                     usage
                          exit 1
esac
done

# update the to/from paths if $1 = uat
if [ ${DEPLOYMENT_TYPE} = "uat" ]; then
        PATH_REPLACE_FROM="ivv"
        PATH_REPLACE_TO="uat"
fi

if [ ${DEPLOYMENT_TYPE} = "prd" ]; then
        TEST_PATH=${PRD_PATH}
fi

ORIGINAL_PATH="$(pwd)"

TST_DEPLOY_PATH=${DEPLOYMENT_BASE}/${PATH_REPLACE_FROM}/api
TST_DEPLOY_PATH=${TST_DEPLOY_PATH}
BACKUP_PATH=${BACKUP_PATH}
ZIP_ABS_PATH="$(pwd)"/$ZIP_PATH

FULL_DEPLOYMENT_PATH=${DEPLOYMENT_BASE}/${PATH_REPLACE_TO}/api
FULL_DEPLOYMENT_FROM_PATH=${DEPLOYMENT_BASE}/${PATH_REPLACE_FROM}/api

if [ ${DEPLOYMENT_TYPE} = "tst" ] || [ ${DEPLOYMENT_TYPE} = "prd" ]; then
        if [[ -f ${ZIP_PATH} ]]; then
                mkdir -p "${BACKUP_PATH}"
                zip -r "${BACKUP_PATH}/UI_DEPLOYMENT_BACKUP-${DEPLOYMENT_TYPE}-${TODAY}.zip" "${TST_DEPLOY_PATH}"/*
                cp "${TST_DEPLOY_PATH}"/setup_environment.sh "${BACKUP_PATH}"
                cp "${TST_DEPLOY_PATH}"/talentmap_api/settings.py "${BACKUP_PATH}"
                cp "${TST_DEPLOY_PATH}"/talentmap_api/saml2/remote_metadata/remote_metadata.xml "${BACKUP_PATH}"
                cd "${TST_DEPLOY_PATH}"
                unzip "${ZIP_ABS_PATH}"
                cp "${ORIGINAL_PATH}"/"${BACKUP_PATH}"/setup_environment.sh "${ORIGINAL_PATH}"/"${TST_DEPLOY_PATH}"
                cp "${ORIGINAL_PATH}"/"${BACKUP_PATH}"/settings.py "${ORIGINAL_PATH}"/"${TST_DEPLOY_PATH}"/talentmap_api
                cp "${ORIGINAL_PATH}"/"${BACKUP_PATH}"/remote_metadata.xml "${ORIGINAL_PATH}"/"${TST_DEPLOY_PATH}"/talentmap_api/saml2/remote_metadata
                migrate
        else
                echo "Deployment zip file not found"
        fi
fi

if [ ${DEPLOYMENT_TYPE} = "ivv" ] || [ ${DEPLOYMENT_TYPE} = "uat" ]; then
        mkdir -p "${BACKUP_PATH}"
        zip -r "${BACKUP_PATH}/UI_DEPLOYMENT_BACKUP-${PATH_REPLACE_FROM}-${TODAY}.zip" "${FULL_DEPLOYMENT_PATH}"/*
        cp "${FULL_DEPLOYMENT_PATH}"/setup_environment.sh "${BACKUP_PATH}"
        cp "${FULL_DEPLOYMENT_PATH}"/talentmap_api/settings.py "${BACKUP_PATH}"
        cp "${FULL_DEPLOYMENT_PATH}"/talentmap_api/saml2/remote_metadata/remote_metadata.xml "${BACKUP_PATH}"
        cd "${FULL_DEPLOYMENT_PATH}"
        cp -R "${ORIGINAL_PATH}"/"${FULL_DEPLOYMENT_FROM_PATH}"/* "${ORIGINAL_PATH}"/"${FULL_DEPLOYMENT_PATH}"
        cp "${ORIGINAL_PATH}"/"${BACKUP_PATH}"/setup_environment.sh "${ORIGINAL_PATH}"/"${FULL_DEPLOYMENT_PATH}"
        cp "${ORIGINAL_PATH}"/"${BACKUP_PATH}"/settings.py "${ORIGINAL_PATH}"/"${FULL_DEPLOYMENT_PATH}"/talentmap_api
        cp "${ORIGINAL_PATH}"/"${BACKUP_PATH}"/remote_metadata.xml "${ORIGINAL_PATH}"/"${FULL_DEPLOYMENT_PATH}"/talentmap_api/saml2/remote_metadata
        migrate
fi
