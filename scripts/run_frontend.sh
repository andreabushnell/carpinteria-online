set -e

source .env

cd frontend || exit

PORT=$FRONTEND_PORT npm start

echo "Frontend iniciado"