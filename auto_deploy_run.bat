pushd %~dp0

start "auto_deploy" /WAIT /B java -Dfile.encoding="utf-8" -jar file_observe.jar deploy.properties