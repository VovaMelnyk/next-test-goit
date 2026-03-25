# Creating a new landing

1. Copy this `_template` folder into `apps/` with your landing name:
   ```bash
   cp -r apps/_template apps/my-landing
   ```

2. Replace all `LANDING_NAME` placeholders with your landing name:
   ```bash
   cd apps/my-landing
   find . -type f \( -name "*.json" -o -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's/LANDING_NAME/my-landing/g' {} +
   ```

3. Add a rewrite rule in `apps/router/vercel.json`:
   ```json
   {
     "source": "/my-landing/:path*",
     "destination": "https://my-landing-project.vercel.app/my-landing/:path*"
   }
   ```

4. Install dependencies and verify:
   ```bash
   pnpm install
   cd apps/my-landing && pnpm build
   ```

5. Create a Vercel project for the new landing and deploy.
