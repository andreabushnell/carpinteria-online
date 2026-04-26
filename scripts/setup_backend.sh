set -e

source .env

cd backend || exit

if [ ! -d "venv" ]; then
    python -m venv 
fi

source venv/bin/activate

pip install -r requirements.txt # Installs packages

python manage.py migrate # Applies migrations

echo "Backend cargado"