Set-Location $PSScriptRoot
$apache_bin = (Get-Command httpd).Source 
$apache = Split-Path -Parent $apache_bin | Split-Path -Parent
$htdocs = Join-Path $apache htdocs
$htdocs
if (Test-Path $htdocs){
    Copy-Item -Path .\content\* $htdocs -Force -Recurse
}




