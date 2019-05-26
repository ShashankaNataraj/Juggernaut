<img src="https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_Mask_Juggernaut-512.png" alt="drawing" width="100"/>


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
- Spacemacs style keychords
- 0 telemetry: No compromises. Store any config on the users own machine, dont send any network requests without the user knowing about it. Binaries produced during releases should be the same if the user tries to build it on his own. i.e, no sleight of hand w.r.t the build and release process like VSCode.

## Hack with me
Run `npm run watch-rs` to allow cargo to watch for changes and live reload

Run `npm run watch-js` to allow webpack to look for UI changes and live reload

## Contributions

PR's are welcome. Just try not to break anything, even if you do, thats ok, Lets build something good together! :smile:

### Where do you need help?

Right now, Im trying to get all the basics right. File reading was just implemented. Everything is in alpha.

## But.. But.. electron is bloated®
That is exactly why this project uses https://github.com/Boscop/web-view xD
