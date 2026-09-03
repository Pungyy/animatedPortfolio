# notify-contact

Envoie un email quand un message arrive dans `public.contacts`.

## Pipeline

`INSERT contacts` → trigger `contacts_notify` (`public.notify_new_contact()`, pg_net)
→ `POST /functions/v1/notify-contact` `{ record }` → email via Resend.

Le trigger ne bloque jamais l'insertion (bloc `exception when others`).

## Configuration (à faire une fois)

1. Créer un compte sur [resend.com](https://resend.com), récupérer la clé API.
2. Vérifier un domaine expéditeur (ou utiliser `onboarding@resend.dev` pour tester).
3. Supabase → **Edge Functions → Secrets** :

   | Secret | Valeur |
   |---|---|
   | `RESEND_API_KEY` | `re_...` |
   | `CONTACT_NOTIFY_TO` | ton adresse email |
   | `CONTACT_NOTIFY_FROM` | `Portfolio <contact@ton-domaine.fr>` (optionnel) |
   | `WEBHOOK_SECRET` | chaîne aléatoire (`openssl rand -hex 32`) |

4. Supabase → **Project Settings → Vault → New secret** : `webhook_secret` =
   **la même valeur** que `WEBHOOK_SECRET`. Le trigger `notify_new_contact()` la
   lit depuis le Vault et l'envoie dans le header `x-webhook-secret` ; sans ce
   header (ou avec une mauvaise valeur) la fonction répond `401`, ce qui empêche
   qu'on l'appelle anonymement pour spammer la boîte de réception.

Tant que `RESEND_API_KEY` / `CONTACT_NOTIFY_TO` ne sont pas définis, la fonction
répond `200 not configured` et aucun email n'est envoyé (aucune erreur).

## Rotation de la clé Resend

Régénérer la clé sur resend.com, puis mettre à jour `RESEND_API_KEY` dans les
secrets Edge Functions. Rien d'autre à toucher.

## Déploiement

```
supabase functions deploy notify-contact --no-verify-jwt
```
