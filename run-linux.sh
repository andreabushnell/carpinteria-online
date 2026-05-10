echo "Iniciando aplicacion en Linux"

# Grant permissions to bash executables inside scripts/
chmod +x scripts/*.sh

# Initializes database and sets up backend
./scripts/init_db.sh
./scripts/setup_backend.sh
# Optional database reset / fresh seeded start (commented for now):
# ./scripts/reset_backend.sh
./scripts/run_backend.sh

# If permission issues exist execute the following:
# Set-ExecutionPolicy RemoteSigned -Scope CurrentUser