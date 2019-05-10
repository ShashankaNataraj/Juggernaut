![](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ad89a57d-2156-49ad-a13f-7f635974deb3/dajh9gf-2a710721-7f88-41c3-b3ec-b815e80af82c.png/v1/fill/w_941,h_849,strp/juggernaut_dota_2_by_migfleet_dajh9gf-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzMzOCIsInBhdGgiOiJcL2ZcL2FkODlhNTdkLTIxNTYtNDlhZC1hMTNmLTdmNjM1OTc0ZGViM1wvZGFqaDlnZi0yYTcxMDcyMS03Zjg4LTQxYzMtYjNlYy1iODE1ZTgwYWY4MmMucG5nIiwid2lkdGgiOiI8PTM3MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.svIeBAix7AzCtnQIDU_ug_ttF2g-7P6DMEI2JoWq3N4=50x20)

## Yet another text editor?
I've used emacs(with and without spacemacs), Vim, WebStorm, and everything in between. I keep coming back to webstorm and vim due to 1 reason: The features webstorm provides are amazing. But WebStorm is a resource hog. Vim is a light saber, and excels at fast editing. Plugins do bog vim down in terms of speed.

Since I work on 3D applications, I need every ounce of juice my editor can spare me and I want a crossbreed of vim and webstorm to drive my daily editing needs.

So, I set out to write a lightweight and fast editor that isn't a resource hog but still fits the workflow I'm most used to.

## Why not VSCode?
https://github.com/Microsoft/vscode/issues/49161

While VSCode fits everything Im trying to do and is an engineering marvel:
- I refuse to put up with the telemetry.
- I dont want a vertical bar occupying 5% of my screen all the time.
- I dont want tabs at the top of the screen.
- I want to have control on everything my editor is trying to do.

While some / all of these can be fixed with plugins / using different forks of VSCode, one question arises: Why bother? Why not build my own editor from the ground up instead of complaining about VSCode or webstorm or Vim?

## Why even compete with established editors out there?
There are many editors out there, but this one is mine. And, I can learn Rust when implementing it ^_^

## Objectives in order of priority
- Fast & Lightweight: Do a few things, do them well. Do not try to compete with VSCode and Webstorm. Borrow only what makes the most sense productivity - wise.
- Pseudo Modal based: Dont copy vim or emacs' evil mode. Take only what makes the most sense. Completely keyboard driven.
- Aesthetically pleasing
- Predictable & stable
- 0 telemetry: No compromises. Store any config on the users own machine, dont send any network requests without the user knowing about it. Binaries produced during releases should be the same if the user tries to build it on his own. i.e, no sleight of hand w.r.t the build and release process like VSCode.

## Hack with me
Run `cargo watch -x run` to allow cargo to watch for changes and live reload

Run `webpack --watch` to allow webpack to look for UI changes and live reload

## Contributions

PR's are welcome. Just try not to break anything, even if you do, thats ok, Lets build something good together! :smile:

### Where do you need help?

Right now, Im trying to get all the basics right. File reading was just implemented. Everything is in alpha.

## But.. But.. electron is bloated®
That is exactly why this project uses https://github.com/Boscop/web-view xD