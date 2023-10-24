node scripts/50k.js | bash
RES=$?

while [ $RES = 0 ]
do
	RES=$?	
	node scripts/50k.js | bash
done

zip -r ../50k.zip ./dist/tiles/50k