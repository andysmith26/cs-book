## How to pass information between pages

In the command line (PC) or terminal (Mac), make sure you are in your game folder.

Type `type nul > main.js` (PC) or `touch main.js` (Mac) to create a new file called `main.js`.

Open that file in a text editor and paste this code in:
```
/**
 * JavaScript Get URL Parameter
 * 
 * @param String prop The specific URL parameter you want to retreive the value for
 * @return String|Object If prop is provided a string value is returned, otherwise an object of all properties is returned
 */
function getUrlParams( prop ) {
    var params = {};
    var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    var definitions = search.split( '&' );

    definitions.forEach( function( val, key ) {
        var parts = val.split( '=', 2 );
        params[ parts[ 0 ] ] = parts[ 1 ];
    } );

    return ( prop && prop in params ) ? params[ prop ] : params;
}
```

Then go [here](http://woodstockcs.github.io/instructions/cyoa/sample1.html), and click around to see what happens. View the page source to see the code, and figure out what it's doing. Update your code accordingly. (Be sure to include `<script src="main.js"></script>` inside the `head` tags of each file that uses javascript.)
