echo "==== Run build... ===="
npm run build
echo "Delete folder ./docs "
rm -rf ./docs
echo "mv ./dist/ ./docs"
mv ./dist/ ./docs
echo "==== End build. ===="
