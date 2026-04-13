#!/bin/bash

# ========================================================
# 💠 MEDIFLUX MASTER OS - LANCEUR OFFICIEL (V6)
# ========================================================

# 1. Positionnement sur le dossier du projet
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"
clear

echo -e "\033[1;36m"
echo "  __  __  ______  _____   _____  ______  _      _    _ __   __"
echo " |  \/  ||  ____||  __ \ |_   _||  ____|| |    | |  | |\ \ / /"
echo " | \  / || |__   | |  | |  | |  | |__   | |    | |  | | \ V / "
echo " | |\/| ||  __|  | |  | |  | |  |  __|  | |    | |  | |  > <  "
echo " | |  | || |____ | |__| | _| |_ | |     | |____| |__| | / . \ "
echo " |_|  |_||______||_____/ |_____||_|     |______|\____/ /_/ \_\\"
echo -e "\033[0m"

echo "--------------------------------------------------------"
echo "✅ Système : V6 MASTER IDENTIFIED"
echo "📡 Réseau : SUPABASE LIVE SYNC ACTIVE"
echo "--------------------------------------------------------"

# 2. Vérification du serveur de développement
echo "🚀 Initialisation du moteur Next.js..."

# Tentative d'ouverture du navigateur
(sleep 4 && open http://localhost:3000) &

# Lancement du processus principal
# Note: Utilise les binaires locaux si npm n'est pas dans le PATH global
if [ -f "./node_modules/.bin/next" ]; then
    ./node_modules/.bin/next dev --turbo
else
    npm run dev
fi

# Fallback si le serveur s'arrête
echo "--------------------------------------------------------"
echo "⚠️ Le serveur s'est arrêté. Relancez l'icône pour redémarrer."
echo "--------------------------------------------------------"
read -p "Appuyez sur Entrée pour fermer..."
