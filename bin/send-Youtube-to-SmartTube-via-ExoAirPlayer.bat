@echo off
setlocal EnableDelayedExpansion

set default_ip=192.168.0.3
set default_port=8192

set /P ip=ExoAirPlayer IP [%default_ip%]: 
set /P port=ExoAirPlayer Port [%default_port%]: 
set /P video=Youtube video ID: 

(SET CR=^

)

rem :: if a full Youtube video URL is entered at the input prompt,
rem :: then extract its Youtube video ID:
for /F "tokens=2 delims=^=^&" %%a in ("%video%") do (
  set video=%%a
)

if "%ip%"=="" (
  set host=%default_ip%
) else (
  set host=%ip%
)
if "%port%"=="" (
  set host=%host%:%default_port%
) else (
  set host=%host%:%port%
)

curl "http://%host%/start-activity" -X "POST" -H "Content-Type: text/parameters" --data-binary "package: com.teamsmart.videomanager.tv!CR!class: com.liskovsoft.smartyoutubetv2.tv.ui.main.SplashActivity!CR!data: https://www.youtube.com/watch?v=%video%!CR!action: android.intent.action.VIEW!CR!category: android.intent.category.DEFAULT!CR!category: android.intent.category.BROWSABLE!CR!flag: 0x10000000!CR!flag: 0x00008000"

endlocal
