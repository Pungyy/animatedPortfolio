# notify-contact

Envoie un email quand un message arrive dans `public.contacts`.

## Pipeline

`INSERT contacts` → trigger `contacts_notify` (`public.notify_new_contact()`, pg_net)
→ `POST /functions/v1/notify-contact` `{ record }` → email via Resend.

Le trigger ne bloque jamais l'insertion (bloc `exception when others`).

## Configuration (à faire une fois)

1. Créer un compte sur [resend.com](https://resend.com), récupérer la clé API.
2. Vérifier un domaine expéditeur (ou utiliser `onboarding@resend.dev` pour tester).
3. Supabase → **Edge Functions → notify-contact → Secrets** :

   | Secret | Valeur |
   |---|---|
   | `RESEND_API_KEY` | `re_...` |
   | `CONTACT_NOTIFY_TO` | ton adresse email |
   | `CONTACT_NOTIFY_FROM` | `Portfolio <contact@ton-domaine.fr>` (optionnel) |
   | `WEBHOOK_SECRET` | optionnel — si défini, ajouter le header `x-webhook-secret` dans le trigger |

Tant que `RESEND_API_KEY` / `CONTACT_NOTIFY_TO` ne sont pas définis, la fonction
répond `200 not configured` et aucun email n'est envoyé (aucune erreur).

## Déploiement

```
supabase functions deploy notify-contact --no-verify-jwt
```
