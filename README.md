# 🚀 MediFlux - Système Médical Premium

MediFlux est une plateforme de gestion médicale haute performance conçue avec Next.js 14+, Tailwind CSS et Supabase.

## 🛠️ Installation Locale

1. **Cloner le projet** :
   ```bash
   git clone <votre-repo-url>
   cd mediflux
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configuration des Variables d'Environnement** :
   Copiez le fichier `.env.local.example` vers `.env.local` et remplissez vos clés Supabase.
   ```bash
   cp .env.local.example .env.local
   ```

4. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

## 🗄️ Backend Supabase Setup

1. Créez un projet sur [Supabase](https://supabase.com).
2. Rendez-vous dans le **SQL Editor**.
3. Copiez et exécutez le script contenu dans `supabase_schema.sql` (à la racine du projet).
4. Récupérez vos clés API dans `Project Settings > API` et ajoutez-les à votre `.env.local`.

## 🚀 Déploiement Vercel

1. Poussez votre code sur GitHub.
2. Connectez votre dépôt sur [Vercel](https://vercel.com).
3. Ajoutez les variables d'environnement (`NEXT_PUBLIC_SUPABASE_URL`, etc.) dans les paramètres Vercel.
4. Déployez !

---
**POWERED BY SUPABASE ENGINE V1.0**
