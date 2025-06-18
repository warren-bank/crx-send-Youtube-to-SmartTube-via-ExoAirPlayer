@echo off

set video=abc
set video=https://www.youtube.com/watch?v=wP127Ln78Zw
set video=https://www.youtube.com/watch?v=wP127Ln78Zw^&pp=0gcJCb4JAYcqIYzv

rem :: if a full Youtube video URL is entered at the input prompt,
rem :: then extract its Youtube video ID:
for /F "tokens=2 delims=^=^&" %%a in ("%video%") do (
  set video=%%a
)

echo %video%

echo.
pause
