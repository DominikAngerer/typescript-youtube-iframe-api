# Typescript Youtube iFrame Api Example

## Getting Started

To install this project
```
git clone git@github.com:DominikAngerer/typescript-social-share.git typescript-social-share
```

Now run:
```
npm install
```

## Run the server
```
gulp
```

## Build
To build, run
```
gulp build
```
If you add the `--production` flag all your js, css, html files get minified/uglified:
```
gulp build --production
```


## How to use

You can use the `data-youtube` attribute wherever you want. The controller will look for the `data-youtube-element` inside of your `data-youtube` container and than replace the `data-youtube-element` with the generated `iframe` of the video passed as parameter.

```
<div data-youtube="{{videoId}}">
    <div data-youtube-element></div>
</div>
```

