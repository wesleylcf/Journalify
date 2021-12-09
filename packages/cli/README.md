# Journalify

Journalify is a JavaScript package that runs a code and markdown editor in browser. Currently, files are saved to the user's filesystem, but support for an online version which allows sharing of files is in progress.

# Installation

```css
`npm install journalify`
```

OR

```css
npx journalify serve
```

A fileName flag can be specified:

```css
npx journalify serve <preferredName>.js
```

As well as the port to run on:

```css
npx journalify serve <preferredName>.js -p 4000
```

# Usage/Example

Running/installing the package

```css
npx journalify serve testing.js -p 3000
```

You will get a response in the terminal

```css
Opened testing.js. Navigate to http://localhost:3000 to edit the file.
testing.js not found, created new one
```

Once you have navigated to the port specified, you should see a pre-created markdown cell which guides you on the usage:

![journalify preview](https://wesleylim.com/_next/image?url=%2Fimages%2Fjournalify-web-app.png&w=1920&q=75)
