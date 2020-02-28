#!/bin/bash
# UI Deployment script

TODAY=`date +"%Y-%m-%d-%H%M%S"`
DEPLOYMENT_TYPE="tst"
ZIP_PATH="./talentmap.zip"
BACKUP_PATH="/tmp/backup"

TEST_PATH="/talentmap"
PRD_PATH="/talentmap"
IVV_PATH="/talentmap-ivv"
UAT_PATH="/talentmap-uat"

# Default case is for moving to IVV
DEPLOYMENT_BASE="/data/www/html"

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

BACKUP_PATH="${BACKUP_PATH}"
ZIP_ABS_PATH="$(pwd)"/"$ZIP_PATH"

if [ ${DEPLOYMENT_TYPE} = "tst" ]; then
        DEPLOY_PATH="${DEPLOYMENT_BASE}""${TEST_PATH}"
        if [[ -f ${ZIP_PATH} ]]; then
                mkdir -p "${BACKUP_PATH}"
                zip -r "${BACKUP_PATH}/UI_DEPLOYMENT_BACKUP-talentmap-${TODAY}.zip" "${DEPLOY_PATH}"/*
                yes | sudo cp "${DEPLOY_PATH}/config/config.json" ${BACKUP_PATH}
                rm -rf ${DEPLOY_PATH}/*
                cd "${DEPLOY_PATH}"
                unzip "${ZIP_ABS_PATH}"
                yes | cp -r ./build/* ./
                yes | mv "${BACKUP_PATH}/config.json" "${DEPLOY_PATH}"/config/
                sudo service httpd restart
                sudo service httpd status
        else
                echo "Deployment zip file not found"
        fi
fi

if [ ${DEPLOYMENT_TYPE} = "prd" ]; then
        DEPLOY_PATH="${DEPLOYMENT_BASE}""${PRD_PATH}"
        if [[ -f ${ZIP_PATH} ]]; then
                mkdir -p "${BACKUP_PATH}"
                zip -r "${BACKUP_PATH}/UI_DEPLOYMENT_BACKUP-talentmap-prd-${TODAY}.zip" "${DEPLOY_PATH}"/*
                yes | sudo cp "${DEPLOY_PATH}/config/config.json" ${BACKUP_PATH}
                rm -rf ${DEPLOY_PATH}/*
                cd "${DEPLOY_PATH}"
                unzip "${ZIP_ABS_PATH}"
                yes | cp -r ./build/* ./
                yes | sudo mv "${BACKUP_PATH}/config.json" "${DEPLOY_PATH}"/config/
                cp index.html index.html.bak
                sudo sed -i'.bak' "s:/talentmap-uat/:/talentmap/:g" index.html
                cd ./static/css
                cp main.css main.css.bak
                sudo sed -i'.bak' "s:/talentmap-uat/:/talentmap/:g" main.css
                cd ../js
                sudo sed -i'.bak' "s:/talentmap-uat:/talentmap:g" main.js
                sudo service httpd restart
                sudo service httpd status
        else
                echo "Deployment zip file not found"
        fi
fi

if [ ${DEPLOYMENT_TYPE} = "ivv" ]; then
        DEPLOY_PATH="${DEPLOYMENT_BASE}""${IVV_PATH}"
        FROM_PATH="${DEPLOYMENT_BASE}""${TEST_PATH}"
        mkdir -p "${BACKUP_PATH}"
        zip -r "${BACKUP_PATH}/UI_DEPLOYMENT_BACKUP-ivv-${TODAY}.zip" "${DEPLOY_PATH}"/*
        yes | sudo cp "${DEPLOY_PATH}/config/config.json" "${BACKUP_PATH}"
        rm -rf ${DEPLOY_PATH}/*
        cd "${DEPLOY_PATH}"
        yes | sudo cp -R "${FROM_PATH}"/* "${DEPLOY_PATH}"
        yes | sudo cp "${BACKUP_PATH}/config.json" "${DEPLOY_PATH}"/config
        cp index.html index.html.bak
        sudo sed -i'.bak' "s:/talentmap/:/talentmap-ivv/:g" index.html
        cd ./static/css
        cp main.css main.css.bak
        sudo sed -i'.bak' "s:/talentmap/:/talentmap-ivv/:g" main.css
        cd ../js
        sudo sed -i'.bak' "s:/talentmap:/talentmap-ivv:g" main.js
        sudo service httpd restart
        sudo service httpd status
fi

if [ ${DEPLOYMENT_TYPE} = "uat" ]; then
        DEPLOY_PATH="${DEPLOYMENT_BASE}""${UAT_PATH}"
        FROM_PATH="${DEPLOYMENT_BASE}""${IVV_PATH}"
        mkdir -p "${BACKUP_PATH}"
        zip -r "${BACKUP_PATH}/UI_DEPLOYMENT_BACKUP-uat-${TODAY}.zip" "${DEPLOY_PATH}"/*
        yes | sudo cp "${DEPLOY_PATH}/config/config.json" "${BACKUP_PATH}"
        rm -rf ${DEPLOY_PATH}/*
        cd "${DEPLOY_PATH}"
        yes | sudo cp -R "${FROM_PATH}"/* "${DEPLOY_PATH}"
        yes | sudo cp "${BACKUP_PATH}/config.json" "${DEPLOY_PATH}"/config
        cp index.html index.html.bak
        sudo sed -i'.bak' "s:/talentmap-ivv/:/talentmap-uat/:g" index.html
        cd ./static/css
        cp main.css main.css.bak
        sudo sed -i'.bak' "s:/talentmap-ivv/:/talentmap-uat/:g" main.css
        cd ../js
        sudo sed -i'.bak' "s:/talentmap-ivv:/talentmap-uat:g" main.js
        sudo service httpd restart
        sudo service httpd status
fi
