$.get( "/navbar.html", function( data ) {
  $( "#navbar" ).replaceWith( data );
} );
autoNumberQuestions();
$.getJSON( "/assets/data/test.json", function( data ) {
  var items = [];
  console.log( "reading" );
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
    console.log( val );
  } );
  console.log( "goodbye" );
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  } ).appendTo( "body" );
} );
$( '#slidesModal' ).on( 'show.bs.modal', function( event ) {
  var button = $( event.relatedTarget ) // Button that triggered the modal
  var displayUrl = "https://docs.google.com/a/wcsu.net/presentation/d/" + button.data( 'slides-id' ) + "/embed?start=false&loop=true&delayms=10000"; // Extract info from data-* attributes
  var editUrl = "location.href='https://docs.google.com/presentation/d/" + button.data( 'slides-id' ) + "/edit'"; // Extract info from data-* attributes
  $( '#slidesIframe' ).attr( 'src', displayUrl );
  $( '#slidesEditButton' ).attr( 'onClick', editUrl );
} )
$( '#imgModal' ).on( 'show.bs.modal', function( event ) {
  var button = $( event.relatedTarget ) // Button that triggered the modal
  var url = button.data( 'img-id' ); // Extract info from data-* attributes
  var modal = $( this )
  $( '#imgPlaceholder' ).attr( 'src', url );
} )
// autonumber blockquotes
function autoNumberQuestions() {
  console.log( "autonumbering questions" );
  var questionNumber = 1;
  $( ".question" ).each( function() {
    console.log( $( this ).html() );
    $( this ).html( questionNumber + ". " + $( this ).html() );
    questionNumber++;
  } );
}
( function( document, history, location ) {
  var HISTORY_SUPPORT = !!( history && history.pushState );
  var anchorScrolls = {
    ANCHOR_REGEX: /^#[^ ]+$/,
    OFFSET_HEIGHT_PX: 100,
    /**
     * Establish events, and fix initial scroll position if a hash is provided.
     */
    init: function() {
      this.scrollToCurrent();
      $( window ).on( 'hashchange', $.proxy( this, 'scrollToCurrent' ) );
      $( 'body' ).on( 'click', 'a', $.proxy( this, 'delegateAnchors' ) );
    },
    /**
     * Return the offset amount to deduct from the normal scroll position.
     * Modify as appropriate to allow for dynamic calculations
     */
    getFixedOffset: function() {
      return this.OFFSET_HEIGHT_PX;
    },
    /**
     * If the provided href is an anchor which resolves to an element on the
     * page, scroll to it.
     * @param  {String} href
     * @return {Boolean} - Was the href an anchor.
     */
    scrollIfAnchor: function( href, pushToHistory ) {
      var match, anchorOffset;
      if ( !this.ANCHOR_REGEX.test( href ) ) {
        return false;
      }
      match = document.getElementById( href.slice( 1 ) );
      if ( match ) {
        anchorOffset = $( match ).offset().top - this.getFixedOffset();
        $( 'html, body' ).animate( {
          scrollTop: anchorOffset
        } );
        // Add the state to history as-per normal anchor links
        if ( HISTORY_SUPPORT && pushToHistory ) {
          history.pushState( {}, document.title, location.pathname + href );
        }
      }
      return !!match;
    },
    /**
     * Attempt to scroll to the current location's hash.
     */
    scrollToCurrent: function( e ) {
      if ( this.scrollIfAnchor( window.location.hash ) && e ) {
        e.preventDefault();
      }
    },
    /**
     * If the click event's target was an anchor, fix the scroll position.
     */
    delegateAnchors: function( e ) {
      var elem = e.target;
      if ( this.scrollIfAnchor( elem.getAttribute( 'href' ), true ) ) {
        e.preventDefault();
      }
    }
  };
  $( document ).ready( $.proxy( anchorScrolls, 'init' ) );
} )( window.document, window.history, window.location );
