#!/bin/bash

# ==========================================
# MEDIFLUX OS - MASTER BUILDER & INSTALLER
# ==========================================

clear
echo "------------------------------------------------"
echo "🛠️ PRÉPARATION DE L'INSTALLATEUR MEDIFLUX"
echo "------------------------------------------------"

# 1. Installation des dépendances
echo "📦 Vérification des dépendances..."
npm install

# 2. Compilation de l'application
echo "🚀 Compilation de MediFlux (Next.js + Electron)..."
npm run build-app

# 3. Message Final
echo "------------------------------------------------"
echo "✅ CONSTRUCTION TERMINÉE AVEC SUCCÈS !"
echo "📂 Votre application se trouve dans le dossier : /dist"
echo "👉 Double-cliquez sur MediFlux.app pour l'utiliser."
echo "------------------------------------------------"
