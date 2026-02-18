# Security Checklist

This repository is **public**. Every file committed is visible to anyone on the internet.

## Never Commit

- [ ] `.env` files with real values (use `.env.example` for documentation)
- [ ] API keys, tokens, or passwords
- [ ] Private keys, certificates (`.pem`, `.key`, `.p12`, `.pfx`, `.crt`)
- [ ] Full resume with home address or phone number
- [ ] Personal documents (ID scans, financial records)
- [ ] Database connection strings
- [ ] Webhook URLs with embedded secrets

## Before Every Commit

1. Run `git diff --staged` and review every line
2. Verify no secrets or private data are included
3. Check that images have been stripped of EXIF/GPS metadata

## If a Secret Is Accidentally Committed

**The secret is compromised immediately — even if you delete it in the next commit.**

1. **Revoke/rotate** the leaked credential immediately
2. **Remove from Git history** using `git filter-repo` or BFG Repo-Cleaner
3. **Force-push** the cleaned history
4. **Verify** the secret no longer appears in any branch or tag

Simply deleting the file in a new commit does NOT remove it from Git history.

## Safe Practices

- Store secrets in Vercel Environment Variables (dashboard only)
- Use `NEXT_PUBLIC_` prefix only for non-sensitive values
- Keep `.env.example` updated with variable names (never values)
- Run `npm audit` before deploying to check for vulnerable dependencies
