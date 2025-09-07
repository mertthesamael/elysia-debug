
# Elysia.js Debugging




Hello!!
This is the repository that i'm gonna use for debugging potential POST request memory leak or potential skill issue from my end xD




So this containerised app uses Caddy as proxy server and runs Elysia under the hood. Here goes my systemd configuration:

```
[Unit]
Description=Hardal Docker Compose Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/admin/hardal-signal
ExecStart=/usr/bin/docker compose -f docker-compose.yaml up --build -d --remove-orphans --scale app=2
ExecStop=/usr/bin/docker compose -f docker-compose.yaml down
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

I am using 2 instances of Elysia for this example, and here goes `docker-stats` values




## CURL testing

### Initial Values


### Values after 10 POST request to `hardal-signal-app-1`


### Values after 30 POST request to `hardal-signal-app-1`


### Values after 70 POST request to `hardal-signal-app-2`



So initial MEM USAGE for `hardal-signal-app-1` was around 12.35MiB, and for `hardal-signal-app-2` it was 11.97MiB. Afther this couple of CURL requests, `hardal-signal-app-1` stabilised at 12.8 and `hardal-signal-app-1` is around 12.7


## Autocannon Testing

### Initial Values


### Post-Bombing Values



So initial values before autocannoning, value for `hardal-signal-app-1` was 12.19MiB and 12.45MiB for `hardal-signal-app-2`. After the results, they are stabilised at 13.75 and 15.39 MiB

Also here goes my CURL request and autocannon configs that i use for testing

```
curl -X POST "https://cmbqikkok0001xxoyhmoa0ls5-signal.usehardal.com/push/hardal" \
  -H "Content-Type: application/json" \
  -d '{"type":"event","payload":{"website":"cmbqikkok0001xxoyhmoa0ls5","name":"test_event","url":"https://app.usehardal.com/signals/cmbqikkok0001xxoyhmoa0ls5?settings=setup","title":"Test Event","device_type":"desktop","language":"en-US","platform":"web","test":true,"timestamp":"2025-09-07T20:39:40.385Z"}}'
```


```
autocannon -c 10 -d 30 -m POST \
  -H "Content-Type: application/json" \
  -b '{"type":"event","payload":{"website":"cmbqikkok0001xxoyhmoa0ls5","name":"test_event","url":"https://app.usehardal.com/signals/cmbqikkok0001xxoyhmoa0ls5?settings=setup","title":"Test Event","device_type":"desktop","language":"en-US","platform":"web","test":true,"timestamp":"2025-09-07T20:39:40.385Z"}}' \
  https://cmbqikkok0001xxoyhmoa0ls5-signal.usehardal.com/push/hardal
```


# P.S.

This is most probably skill issue from my end and sorry for taking your time for this one. But I love Elysia.js and i want to understand what is going on in general.
<3
