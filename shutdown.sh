#!/bin/bash

stop_and_verify(){
	local service=$1
	echo "Stopping $service"
	sudo systemctl stop "$service"

	if ! systemctl is-active --quiet "$service"; then
		echo "$service stopped correctly"
	else
		echo "$service could not be stopped"
	fi
}

stop_and_verify "nginx"

stop_and_verify "gunicorn"

stop_and_verify "postgresql"

echo "Services shutdown correctly"
