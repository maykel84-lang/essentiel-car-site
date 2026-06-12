# 07 — Sécurité

Une boutique encaisse des paiements et détient des données clientes : la sécurité n'est pas
optionnelle. Le plan ci-dessous couvre le brief (SSL, firewall, 2FA, sauvegardes, anti-spam,
mises à jour, limitation des accès) en ~1 heure de configuration.

## 1. Ce que le thème fait déjà

- XML-RPC désactivé (vecteur classique de force brute) ;
- Version de WordPress masquée ; message d'erreur de connexion générique
  (ne révèle pas si l'identifiant existe) ;
- Échappement systématique des sorties, nonces sur tous les formulaires du thème.

## 2. HTTPS obligatoire

- Certificat Let's Encrypt actif chez l'hébergeur, renouvellement automatique ;
- Réglages → Général : les deux URLs en `https://` ;
- Forcer la redirection HTTP → HTTPS (réglage hébergeur, Cloudflare « Always Use HTTPS »,
  ou règle .htaccess de l'hébergeur).

## 3. Wordfence (pare-feu + 2FA)

1. Extensions → **Wordfence Security** → assistant ;
2. Firewall : passer en mode **« Extended Protection »** (protection avant chargement de WP) ;
3. Brute force : max 5 tentatives, verrouillage 4 h, ✅ « Immediately lock out invalid usernames » ;
4. **2FA** : Wordfence → Login Security → activer la double authentification **pour chaque
   compte administrateur** (app TOTP type Google Authenticator) — conserver les codes de secours ;
5. Scans hebdomadaires automatiques + alertes e-mail.

## 4. Sauvegardes (UpdraftPlus)

- Planification : **base de données quotidienne** (conserver 14), **fichiers hebdomadaire**
  (conserver 4) ;
- Stockage **externalisé obligatoire** : Google Drive / Dropbox / S3 — jamais uniquement
  sur le serveur ;
- Tester une restauration une fois (vraiment) ;
- Sauvegarde manuelle avant chaque grosse mise à jour.

## 5. Comptes et accès

- Identifiant admin unique (jamais `admin`), mot de passe ≥ 16 caractères généré ;
- Un compte par personne ; rôle **minimal** nécessaire (Éditeur pour le contenu,
  Gestionnaire de boutique pour les commandes — Administrateur réservé à vous) ;
- Supprimer les comptes inutilisés ;
- E-mail admin = boîte réellement consultée (alertes de sécurité).

## 6. Durcissement wp-config.php

À ajouter (via FTP ou gestionnaire de fichiers, avant `/* C'est tout */`) :

```php
define( 'DISALLOW_FILE_EDIT', true );   // désactive l'éditeur de code dans l'admin
define( 'WP_POST_REVISIONS', 5 );
```

Et vérifier que les **clés de salage** (`AUTH_KEY`…) sont uniques
(https://api.wordpress.org/secret-key/1.1/salt/ pour en régénérer).

## 7. Mises à jour

- WordPress : mises à jour **mineures** automatiques (par défaut) ✅ ;
- Extensions/thème : activer les mises à jour automatiques pour les extensions de confiance
  (Extensions → « Activer les mises à jour auto »), **après** avoir mis en place les sauvegardes ;
- 1×/semaine : passer dans Tableau de bord → Mises à jour ; ne jamais laisser traîner
  une mise à jour de sécurité WooCommerce ;
- Supprimer (pas seulement désactiver) thèmes et extensions inutilisés.

## 8. Anti-spam

- **Antispam Bee** pour les commentaires/avis ;
- Le formulaire newsletter du thème embarque déjà un honeypot ;
- Fluent Forms : activer la protection anti-spam intégrée (honeypot) sur le formulaire de contact.

## 9. Check-list mensuelle (10 min)

- [ ] Scan Wordfence sans alerte ;
- [ ] Sauvegardes bien présentes sur le stockage externe ;
- [ ] Mises à jour appliquées ;
- [ ] Comptes utilisateurs passés en revue ;
- [ ] Test de connexion 2FA OK.
