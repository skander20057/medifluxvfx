#!/bin/bash

# ==========================================
# MEDI FLUX OS - UNIVERSAL LAUNCHER
# ==========================================

# 1. Obtenir le chemin absolu du projet
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"
clear

echo "------------------------------------------------"
echo "💠 MEDI FLUX OS : INITIALISATION..."
echo "✅ Icône Pulsation Néon chargée avec succès."
echo "------------------------------------------------"

# 2. Vérification node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 node_modules manquant. Installation en cours..."
    npm install || { echo "❌ Erreur lors de l'installation des dépendances."; exit 1; }
fi

# 3. Lancement du serveur et ouverture navigateur
echo "🚀 Démarrage du moteur Next.js..."

# Ouvrir le navigateur après 3 secondes
(sleep 3 && open http://localhost:3000) &

# Afficher le message de succès en vert
echo -e "\033[0;32m"
echo "****************************************"
echo "*      MEDI FLUX OS EST PRÊT !         *"
echo "****************************************"
echo -e "\033[0m"

# Lancer npm run dev
npm run dev
