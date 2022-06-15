# Known Issues

Here are a list of Issues accross versions that we currently know of and are working to resolve. This doc also contains makeshift ways of resolving the issues while we still work on them. Most bugs are resolved before releasing a new version, but sometimes while working on fixing the bugs, we might release a patch with fixes for other bugs and some (work in progress) issues may get carried over to the patched version. We

## Current Version v0.0.5

When using monitor logging using logsmithJS, if the monitor is not running prior to calling the `initializeMonitor()` a FetchError is thrown and thee program stops. The ideal behavior should be to return an statement saying unreachable instead of stopping the program execution.

Tracking Issue - https://github.com/TanmoySG/logsmith-monitor/issues/50

Resolution - The Monitor should be running prior to starting the application or monitorLogging should be set to false