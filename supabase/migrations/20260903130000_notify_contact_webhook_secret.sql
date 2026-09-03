-- =====================================================================
-- notify_new_contact trigger — authenticate the call to the edge
-- function with a shared secret so /functions/v1/notify-contact can no
-- longer be invoked anonymously (open email-relay to the owner's inbox).
--
-- The secret is read from Supabase Vault (name: 'webhook_secret') and
-- must match the WEBHOOK_SECRET env var set on the notify-contact edge
-- function. Neither value is stored in this repo.
-- =====================================================================

create or replace function public.notify_new_contact()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_secret text;
begin
  select decrypted_secret into v_secret
  from vault.decrypted_secrets
  where name = 'webhook_secret'
  limit 1;

  perform net.http_post(
    url := 'https://juutblxjrnqdnfphfaux.supabase.co/functions/v1/notify-contact',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', coalesce(v_secret, '')
    ),
    body := jsonb_build_object('record', to_jsonb(new))
  );
  return new;
exception
  when others then
    return new;  -- never block the contact insert
end;
$$;
