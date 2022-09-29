set -Eeuo pipefail
npm run lint
npm run format
npm run test:unit
npx cypress run
git commit -am refactoring
git push
