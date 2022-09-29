set -Eeuo pipefail

convertsecs() {
 ((h=${1}/3600))
 ((m=(${1}%3600)/60))
 ((s=${1}%60))
 printf "%02d:%02d:%02d\n" $h $m $s
}

start=`date +%s`
echo "LINT"
npm run --silent lint
echo "FORMAT"
npm run --silent format
echo "TEST:UNIT"
npm run --silent test:unit|grep -v "✓"
echo "TEST:E2E"
npm run --silent test:e2e
end=`date +%s`
secs=$((end-start))
echo Completed in `printf '%dh:%dm:%ds\n' $((secs/3600)) $((secs%3600/60)) $((secs%60))`
