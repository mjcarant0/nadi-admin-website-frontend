# JWT keys (RS256) — ⚠️ DEV ONLY

These RSA keypairs let the N.A.D.I. backends use **asymmetric** JWTs, so there is
**no shared secret** between the admin and mobile backends.

- Each backend **signs** tokens it issues with its *own* private key.
- Each backend **verifies** tokens against *both* public keys (its own + the peer's),
  so a token from either service is accepted.

| File | Purpose |
|---|---|
| `jwt_admin_private.pem` | this (admin) backend's signing key |
| `jwt_admin_public.pem`  | verify admin-issued tokens |
| `jwt_mobile_public.pem` | verify mobile-issued tokens |

The public keys are **non-secret** and intentionally committed; the two repos must
carry identical copies of each public key.

## ⚠️ The private key here is a throwaway dev key — do NOT use in production.

For production, generate fresh keys and supply them via secret management, overriding
`JWT_PRIVATE_KEY_PATH` / `JWT_PUBLIC_KEY_PATHS`. Never commit a production private key.

Regenerate a keypair:
```bash
openssl genrsa -out jwt_admin_private.pem 2048
openssl rsa -in jwt_admin_private.pem -pubout -out jwt_admin_public.pem
```
If you rotate a key, copy the new **public** key into the other repo too.
