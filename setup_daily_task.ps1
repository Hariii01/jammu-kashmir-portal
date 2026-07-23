# PowerShell Script to register daily automatic news collection in Windows Task Scheduler
# Run this once in PowerShell to automatically collect news every day at 08:00 AM.

$Action = New-ScheduledTaskAction -Execute "python.exe" -Argument "c:\Users\harsh\OneDrive\Desktop\movies\news_fetcher.py" -WorkingDirectory "c:\Users\harsh\OneDrive\Desktop\movies"
$Trigger = New-ScheduledTaskTrigger -Daily -At 8:00AM
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries

Register-ScheduledTask -TaskName "JK_Daily_News_Collector" -Action $Action -Trigger $Trigger -Settings $Settings -Description "Collects daily news and 20-district weather for Jammu & Kashmir portal" -User $env:USERNAME

Write-Host "============================================================" -ForegroundColor Green
Write-Host "[SUCCESS] Windows Scheduled Task 'JK_Daily_News_Collector' registered!" -ForegroundColor Green
Write-Host "The news & weather collector will automatically run every day at 08:00 AM." -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Green
