cd $PSScriptRoot
get httpd
$apache = Get-Clipboard |Split-Path -Parent
$htdocs = Join-Path $apache htdocs
$htdocs
if (Test-Path $htdocs){
    Copy-Item -Path C:\develop\WHAT_IS\what_is_javascript\content\* $htdocs -Force -Recurse
}




