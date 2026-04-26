echo "Iniciando aplicacion en Linux"

# Grant permissions to bash executables inside scripts/ 
chmod +x scripts/*.sh

# Run db setup and backend scripts
.scripts/setup.sh
.scripts/run_backend.sh

# If permission issues exist execute the following:
# Set-ExecutionPolicy RemoteSigned -Scope CurrentUser