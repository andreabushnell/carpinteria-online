#!/bin/bash

initiate_and_verify(){
	local service=$1
	echo "Starting service $service"
	sudo systemctl start "$service"

	if systemctl is-active --quiet "$service"; then
		echo "$service is active and running"
	else
		echo "$service could not be initiated"
		exit 1
	fi
}

echo "Initiating application environment"

initiate_and_verify "postgresql"

cd ~/projects/carpinteria-online/backend || { echo "Backend folder not found"; exit 1; }

if [ -f "venv/bin/activate" ]; then
	echo "Activating python virtual environment"
	source venv/bin/activate
else
	echo "Virtual environment not found"
	exit 1
fi

initiate_and_verify "gunicorn"

initiate_and_verify "nginx"

cd ~/projects/carpinteria-online/frontend || { echo "Frontend folder not found"; exit 1; }

if npm run build; then
	echo "React build successful"
else
	echo "React build failed"
	exit 1
fi

echo "Opening web browser"

cmd.exe /c start http://localhost/ 2>/dev/null
