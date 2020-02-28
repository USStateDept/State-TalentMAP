#!/bin/bash
# UI Deployment script

TODAY=`date +"%Y-%m-%d-%H%M%S"`
DEPLOYMENT_TYPE="tst"
ZIP_PATH="./talentmap-api.zip"
PYTHON_DEP_ZIP_PATH="/tmp/talentmap-api-dependencies.zip"
BACKUP_PATH="/tmp/backup"

TEST_PATH="/talentmap-dev-2"
PRD_PATH="/talentmap"
IVV_PATH="/ivv"
UAT_PATH="/uat"

PYTHON_PATH="/var/www/venv/bin/activate"

echo ${TODAY}

# Default case is for moving to IVV
DEPLOYMENT_BASE="/data/www"

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
    python manage.py makemigrations
    python manage.py migrate
    sudo service httpd restart
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

BACKUP_PATH=${BACKUP_PATH}
ZIP_ABS_PATH="$(pwd)"/$ZIP_PATH

if [ ${DEPLOYMENT_TYPE} = "tst" ]; then
        DEPLOY_PATH="${DEPLOYMENT_BASE}""${TEST_PATH}"/api
        if [[ -f ${ZIP_PATH} ]]; then
                sudo mkdir -p "${BACKUP_PATH}"
                sudo zip -r "${BACKUP_PATH}/UI_DEPLOYMENT_BACKUP-tst-${TODAY}.zip" "${DEPLOY_PATH}"/*
                sudo cp "${TST_DEPLOY_PATH}"/setup_environment.sh "${BACKUP_PATH}"
                sudo cp "${TST_DEPLOY_PATH}"/talentmap_api/settings.py "${BACKUP_PATH}"
                sudo cp "${TST_DEPLOY_PATH}"/talentmap_api/saml2/remote_metadata/remote_metadata.xml "${BACKUP_PATH}"
                cd "${TST_DEPLOY_PATH}"
                yes | sudo unzip "${ZIP_ABS_PATH}"
                sudo cp "${BACKUP_PATH}"/setup_environment.sh "${TST_DEPLOY_PATH}"
                sudo cp "${BACKUP_PATH}"/settings.py "${TST_DEPLOY_PATH}"/talentmap_api
                sudo cp "${BACKUP_PATH}"/remote_metadata.xml "${TST_DEPLOY_PATH}"/talentmap_api/saml2/remote_metadata
                migrate
        else
                echo "Deployment zip file not found"
        if [[ -f ${PYTHON_DEP_ZIP_PATH} ]]; then
                cd "/var/www/venv/lib/python3.6/site-packages/"
                sudo zip -r "${BACKUP_PATH}/DEPENDENCIES_BACKUP-prd-${TODAY}.zip" "./*"
                sudo yes | unzip "${PYTHON_DEP_ZIP_PATH}"
        fi
fi

if [ ${DEPLOYMENT_TYPE} = "prd" ]; then
        DEPLOY_PATH="${DEPLOYMENT_BASE}""${PRD_PATH}"/api
        if [[ -f ${ZIP_PATH} ]]; then
                sudo mkdir -p "${BACKUP_PATH}"
                sudo zip -r "${BACKUP_PATH}/UI_DEPLOYMENT_BACKUP-prd-${TODAY}.zip" "${DEPLOY_PATH}"/*
                sudo cp "${DEPLOY_PATH}"/setup_environment.sh "${BACKUP_PATH}"
                sudo cp "${DEPLOY_PATH}"/talentmap_api/settings.py "${BACKUP_PATH}"
                sudo cp "${DEPLOY_PATH}"/talentmap_api/saml2/remote_metadata/remote_metadata.xml "${BACKUP_PATH}"
                cd "${DEPLOY_PATH}"
                yes | sudo unzip "${ZIP_ABS_PATH}"
                sudo cp "${BACKUP_PATH}"/setup_environment.sh "${DEPLOY_PATH}"
                sudo cp "${BACKUP_PATH}"/settings.py "${DEPLOY_PATH}"/talentmap_api
                sudo cp "${BACKUP_PATH}"/remote_metadata.xml "${DEPLOY_PATH}"/talentmap_api/saml2/remote_metadata
                migrate
        else
                echo "Deployment zip file not found"
        if [[ -f ${PYTHON_DEP_ZIP_PATH} ]]; then
                cd "/var/www/venv/lib/python3.6/site-packages/"
                sudo zip -r "${BACKUP_PATH}/DEPENDENCIES_BACKUP-prd-${TODAY}.zip" "./*"
                sudo yes | unzip "${PYTHON_DEP_ZIP_PATH}"
        fi
fi

if [ ${DEPLOYMENT_TYPE} = "ivv" ]; then
        DEPLOY_PATH="${DEPLOYMENT_BASE}""${IVV_PATH}"/api
        TST="${DEPLOYMENT_BASE}""${TST_PATH}"/api
        sudo mkdir -p "${BACKUP_PATH}"
        sudo zip -r "${BACKUP_PATH}/UI_DEPLOYMENT_BACKUP-ivv-${TODAY}.zip" "${DEPLOY_PATH}"/*
        sudo cp "${DEPLOY_PATH}"/setup_environment.sh "${BACKUP_PATH}"
        sudo cp "${DEPLOY_PATH}"/talentmap_api/settings.py "${BACKUP_PATH}"
        sudo cp "${DEPLOY_PATH}"/talentmap_api/saml2/remote_metadata/remote_metadata.xml "${BACKUP_PATH}"
        cd "${DEPLOY_PATH}"
        yes | sudo cp -r "${TST}"/* "${DEPLOY_PATH}"
        sudo cp "${BACKUP_PATH}"/setup_environment.sh "${DEPLOY_PATH}"
        sudo cp "${BACKUP_PATH}"/settings.py "${DEPLOY_PATH}"/talentmap_api
        sudo cp "${BACKUP_PATH}"/remote_metadata.xml "${DEPLOY_PATH}"/talentmap_api/saml2/remote_metadata
        migrate
fi

if [ ${DEPLOYMENT_TYPE} = "uat" ]; then
        DEPLOY_PATH="${DEPLOYMENT_BASE}""${UAT_PATH}"/api
        IVV="${DEPLOYMENT_BASE}""${IVV_PATH}"/api
        sudo mkdir -p "${BACKUP_PATH}"
        sudo zip -r "${BACKUP_PATH}/UI_DEPLOYMENT_BACKUP-uat-${TODAY}.zip" "${DEPLOY_PATH}"/*
        sudo cp "${DEPLOY_PATH}"/setup_environment.sh "${BACKUP_PATH}"
        sudo cp "${DEPLOY_PATH}"/talentmap_api/settings.py "${BACKUP_PATH}"
        sudo cp "${DEPLOY_PATH}"/talentmap_api/saml2/remote_metadata/remote_metadata.xml "${BACKUP_PATH}"
        cd "${DEPLOY_PATH}"
        yes | sudo cp -r "${TST}"/* "${DEPLOY_PATH}"
        sudo cp "${BACKUP_PATH}"/setup_environment.sh "${DEPLOY_PATH}"
        sudo cp "${BACKUP_PATH}"/settings.py "${DEPLOY_PATH}"/talentmap_api
        sudo cp "${BACKUP_PATH}"/remote_metadata.xml "${DEPLOY_PATH}"/talentmap_api/saml2/remote_metadata
        migrate
fi

if [ ${DEPLOYMENT_TYPE} = "deps" ]; then
        cd "/var/www/venv/lib/python3.6/site-packages/"
        sudo zip -r "${BACKUP_PATH}/DEPENDENCIES-${TODAY}.zip" "./*"
fi
