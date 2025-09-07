
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

## Initial Values





## Values after 10 POST request to `hardal-signal-app-1`


## Values after 30 POST request to `hardal-signal-app-1`


## Values after 70 POST request to `hardal-signal-app-2`



So initial MEM USAGE for `hardal-signal-app-1` was around 12.35MiB, and for `hardal-signal-app-2` it was 11.97MiB

Also here goes my CURL request that i use for testing


```
curl -X POST "https://cmbqikkok0001xxoyhmoa0ls5-signal.usehardal.com/push/hardal" \
  -H "Content-Type: application/json" \
  -d '{"type":"event","payload":{"website":"cmbqikkok0001xxoyhmoa0ls5","name":"test_event","url":"https://app.usehardal.com/signals/cmbqikkok0001xxoyhmoa0ls5?settings=setup","title":"Test Event","device_type":"desktop","language":"en-US","platform":"web","test":true,"timestamp":"2025-09-07T20:39:40.385Z"}}'
```