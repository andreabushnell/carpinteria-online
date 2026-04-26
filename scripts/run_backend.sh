set -e

source .env

cd backend || exit
source venv/bin/activate

python manage.py runserver 127.0.0.1:$BACKEND_PORT 

echo "Backend iniciado"