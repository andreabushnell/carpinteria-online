set -e

source .env

cd backend || exit
source venv/bin/activate

python manage.py runserver "$HOST:$BACKEND_PORT"

echo "Backend iniciado"