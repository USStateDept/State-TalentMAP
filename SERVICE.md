# Service

## Running TalentMAP as a SystemD service

It is possible to run the Node server application as a SystemD process, which is consistent with other prcoesses the application requires, such as Apache.  This allows the process to be stopped and started with ease, as well as a straightforward statis command.  There is a sample service definition in `/service/talentmap.service` which is based of this [example](https://expressjs.com/en/advanced/pm.html#systemd).

### Enable service

```.sh
systemctl enable talentmap.service
```

### Start service

```.sh
systemctl start talentmap.service
```

### Stop service

```.sh
systemctl stop talentmap.service
```

### Restart service

```.sh
systemctl restart talentmap.service
```

### Check status of service service

```.sh
systemctl status talentmap.service
```