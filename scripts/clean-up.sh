WORKDIR=$1
LOGFILESDIR=$WORKDIR/logfiles

rm -rf $LOGFILESDIR/*
touch $LOGFILESDIR/PublisherRegistry.json
echo {} > $LOGFILESDIR/PublisherRegistry.json