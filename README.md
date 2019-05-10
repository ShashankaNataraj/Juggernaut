![](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ad89a57d-2156-49ad-a13f-7f635974deb3/dajh9gf-2a710721-7f88-41c3-b3ec-b815e80af82c.png/v1/fill/w_941,h_849,strp/juggernaut_dota_2_by_migfleet_dajh9gf-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzMzOCIsInBhdGgiOiJcL2ZcL2FkODlhNTdkLTIxNTYtNDlhZC1hMTNmLTdmNjM1OTc0ZGViM1wvZGFqaDlnZi0yYTcxMDcyMS03Zjg4LTQxYzMtYjNlYy1iODE1ZTgwYWY4MmMucG5nIiwid2lkdGgiOiI8PTM3MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.svIeBAix7AzCtnQIDU_ug_ttF2g-7P6DMEI2JoWq3N4=50x20)

## Yet another text editor?
I've used emacs(with and without spacemacs), vim, WebStorm, and everything in between. I keep coming back to webstorm due to 1 reason: The features the IDE provides is amazing. But WebStorm is a resource hog. 

Since I work on 3D applications, I need every ounce of juice my editor can spare me.

So I set out to write a lightweight and fast editor that isn't a resource hog but still gives me the most

## Why not VSCode?
https://github.com/Microsoft/vscode/issues/49161

## Why even compete with established editors out there?
There are many editors out there, but this one is mine. And, I can learn Rust when implementing it ^_^

## Objectives in order of priority
- Fast
- Predictable
- Rock Solid
- Modal based
- Lightweight
- Aesthetics
- Completely keyboard driven navigation for non vim emulated operations
- 0 telemetry

## Start Developing
Run `cargo watch -x run` to allow cargo to watch for changes and live reload

Run `webpack --watch` to allow webpack to look for UI changes and live reload

## But, but, electron is cancer®
That is exactly why this project uses https://github.com/Boscop/web-view xD